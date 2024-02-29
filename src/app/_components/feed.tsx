'use client';

import { useEffect, useState } from "react";
import MainFeed from "./mainfeed";
import MyFeed from "./myfeed";

export interface FeedSectionProps {
  className: string;
  activeTab: string;
  clickTab: () => void;
}

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

  const [feedProps, setFeedProps] = useState<FeedSectionProps | null>(null);

  useEffect(() => {
    const newFeedProps: FeedSectionProps = {
      className: activeTabStyle,
      activeTab: activeTab,
      clickTab: onClickHandleTab,
    };
    setFeedProps(newFeedProps);
  }, [activeTab, activeTabStyle]);

  return (
    <div className="fixed top-0 right-0 h-3/5 w-1/4 bg-gray-900/70 pt-2 pr-2 mt-1 mr-1">
      <div className="flex text-white">
        <div className="w-1/2 ">
          <MainFeed {...feedProps!}/>
        </div>
        <div className="w-1/2">
          <MyFeed {...feedProps!}/>
        </div>
      </div>
    </div>
  )
}