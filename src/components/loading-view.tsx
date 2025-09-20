"use client";

import { LoadingIcon } from "./loading-icon";
import { Button } from "./ui/button";
import { useCurrentUser } from "@authfire/core";

export function LoadingView({
  ...props
}: React.ComponentProps<"div">) {
  const { isLoading } = useCurrentUser();
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
