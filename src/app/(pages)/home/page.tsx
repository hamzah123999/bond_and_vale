"use client";

import Header from '@/components/Header'
import TicketButton from '@/components/TicketButton'
import SplitText from '@/components/SplitText'
import DoorRevealSection from '@/components/DoorRevealSection';
import ShufflingCardsGrid from '@/components/ShufflingCardsGrid';
import ProjectsFeatureSection from '@/components/ProjectsFeatureSection';
import BlogSection from '@/components/BlogSection';
import ExpandingHero from '@/components/ExpandingHero';
import ServicesSection from '@/components/ServicesSection';
import TabLoader from '@/components/Loader';
import FlowingMenuComp from '@/components/FlowingMenuComp';
// import TestimonialsSlider from '@/components/TestimonialsSlider';
import Wrapper from '@/app/Wrapper';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import HeroClient from '@/components/HeroClient';

const TestimonialsSlider = dynamic(() => import("@/components/TestimonialsSlider"), { ssr: false });

const ScrollTabsSection = dynamic(() => import("@/components/ScrollTabsSection"), {
  ssr: false,
  loading: () => <div className="h-[60vh]" />,
});

export default function HomePage() {
  const handleAnimationComplete = () => {
  };


  return (
    <Wrapper>
      <div className='bg-[#e0d1be] min-h-screen'>

        <TabLoader />

        <HeroClient />
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
              At Bond & Vale, we’re an integrated communications consultancy
              dedicated to helping brands grow with purpose, credibility and
              trust.
              Through our expertise in strategic storytelling, brand positioning
              and digital innovation, we elevate visibility, strengthen reputation
              and drive measurable long-term growth.


            </p>
          </div>
        </DoorRevealSection>

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

        <div className=" ">
          <ScrollTabsSection />
        </div>

        <ProjectsFeatureSection
          leftImage="/img17.png"
          rightTopImage="/img3.png"
          title={"Strategic PR & Marketing for Exceptional Brand Growth"}
          body="We’re not a firm that simply accepts change as inevitable — we embrace it. We shape the narrative, putting you firmly in control. This evolution of our identity makes that clear. It’s more than a new look or rebrand; it’s a declaration of who we are and what we stand for. A commitment to move forward — always — alongside our clients.
We are Bond and Vale. Redefining Influence."
          buttonHref="/services"
          buttonLabel="Services"
        />



        <div className="py-10 bg-[#e6d7c4]">
          <FlowingMenuComp />
        </div>


        <ServicesSection
          services={[
            {
              title: "Public Relations",
              imageSrc: "/services/PublicRelations.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779872/PublicRelations_iyh2vz.mp4",
              tag: "Service",
              description: "Media outreach & brand positioning.",
              href: "/public-relations"
            },
            {
              title: "Brand Consultancy",
              imageSrc: "/services/BrandConsultancy.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779882/BrandConsultancy_fklcds.mp4",
              tag: "Service",
              description: "Identity, strategy & messaging.",
              href: "/brand-consultancy"
            },
            {
              title: "Reputation Management",
              imageSrc: "/services/ReputationManagement.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779877/ReputationManagement_pyi6ng.mp4",
              tag: "Service",
              description: "Protect and strengthen trust.",
              href: "/reputation-management"
            },
            {
              title: "Website Development",
              imageSrc: "/services/WebsiteDevelopment.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779875/WebsiteDevelopment_pylnuy.mp4",
              tag: "Service",
              description: "Modern, fast conversion websites.",
              href: "/website-development"
            },
            {
              title: "Digital Marketing",
              imageSrc: "/services/DigitalMarketing.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779874/DigitalMarketing_pzqiwq.mp4",
              tag: "Service",
              description: "Performance + creative campaigns.",
              href: "/digital-marketing"
            },
            {
              title: "Investor Relations",
              imageSrc: "/services/InvestorRelations.png",
              videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779870/InvestorRelations_trvvqh.mp4",
              tag: "Service",
              description: "Clear communication for investors.",
              href: "/investor-relations"
            },
          ]}
        />


        <ExpandingHero imageSrc="/bg.png" quote='"We shape brands with clarity,
strategy, and long-term value."
                  ' />

        <div className="overflow-x-hidden">
          <TestimonialsSlider />
        </div>


        <BlogSection intro="Discover the latest trends, tips, and inspiration. Stay up-to-date on our latest projects and insights." />
      </div >
    </Wrapper>
  )
}
