import path from "path";
import { promises as fs } from "fs";
import yaml from "js-yaml";
import sharp from "sharp";

interface Reference {
  name: string;
  icon: string;
  iconProcessed: boolean;
  [key: string]: any;
}

async function process(file_url: string) {
  const output = await sharp(`./site/${file_url}`)
    .resize(128, 128, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toBuffer();

  await fs.writeFile(`./site/${file_url}.processed`, output);
}

(async function main() {
  const yamlContent = await fs.readFile("site/_data/references.yml", "utf8");
  const references = yaml.load(yamlContent) as Reference[];

  for (const reference of references) {
    if (reference.iconProcessed) continue;

    await process(reference.icon);
    reference.iconProcessed = true;
  }

  await fs.writeFile("site/_data/references.yml", yaml.dump(references), "utf8");
})();
