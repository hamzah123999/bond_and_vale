"use client"
import React from 'react'
import DoorRevealSection from './DoorRevealSection'
import Image from 'next/image'
import SplitText from './SplitText'

export default function DoorRevealSectionComp() {
      const handleAnimationComplete = () => {
  };
    return (
        <DoorRevealSection
            heightVh={240}
            className=" bg-[#e6d7c4]"
            background={
                <div className="relative h-full w-full bg-[#e6d7c4]">
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                        <div className="w-[min(2000px,85vw)]">
                            <Image
                                src="/door.svg"
                                alt="Bond & Vale logo"
                                width={2000}
                                height={1200}
                                className="w-full h-auto object-contain select-none"
                                priority
                            />
                        </div>
                    </div>
                </div>
            }
        >
            <div className="text-[#0e221c]">
                <div className=" ">

                    <SplitText
                        text="Strategic Communications
            for Exceptional Brand Growth"
                        className="font-medium md:text-4xl font-[PPPangaia] uppercase text-xl mb-6"
                        delay={150}
                        duration={2}
                        splitType="lines"
                        from={{ opacity: 0, y: 100 }}
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                </div>
                <p className="text-lg">

                    At Bond & Vale, we’re an integrated communications consultancy
                    dedicated to helping brands grow with purpose, credibility and
                    trust.
                    Through our expertise in strategic storytelling, brand positioning
                    and digital innovation, we elevate visibility, strengthen reputation
                    and drive measurable long-term growth.
                

                </p>
            </div>
        </DoorRevealSection>
    )
}
