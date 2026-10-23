import { supabase } from '@/lib/supabase';
import { optimizeImage } from '@/lib/imageOptimizer';

/**
 * Uploads an image directly to Supabase Storage using a signed upload URL.
 * 
 * Benefits:
 * 1. Bypasses Vercel Serverless Function 4.5MB body limit completely,
 *    eliminating HTTP 413 "Request Entity Too Large" errors forever.
 * 2. Optimizes images in the browser before upload for fast transfers.
 * 3. Sends file directly to Supabase Storage via signed URL.
 * 4. Returns the public CDN URL.
 */
export async function uploadDirectToStorage(file, { bucket = 'images', folder = 'projects' } = {}) {
  if (!file) throw new Error('No file provided for upload');

  // Step 1: Optimize image in browser if applicable
  let fileToUpload = file;
  try {
    fileToUpload = await optimizeImage(file);
  } catch (optErr) {
    console.warn('Image optimization skipped, proceeding with original file:', optErr);
    fileToUpload = file;
  }

  // Step 2: Request signed upload URL from our lightweight API
  const urlRes = await fetch('/api/admin/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: fileToUpload.name || file.name || 'image.jpg',
      bucket,
      folder
    })
  });

  const urlData = await urlRes.json();
  if (!urlRes.ok || !urlData.success) {
    throw new Error(urlData.error || 'Failed to initialize upload URL');
  }

  const { path, token, publicUrl } = urlData;

  // Step 3: Upload directly to Supabase Storage using signed token
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(path, token, fileToUpload, {
      contentType: fileToUpload.type || 'image/jpeg',
      upsert: true
    });

  if (uploadError) {
    console.error('Direct Supabase upload error:', uploadError);
    throw new Error('Storage upload failed: ' + uploadError.message);
  }

  return publicUrl;
}
