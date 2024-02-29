import { FeedSectionProps } from "./feed";


export default function MyFeed({ className, activeTab, clickTab} : FeedSectionProps) {

    const isActive :boolean = activeTab === "myFeed" ? true : false;
    return(
        <div onClick={clickTab}>
            <h1 className={"text-center " + (isActive ? className : "")}>
                My Feed
            </h1>
            {isActive ?
                <div>
                    <div className="flex flex-col items-center">
                        < div>Post 1</div>
                    </div>
                </div>
        
            :<></>}
        </div>
    )
}

