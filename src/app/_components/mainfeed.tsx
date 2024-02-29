import { Props } from "next/script";
import { FeedSectionProps } from "./feed";


export default function MainFeed({ className, activeTab, clickTab}: FeedSectionProps) {

    const isActive:boolean= activeTab === "mainFeed" ? true : false;
    return (
        <div onClick={clickTab}>
            <h1 className={'text-center ' + (isActive ? className : "")}>Main Feed</h1>
            {isActive ? 
                <div>
                    <div className="flex flex-col items-center">
                    < div>Post 1</div>
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}