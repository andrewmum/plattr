import SearchBoxComponent from "../_map/mapsearch";
import { useMap } from "@/app/_providers/mapprovider";
import ReviewComponent from "./reviewcomponent";
export default function MainFeed() {
  const { placeResult } = useMap();
  // debugger;
  return (
    <div>
      <div>
        <SearchBoxComponent />
        <h3>See what's popular now</h3>
        <div className="flex flex-col h-64 w-full overflow-auto p-4">
          {placeResult ? (
            placeResult.map((element, index) => (
              <ReviewComponent
                rating={element.rating}
                name={element.name}
                location={element.vicinity}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
