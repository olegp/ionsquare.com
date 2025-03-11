import { promises as fs } from "fs";
import yaml from "js-yaml";
import sharp from "sharp";

interface Reference {
  icon: string;
  iconProcessed: boolean;
  [key: string]: any;
}

async function processReferenceImages() {
  const yamlContent = await fs.readFile("site/_data/references.yml", "utf8");
  const references = yaml.load(yamlContent) as Reference[];

  for (const reference of references) {
    if (reference.iconProcessed) continue;

    const output = await sharp(`./site/${reference.icon}`)
    .resize(40, 40, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toBuffer();

    await fs.writeFile(`./site/${reference.icon}`, output);

    reference.iconProcessed = true;
  }

  await fs.writeFile("site/_data/references.yml", yaml.dump(references), "utf8");
}

async function processPostImages() {
  const posts = await fs.readdir("site/_posts");
  for (const post of posts) {
    const postHTML = await fs.readFile(`site/_posts/${post}`, "utf8");
    const frontMatterMatch = postHTML.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) continue;

    const frontMatter = frontMatterMatch[1];
    const postVariablesObject = yaml.load(frontMatter) as {
      cover: string;
      coverProcessed: boolean;
      avatar: string;
      avatarProcessed: boolean;
    };

    if (postVariablesObject.cover) {
      const cover = postVariablesObject.cover;
      const coverBuffer = await sharp(`./site/${cover}`).resize(636, 440, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
      await fs.writeFile(`./site/${cover}`, coverBuffer);

      postVariablesObject.coverProcessed = true;
    }

    if (postVariablesObject.avatar) {
      const avatar = postVariablesObject.avatar;
      const avatarBuffer = await sharp(`./site/${avatar}`).resize(40, 40, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
      await fs.writeFile(`./site/${avatar}`, avatarBuffer);

      postVariablesObject.avatarProcessed = true;
    }

    const updatedFrontMatter = yaml.dump(postVariablesObject);
    const updatedPostHTML = postHTML.replace(
      /^---\n[\s\S]*?\n---/,
      `---\n${updatedFrontMatter}---`
    );

    await fs.writeFile(`site/_posts/${post}`, updatedPostHTML, 'utf8');
  }
}

(async function main() {
  await processReferenceImages();
  await processPostImages();
})();
