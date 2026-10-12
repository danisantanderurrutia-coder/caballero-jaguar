#!/usr/bin/env python3
"""Utility script: Crop 2x2 grid image generated with Gemini / Nano Banana into 4 distinct assets."""
import os
import sys
from PIL import Image

def crop_quad_grid(image_path, output_names, output_dir="/Users/danielsantander/Documents/Caballero Jaguar/assets"):
    if not os.path.exists(image_path):
        print(f"ERROR: Image path not found: {image_path}")
        return False
    
    img = Image.open(image_path)
    width, height = img.size
    mid_x = width // 2
    mid_y = height // 2
    
    # 4 Quadrants
    boxes = [
        (0, 0, mid_x, mid_y),          # 0: Top-Left
        (mid_x, 0, width, mid_y),       # 1: Top-Right
        (0, mid_y, mid_x, height),      # 2: Bottom-Left
        (mid_x, mid_y, width, height)   # 3: Bottom-Right
    ]
    
    os.makedirs(output_dir, exist_ok=True)
    generated_files = []
    
    for idx, (box, name) in enumerate(zip(boxes, output_names)):
        crop_img = img.crop(box)
        target_path = os.path.join(output_dir, f"{name}.jpg")
        crop_img.save(target_path, "JPEG", quality=95)
        print(f"  [Quadrant {idx+1}] Saved: {target_path} ({crop_img.size[0]}x{crop_img.size[1]})")
        generated_files.append(target_path)
    
    print(f"SUCCESS: Cropped 4 assets from 1 image generation into {output_dir}")
    return generated_files

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print("Usage: python3 crop_quad_grid.py <source_image> <name_tl> <name_tr> <name_bl> <name_br>")
        sys.exit(1)
    crop_quad_grid(sys.argv[1], sys.argv[2:6])
