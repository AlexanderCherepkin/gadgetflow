from PIL import Image
import os

cwd = os.getcwd()
files = [
    os.path.join(cwd, "public/images/hero/headphones.jpg"),
    os.path.join(cwd, "public/images/hero/watch.jpg"),
]

for f in files:
    img = Image.open(f)
    img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    img.save(f, "JPEG", quality=85, optimize=True, progressive=True)
    w, h = img.size
    size = os.path.getsize(f)
    print(f"{f}: {w}x{h}, {size} bytes")
