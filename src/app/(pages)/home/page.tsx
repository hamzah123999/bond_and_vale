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
import TestimonialsSlider from '@/components/TestimonialsSlider';
import Wrapper from '@/app/Wrapper';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const handleAnimationComplete = () => {
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      <div className='bg-[#e0d1be] min-h-screen'>

        <TabLoader direction="top" speed={1.4} minDuration={2000} />



        <div className="relative">
          <video
            className="absolute md:inline hidden inset-0 h-full w-full object-cover"
            src="https://res.cloudinary.com/dixhnqcby/video/upload/v1765973067/videobg_d0ta23.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <video
            className="absolute md:hidden inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/mobile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <Header />
          <section className="relative h-[calc(100vh-6rem)] w-full flex items-center justify-center overflow-hidden">




            <div className="relative z-[2] flex md:h-full w-full  flex-col ">
              {/* Center Title */}
              <div className="flex flex-1 items-start justify-center px-4 pb-20 md:pb-0 md:pt-32">
                <h1 className={`text-center font-[PPPangaia] uppercase leading-[0.95] transition-all duration-300 tracking-wide text-[#e6d7c4] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] ${!isVisible ? 'opacity-0' : ''}`}>
                  <span className="block max-w-4xl leading-tight mx-auto text-center">
                    <SplitText
                      text="Pay On Success. Communication that connects."
                      className="text-[40px] sm:text-[70px] md:text-8xl text-center"
                      delay={300}
                      duration={2}
                      splitType="lines"
                      from={{ opacity: 0, y: 100 }}
                      onLetterAnimationComplete={handleAnimationComplete}
                    />
                  </span>
                </h1>
              </div>

              <div className="md:relative md:flex z-[3] hidden items-end  absolute bottom-5 justify-between md:px-6 px-3  lg:px-10 ">
                <TicketButton href='/contact' label='Contact' />
                <TicketButton href='/services' label='Services' />
              </div>
            </div>
            <div className="md:hidden z-[3] flex items-end gap-5 absolute bottom-0 justify-between px-3 pb-6 lg:px-10">
              <TicketButton href='/contact' label='Contact' />
              <TicketButton href='/services' label='Services' />
            </div>
          </section>
        </div>

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

        {/* <ScrollTabsSection tabs={tabs} className="mt-0" /> */}

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
              videoSrc: "/services/PublicRelations.mp4",
              tag: "Service",
              description: "Media outreach & brand positioning.",
              href: "/public-relations"
            },
            {
              title: "Brand Consultancy",
              imageSrc: "/services/BrandConsultancy.png",
              videoSrc: "/services/BrandConsultancy.mp4",
              tag: "Service",
              description: "Identity, strategy & messaging.",
              href: "/brand-consultancy"
            },
            {
              title: "Reputation Management",
              imageSrc: "/services/ReputationManagement.png",
              videoSrc: "/services/ReputationManagement.mp4",
              tag: "Service",
              description: "Protect and strengthen trust.",
              href: "/reputation-management"
            },
            {
              title: "Website Development",
              imageSrc: "/services/WebsiteDevelopment.png",
              videoSrc: "/services/WebsiteDevelopment.mp4",
              tag: "Service",
              description: "Modern, fast conversion websites.",
              href: "/website-development"
            },
            {
              title: "Digital Marketing",
              imageSrc: "/services/DigitalMarketing.png",
              videoSrc: "/services/DigitalMarketing.mp4",
              tag: "Service",
              description: "Performance + creative campaigns.",
              href: "/digital-marketing"
            },
            {
              title: "Investor Relations",
              imageSrc: "/services/InvestorRelations.png",
              videoSrc: "/services/InvestorRelations.mp4",
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
