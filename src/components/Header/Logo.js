import Image from "next/image"
import Link from "next/link"
import logoMark from "@/public/evgyan-logo.jpg"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-light" aria-label="EVGyan home">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden mr-2 shrink-0">
            <Image src={logoMark} alt="EVGyan logo" className="w-full h-full object-cover" sizes="40px" priority />
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight">EVGyan</span>
    </Link>
  )
}

export default Logo