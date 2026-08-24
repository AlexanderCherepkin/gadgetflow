const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public", "images");

function listJpgFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listJpgFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".jpg")) {
      files.push(fullPath);
    }
  }
  return files;
}

function generateSvg(label, bg = "#f6f6f6", text = "#525252") {
  const safeLabel = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <rect width="800" height="800" fill="${bg}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="40" fill="${text}">${safeLabel}</text>
    </svg>`
  );
}

async function main() {
  const files = listJpgFiles(publicDir);
  for (const file of files) {
    const label = path.basename(file, ".jpg");
    const svg = generateSvg(label);
    await sharp(svg, { density: 150 })
      .jpeg({ quality: 90 })
      .toFile(file);
    console.log("generated", path.relative(process.cwd(), file));
  }
  console.log("done", files.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
