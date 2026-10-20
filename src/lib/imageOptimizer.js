/**
 * Client-side Image Optimization Utility
 * 
 * Automatically resizes and compresses high-resolution images in the browser
 * before uploading to the server, preventing HTTP 413 "Request Entity Too Large"
 * errors (e.g. Vercel 4.5MB Serverless Function payload limit) and improving
 * website loading performance.
 */

export async function optimizeImage(file, options = {}) {
  // If not running in browser or not a File/Blob, return as is
  if (typeof window === 'undefined' || !(file instanceof Blob)) {
    return file;
  }

  // Only process images
  if (!file.type || !file.type.startsWith('image/')) {
    return file;
  }

  // SVGs are vector, don't rasterize them
  if (file.type === 'image/svg+xml') {
    if (file.size > 4 * 1024 * 1024) {
      throw new Error('SVG file is too large (max 4 MB). Please upload an optimized SVG.');
    }
    return file;
  }

  // Animated GIFs: Canvas loses animation frames, so skip unless too large
  if (file.type === 'image/gif') {
    if (file.size > 4 * 1024 * 1024) {
      throw new Error('GIF file exceeds 4 MB. Please upload a smaller GIF.');
    }
    return file;
  }

  const {
    maxWidth = 2048,
    maxHeight = 2048,
    quality = 0.85,
    maxSizeBytes = 3.5 * 1024 * 1024 // Hard limit well under Vercel's 4.5MB
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.onload = () => {
        try {
          let { width, height } = img;

          // If the image is already small in both dimensions and bytes, return original
          if (file.size <= 1024 * 1024 && width <= maxWidth && height <= maxHeight) {
            resolve(file);
            return;
          }

          // Calculate new dimensions preserving aspect ratio
          if (width > maxWidth || height > maxHeight) {
            if (width / maxWidth > height / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file); // fallback to original if canvas fails
            return;
          }

          // Quality settings for smooth downscaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // For PNGs with transparency: check if we should keep PNG or convert to WebP/JPEG
          const isPng = file.type === 'image/png';
          
          if (!isPng) {
            // Fill background white for non-PNGs to avoid any black background artifact
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Determine output format
          // WebP is optimal for both transparency and high compression, supported in all modern browsers
          let outputMime = 'image/jpeg';
          let extension = '.jpg';

          if (isPng) {
            // Use WebP for PNGs to preserve potential transparency with high compression
            outputMime = 'image/webp';
            extension = '.webp';
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // If output blob is somehow larger than original and original is within limit, use original
              if (blob.size >= file.size && file.size < maxSizeBytes) {
                resolve(file);
                return;
              }

              const originalName = file.name || 'image';
              const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
              const newFileName = `${baseName}${extension}`;

              const optimizedFile = new File([blob], newFileName, {
                type: outputMime,
                lastModified: Date.now()
              });

              resolve(optimizedFile);
            },
            outputMime,
            quality
          );
        } catch (err) {
          console.warn('Image optimization error, falling back to original file:', err);
          resolve(file);
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Safely parse JSON from a fetch Response, providing clear human-readable
 * error messages for HTTP 413, 502, 504 or non-JSON payloads.
 */
export async function safeFetchJson(response, defaultErrorMessage = 'Request failed') {
  const text = await response.text();
  let data;
  
  try {
    data = JSON.parse(text);
  } catch {
    if (response.status === 413 || text.toLowerCase().includes('request entity too large')) {
      throw new Error('The uploaded file is too large for the server. Please try a smaller image.');
    }
    if (response.status === 504 || response.status === 502) {
      throw new Error('Server timeout while uploading. Please check your internet connection.');
    }
    throw new Error(text && text.length < 200 ? text : `${defaultErrorMessage} (Status ${response.status})`);
  }

  if (!response.ok) {
    throw new Error(data?.error || defaultErrorMessage);
  }

  return data;
}
