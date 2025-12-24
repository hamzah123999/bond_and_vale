"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnet from '@/components/Magnet'
import DecryptedText from "./DecryptedText";


type Props = {
    href: string;
    label: string;
    className?: string;
};

export default function TicketButton({ href, label, className }: Props) {
    return (
        <>
            <Magnet padding={50} disabled={false} magnetStrength={8}>
                <Link
                    href={href}
                    className={[
                        "group inline-flex items-center justify-between gap-10",
                        "bg-[#0e221c] text-[#eae2d9]",
                        "px-6 py-3.5 text-[14px] font-medium",
                        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                        "transition hover:opacity-95",
                        className || "",
                    ].join(" ")}
                    style={{
                        clipPath:
                            "polygon(" +
                            "9px 0," +                // top-left cut start
                            "100% 0," +
                            "calc(100% - 9px) 0," +   // top-right cut start
                            "100% 9px," +             // top-right cut end
                            "100% calc(100% - 9px)," +
                            "calc(100% - 9px) 100%," + // bottom-right cut end
                            "0 100%," +
                            "9px 100%," +               // bottom-left cut start
                            "0 calc(100% - 9px)," +     // bottom-left cut end
                            "0 9px" +                   // top-left cut end
                            ")",
                    }}
                    aria-label={label}
                >
                    <DecryptedText text={label} className="text-[#eae2d9] font-normal tracking-wider " useOriginalCharsOnly animateOn="hover" parentClassName="text-[#eae2d9] font-normal tracking-wider cursor-pointer" speed={50} />
                    <ArrowRight className="h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
                </Link>
            </Magnet>
        </>
    );
}
