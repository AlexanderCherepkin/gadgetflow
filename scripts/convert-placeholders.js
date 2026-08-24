const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public", "images");

function findSvgJpegs(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSvgJpegs(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".jpg")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.trim().startsWith("<svg")) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function main() {
  const files = findSvgJpegs(publicDir);
  for (const file of files) {
    const svg = fs.readFileSync(file);
    await sharp(svg, { density: 150 })
      .jpeg({ quality: 90 })
      .toFile(file);
    console.log("converted", path.relative(process.cwd(), file));
  }
  console.log("done", files.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
