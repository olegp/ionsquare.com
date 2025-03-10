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

    await fs.writeFile(`./site/${reference.icon}.processed`, output);

    reference.iconProcessed = true;
  }

  await fs.writeFile("site/_data/references.yml", yaml.dump(references), "utf8");
}

async function processPostImages() {
  const posts = await fs.readdir("site/_posts");
  for (const post of posts) {
    const postHTML = await fs.readFile(`site/_posts/${post}`, "utf8");
    console.log(postHTML);
  }
}

(async function main() {
  await processReferenceImages();
  await processPostImages();
})();
