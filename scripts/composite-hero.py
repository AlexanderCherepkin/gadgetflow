from PIL import Image, ImageFilter
import numpy as np
import os


def hex_to_rgb(hex_color):
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4))


def make_gradient(w, h, c1, c2, angle=135):
    """Linear gradient in the direction of the angle (degrees)."""
    img = np.zeros((h, w, 3), dtype=np.uint8)
    # 135deg: direction vector (-1, 1), project (x, y) onto it.
    # We want top-left = c1, bottom-right = c2.
    for y in range(h):
        for x in range(w):
            t = ((w - 1 - x) + y) / (w + h - 2)
            t = max(0.0, min(1.0, t))
            img[y, x] = [int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)]
    return Image.fromarray(img)


def composite_product(src_path, dest_path, c1_hex, c2_hex, canvas_size=1600, white_threshold=250):
    src = Image.open(src_path).convert('RGB')
    src.thumbnail((canvas_size, canvas_size), Image.Resampling.LANCZOS)

    sw, sh = src.size
    canvas = make_gradient(canvas_size, canvas_size, hex_to_rgb(c1_hex), hex_to_rgb(c2_hex))

    # Center product on canvas
    x = (canvas_size - sw) // 2
    y = (canvas_size - sh) // 2

    src_data = np.array(src)
    bg_crop = np.array(canvas.crop((x, y, x + sw, y + sh)))

    # Grayscale brightness
    gray = np.mean(src_data, axis=2)
    # Mask near-white pixels; feather the mask slightly for smooth edges
    # Adaptive: pixels that are bright AND close to neutral gray/white
    brightness = np.max(src_data, axis=2)
    min_channel = np.min(src_data, axis=2)
    # Near-white / light gray background (high brightness, low saturation)
    mask = ((brightness > 210) & ((brightness - min_channel) < 35)).astype(np.uint8) * 255
    mask_img = Image.fromarray(mask, mode='L').filter(ImageFilter.GaussianBlur(radius=2))
    mask = np.array(mask_img)

    # Normalize mask to 0..1
    mask_f = mask.astype(np.float32) / 255.0
    mask_f = mask_f[:, :, None]

    composite = (src_data * (1 - mask_f) + bg_crop * mask_f).astype(np.uint8)
    composite_img = Image.fromarray(composite)

    canvas.paste(composite_img, (x, y))
    canvas.save(dest_path, 'JPEG', quality=88, optimize=True, progressive=True)
    print(f"Saved {dest_path}: {canvas_size}x{canvas_size}, {os.path.getsize(dest_path)} bytes")


cwd = os.getcwd()
composite_product(
    os.path.join(cwd, 'public/images/hero/headphones.jpg'),
    os.path.join(cwd, 'public/images/hero/headphones.jpg'),
    'e0e7ff', 'f8fafc'
)
composite_product(
    os.path.join(cwd, 'public/images/hero/watch.jpg'),
    os.path.join(cwd, 'public/images/hero/watch.jpg'),
    'f0f9ff', 'f8fafc'
)
