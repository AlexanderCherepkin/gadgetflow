const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");

const replacements = [
  // Colors
  { from: "bg-[var(--background)]", to: "bg-background" },
  { from: "bg-[var(--foreground)]", to: "bg-foreground" },
  { from: "bg-[var(--surface)]", to: "bg-surface" },
  { from: "bg-[var(--surface-muted)]", to: "bg-surface-muted" },
  { from: "bg-[var(--accent)]", to: "bg-accent" },
  { from: "bg-[var(--accent-hover)]", to: "bg-accent-hover" },
  { from: "bg-[var(--accent-subtle)]", to: "bg-accent-subtle" },
  { from: "bg-[var(--border)]", to: "bg-border" },
  { from: "bg-[var(--success)]", to: "bg-success" },
  { from: "bg-[var(--success)]/10", to: "bg-success/10" },
  { from: "bg-[var(--warning)]", to: "bg-warning" },
  { from: "bg-[var(--error)]", to: "bg-error" },
  { from: "bg-[var(--error)]/10", to: "bg-error/10" },
  { from: "text-[var(--background)]", to: "text-background" },
  { from: "text-[var(--foreground)]", to: "text-foreground" },
  { from: "text-[var(--surface)]", to: "text-surface" },
  { from: "text-[var(--accent)]", to: "text-accent" },
  { from: "text-[var(--accent-hover)]", to: "text-accent-hover" },
  { from: "text-[var(--text-secondary)]", to: "text-text-secondary" },
  { from: "text-[var(--text-muted)]", to: "text-text-muted" },
  { from: "text-[var(--border)]", to: "text-border" },
  { from: "text-[var(--success)]", to: "text-success" },
  { from: "text-[var(--warning)]", to: "text-warning" },
  { from: "text-[var(--error)]", to: "text-error" },
  { from: "border-[var(--background)]", to: "border-background" },
  { from: "border-[var(--foreground)]", to: "border-foreground" },
  { from: "border-[var(--surface)]", to: "border-surface" },
  { from: "border-[var(--accent)]", to: "border-accent" },
  { from: "border-[var(--accent-hover)]", to: "border-accent-hover" },
  { from: "border-[var(--border)]", to: "border-border" },
  { from: "fill-[var(--accent)]", to: "fill-accent" },
  { from: "fill-[var(--warning)]", to: "fill-warning" },
  { from: "fill-[var(--error)]", to: "fill-error" },
  { from: "ring-[var(--accent)]", to: "ring-accent" },
  { from: "focus:ring-[var(--accent)]", to: "focus:ring-accent" },
  { from: "focus-visible:ring-[var(--accent)]", to: "focus-visible:ring-accent" },
  // Shadows
  { from: "shadow-[var(--shadow-card)]", to: "shadow-card" },
  { from: "shadow-[var(--shadow-hover)]", to: "shadow-hover" },
  { from: "hover:shadow-[var(--shadow-card)]", to: "hover:shadow-card" },
  { from: "hover:shadow-[var(--shadow-hover)]", to: "hover:shadow-hover" },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts") || entry.name.endsWith(".css"))) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(srcDir);
let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      const count = content.split(from).length - 1;
      content = content.split(from).join(to);
      totalChanges += count;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log("updated", path.relative(process.cwd(), file));
  }
}

console.log("total replacements:", totalChanges);
