import SplitText from '@/components/SplitText'
import DoorRevealSection from '@/components/DoorRevealSection';
import ShufflingCardsGrid from '@/components/ShufflingCardsGrid';
import ProjectsFeatureSection from '@/components/ProjectsFeatureSection';
import BlogSection from '@/components/BlogSection';
import ExpandingHero from '@/components/ExpandingHero';
import ServicesSection from '@/components/ServicesSection';
import TabLoader from '@/components/Loader';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import FlowingMenuComp from '@/components/FlowingMenuComp';
import Wrapper from '@/app/Wrapper';
import Image from 'next/image';
import HeroClient from '@/components/HeroClient';
import ScrollTabsSectionComp from '@/components/ScrollTabsSectionComp';
import DoorRevealSectionComp from '@/components/DoorRevealSectionComp';
import ShufflingCards from '@/components/ShufflingCards';

export default function HomePage() {



  return (
    <Wrapper>
      <div className='bg-[#e0d1be] min-h-screen'>

        <TabLoader />

        <HeroClient />

        <DoorRevealSectionComp />

        <ShufflingCards />

        <div className=" ">
          <ScrollTabsSectionComp />
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
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567969/Video_Public_Relations_pw3b0q.mp4",
              tag: "Service",
              description: "Media outreach & brand positioning.",
              href: "/public-relations"
            },
            {
              title: "Brand Consultancy",
              imageSrc: "/services/BrandConsultancy.png",
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568016/Video_Brand_Consultancy_Fix_hmd5d0.mp4",
              tag: "Service",
              description: "Identity, strategy & messaging.",
              href: "/brand-consultancy"
            },
            {
              title: "Reputation Management",
              imageSrc: "/services/ReputationManagement.png",
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567960/Video_Reputation_Management_evuc5j.mp4",
              tag: "Service",
              description: "Protect and strengthen trust.",
              href: "/reputation-management"
            },
            {
              title: "Website Development",
              imageSrc: "/services/WebsiteDevelopment.png",
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567951/Video_Website_Development_p0yssr.mp4",
              tag: "Service",
              description: "Modern, fast conversion websites.",
              href: "/website-development"
            },
            {
              title: "Digital Marketing",
              imageSrc: "/services/DigitalMarketing.png",
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568007/Video_Digital_Marketing_b4te6a.mp4",
              tag: "Service",
              description: "Performance + creative campaigns.",
              href: "/digital-marketing"
            },
            {
              title: "Investor Relations",
              imageSrc: "/services/InvestorRelations.png",
              videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567979/Video_Investor_Relations_wffyxy.mp4",
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
