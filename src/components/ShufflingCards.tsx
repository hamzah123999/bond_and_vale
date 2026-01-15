"use client"
import React from 'react'
import SplitText from './SplitText'
import ShufflingCardsGrid from './ShufflingCardsGrid'

export default function ShufflingCards() {
    const handleAnimationComplete = () => {
    };
    return (
        <section className="bg-[#e6d7c4] px-6 lg:px-14 py-16">
            <h2 className=" ">
                <SplitText
                    text="WE&apos;RE PROUD TO BE RECOGNIZED AS INDUSTRY LEADERS."
                    className="text-[#0e221c] md:text-6xl text-3xl uppercase !text-start max-w-3xl font-[PPPangaia] "
                    delay={150}
                    duration={2}
                    splitType="lines"
                    from={{ opacity: 0, y: 100 }}
                    onLetterAnimationComplete={handleAnimationComplete}
                />

            </h2>

            <p data-aos="fade-up"
                className="mt-6 max-w-3xl text-[#0e221c] tracking-wide uppercase mb-8">
                Our work and insights are featured across top global publications. Our set of experiences is based on trust, transparency and a commitment to greatness
            </p>

            <ShufflingCardsGrid
                movesPerTick={4}
                animDuration={2}
            />

        </section>
    )
}
