/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PbsweV4GAyl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReviewComponentProps {
  name: string | undefined;
  rating: number | undefined;
  location: string | undefined;
}
export default function ReviewComponent({
  name,
  rating,
  location,
}: ReviewComponentProps) {
  return (
    <Card className="w-full max-w-xs p-0 bg-[#333333] relative">
      <CardContent className="flex flex-col p-2">
        <div className="grid gap-2">
          <h3 className="text-sm font-semibold leading-none text-white">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-white">
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <StarIcon className="w-3 h-3 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-3 h-3 fill-muted stroke-muted-foreground" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              3.0
            </span>
          </div>
        </div>
        <div className="grid gap-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">LOCATION</p>
          <p className="text-sm text-white">{location}</p>
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-end gap-2">
        {/* <Button size="sm">Details</Button>
        <Button size="sm" variant="outline">
          Reviews
        </Button> */}
      </CardFooter>
    </Card>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
