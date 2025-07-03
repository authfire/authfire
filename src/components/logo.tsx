import { appName } from "@/lib/const"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
      <Image
        src="/images/authfire-logomark-64px.png"
        alt="AuthFire Logomark"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      {appName}
    </Link>
  )
}
