import { ArrowBigRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
      <Image
        src={"/404.png"}
        width={250}
        height={150}
        className="h-full w-full absolute opacity-40 z-[-1] object-cover"
        alt="?"
      />
      <h1 className="text-red-500">Page Not found - 404!</h1>
      <div>
        <span className="text-blue-500">
          <Link href="/" className="flex justify-center items-center gap-1">
            <Home height={15} />
            Go back to Home Page
            <ArrowBigRight />
          </Link>
        </span>
      </div>
    </div>
  );
}
