import { Loader2Icon } from "lucide-react";

export function LoadingIcon({
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon className="animate-spin hidden aria-disabled:block" {...props} />
  )
}
