import { appName, logoDarkImageUrl, logoImageUrl } from "@/lib/const"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
      <Image
        src={ logoImageUrl}
        alt={ `${appName} Logo` }
        width={320}
        height={64}
        className="h-8 w-auto dark:hidden"
      />
      <Image
        src={ logoDarkImageUrl}
        alt={ `${appName} Logo` }
        width={320}
        height={64}
        className="h-8 w-auto hidden dark:block"
      />
    </Link>
  )
}
