import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileName: string } }
) {
  const range = req.headers.get('range') || '';

  const backendUrl = `${process.env.NEXT_PRIVATE_HOST_API}/audio/stream/${params.fileName}`;
  const backendResponse = await fetch(backendUrl, {
    headers: { 'Range': range }
  });

  if (!backendResponse.ok) {
    return new Response('Backend error', { status: 502 });
  }

  const headers = new Headers({
    'Content-Type': backendResponse.headers.get('Content-Type') || 'audio/mpeg',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=604800'
  });

  const contentRange = backendResponse.headers.get('Content-Range');
  if (contentRange) headers.set('Content-Range', contentRange);

  return new Response(backendResponse.body, {
    status: backendResponse.status, // 206 or 200
    headers
  });
}