const getStreamUrl = (songId: string) => {
  return `/api/audio/stream/${songId}`;
}

export const AudioService = {
  getStreamUrl
}