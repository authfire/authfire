"use client";

import { useFirebase } from "@/lib/firebase";
import { LoadingIcon } from "./loading-icon";
import { Button } from "./ui/button";

export function LoadingView({
  ...props
}: React.ComponentProps<"div">) {
  const { isLoading } = useFirebase();
  if (!isLoading) return null;

  return (
    <div className="absolute w-full h-full bg-background/90 flex items-center justify-center z-10" {...props}>
      <Button disabled={true}>
        <LoadingIcon aria-disabled={true} />
        Loading...
      </Button>
    </div>
  )
}
