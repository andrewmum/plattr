import SearchBoxComponent from "../_map/mapsearch";
import { useMap } from "@/app/_providers/mapprovider";
export default function MainFeed() {
  const { placeResult } = useMap();
  // debugger;
  return (
    <div>
      <div>
        <SearchBoxComponent />
        {placeResult ? (
          placeResult.map((element, index) => (
            <div key={index}>{element.name}</div>
          ))
        ) : (
          <></>
        )}

        <h3>See what's popular now</h3>
      </div>
    </div>
  );
}
