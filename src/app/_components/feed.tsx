'use client';

import MainFeed from "./mainfeed";
import MyFeed from "./myfeed";


export default function FeedSection() {
  return (
    <div className="fixed top-0 right-0 h-3/5 w-1/4 bg-gray-900/70 pt-2 pr-2 mt-1 mr-1">
      <div className="flex text-white">
        <div className="w-1/2 ">
          <MainFeed />
        </div>
        <div className="w-1/2">
          <MyFeed />
        </div>
      </div>
    </div>
  )
}