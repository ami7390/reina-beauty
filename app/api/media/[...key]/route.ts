export async function GET() {
  return new Response('Ancien stockage média désactivé. Les nouvelles images utilisent Supabase Storage.', { status: 410 });
}
