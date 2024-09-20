import Image from 'next/image';

export default function Playlist() {
  const PLAYLIST = {
    name: 'ToHome',
    scope: 'Private',
    meta: 'Author | 32 songs',
  };


  return (
    <div className="flex justify-center">
      <div className="container my-4">
        <div className="flex flex-row mb-4 relative">
          <Image width={232} height={174}
                 src={'/images/Image.jpg'}
                 alt="playlist_image" />
          <div className="card-body">
            <span className="my-0 text-sm">{PLAYLIST.scope}</span>
            <h1 className="font-bold text-7xl">{PLAYLIST.name}</h1>
            <span className="absolute bottom-0">{PLAYLIST.meta}</span>
          </div>
        </div>
        <hr />
        <div className="">
        </div>
      </div>
    </div>

  );
}