import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

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
    <Card className="w-full max-w-xs bg-black">
      <CardHeader className="p-4 flex items-center justify-center">
        <div className="grid gap-1.5">
          <CardTitle className="text-base text-white">{name}</CardTitle>
        </div>
      </CardHeader>
      <img
        alt="Stealth Image"
        className="w-full h-40 object-cover"
        src="/placeholder.svg"
      />
      <CardContent className="p-4 flex items-center justify-center">
        <div className="grid gap-2 text-2xs">
          <div className="grid grid-cols-5 items-center gap-1.5 text-white justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2443"
              height="2500"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              id="google"
              className="w-6 h-6 fill-current"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            <div className="flex items-center gap-1.5">
              <StarIcon className="fill-accent text-base" />
              <StarIcon className="fill-accent text-base" />
              <StarIcon className="fill-accent text-base" />
              <StarIcon className="fill-accent text-base" />
              <StarIcon className="fill-accent text-base" />
            </div>
          </div>
          <div className="grid grid-cols-5 items-center gap-1.5 text-white justify-center">
            {/* <Avatar className="w-6 h-6 border">
              <AvatarImage alt="Logo" src="/placeholder-logo.jpg" />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2443"
              height="2500"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              id="google"
              className="w-6 h-6 fill-current"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            <div className="flex items-center gap-1.5">
              <StarIcon className="fill-accent text-sm" />
              <StarIcon className="fill-accent text-sm" />
              <StarIcon className="fill-accent text-sm" />
              <StarIcon className="fill-accent text-sm" />
              <StarIcon className="fill-accent text-sm" />
            </div>
          </div>
        </div>
      </CardContent>
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
