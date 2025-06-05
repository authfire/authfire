import { Flame } from "lucide-react"

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 font-medium">
      <div className="flex size-6 items-center justify-center rounded-md bg-primary-foreground text-primary">
        <Flame className="size-4" />
      </div>
      AuthFire
    </a>
  )
}
