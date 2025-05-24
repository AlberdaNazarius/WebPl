const getStreamUrl = (songId: string | null) => {
  if (!songId) {
    return '';
  }
  return `/api/audio/stream/${songId}`;
}

export const AudioService = {
  getStreamUrl
}