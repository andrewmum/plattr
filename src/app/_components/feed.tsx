'use client';

import { useEffect, useState } from "react";
import MainFeed from "./mainfeed";
import MyFeed from "./myfeed";

export default function FeedSection() {
  const [activeTab, setActiveTab] = useState('mainFeed' as string);
  const [activeTabStyle, setActiveTabStyle] = useState('border-b-2 border-white' as string);

  const onClickHandleTab = () => {
    if (activeTab === 'mainFeed') {
      setActiveTab('myFeed');
    } else {
      setActiveTab('mainFeed');
    }
  };
  
  useEffect(() => {
    setActiveTab(activeTab);
  }, [activeTab]);

  return (
    <div className="fixed top-0 right-0 h-3/5 w-1/4 bg-gray-900/70 pt-2 pr-2 mt-1 mr-1">
      <div className="flex text-white">
        <div className="w-1/2 ">
          <div onClick={onClickHandleTab}>
            <h1 className={'text-center ' + (activeTab == "mainFeed" ? activeTabStyle : "")}>Main Feed</h1>
          </div>
        </div>
        <div className="w-1/2">
          <div onClick={onClickHandleTab}>
              <h1 className={'text-center ' + (activeTab == "myFeed" ? activeTabStyle : "")}>My Feed</h1>
            </div>
        </div>
      </div>
      <div className="w-full text-white">
        <div>
              {activeTab == "mainFeed" ?<MainFeed /> : <MyFeed />}
          </div>
      </div>
    </div>
  )
}