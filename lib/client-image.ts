export async function optimizeImageFile(file: File, maxDimension = 1800, quality = 0.82): Promise<File> {
  if (!file.type.startsWith('image/')) throw new Error('Le fichier sélectionné n’est pas une image.');
  if (file.size > 12 * 1024 * 1024) throw new Error('L’image source ne doit pas dépasser 12 Mo.');

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) throw new Error('Impossible d’optimiser cette image.');
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
  if (!blob) throw new Error('Impossible de convertir cette image en WebP.');
  const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '') || 'image';
  return new File([blob], `${base}.webp`, { type: 'image/webp', lastModified: Date.now() });
}
