from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    datas = img.getdata()

    newData = []
    for item in datas:
        # Calculate grayscale intensity (255 is white, 0 is black)
        gray = sum(item[:3]) / 3.0
        
        # Alpha is inverse of grayscale (white becomes transparent)
        alpha = 255 - int(gray)
        
        if alpha > 0:
            # Un-premultiply alpha assuming a white background
            a_ratio = alpha / 255.0
            r = int(max(0, min(255, (item[0] - 255 * (1 - a_ratio)) / a_ratio)))
            g = int(max(0, min(255, (item[1] - 255 * (1 - a_ratio)) / a_ratio)))
            b = int(max(0, min(255, (item[2] - 255 * (1 - a_ratio)) / a_ratio)))
            
            if alpha > 100:
                alpha = min(255, int(alpha * 1.1))
                
            newData.append((r, g, b, alpha))
        else:
            newData.append((255, 255, 255, 0))

    img.putdata(newData)
    img.save(output_path, 'PNG')

remove_white_bg('public/logo.jpg', 'public/logo.png')
print("Successfully converted logo.jpg to transparent logo.png")
