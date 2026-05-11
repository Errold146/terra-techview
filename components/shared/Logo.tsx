import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <Link href={'/'} className="cursor-pointer">
                <Image
                    src={'/Fronty.png'}
                    alt="Logo Terra Teachviews"
                    height={25}
                    width={25}
                    style={{ width: '35px', height: '35px' }}
                    priority
                />
            </Link>

            <h1 className="text-verde-100 text-xl font-semibold">
                Terra <span className="text-verde-300 font-normal">Teachview</span>
            </h1>
        </div>
    )
}
