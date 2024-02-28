'use client';
import Map from "./_components/map";
import Feed from './_components/feed';

export default function Home() {

  return (
    <div>
      <div className="relative h-[100dvh] w-[100vw] mapboxgl-map">
        <div className="absolute h-full w-full justify-center pointer-events-auto">
          <Map />
          <Feed />
        </div>
      </div>

    </div>
  )
}
