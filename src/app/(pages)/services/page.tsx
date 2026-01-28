import Wrapper from '@/app/Wrapper'
import Header from '@/components/Header'
import TabLoader from '@/components/Loader'
import ServicesSection from '@/components/ServicesSection'
import React from 'react'

export default function Services() {
    return (
        <Wrapper>
            <TabLoader />
            {/* <TabLoader direction="top" speed={1.4} /> */}
            <div className="bg-[#e0d1be] min-h-screen">
                <Header />
                <ServicesSection
                headingTop='Our Services'
                headingBottom=''
                    services={[
                        {
                            title: "Public Relations",
                            imageSrc: "/services/PublicRelations.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567969/Video_Public_Relations_pw3b0q.mp4",
                            tag: "Service",
                            description: "Media outreach & brand positioning.",
                            href:"/public-relations"
                        },
                        {
                            title: "Brand Consultancy",
                            imageSrc: "/services/BrandConsultancy.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568016/Video_Brand_Consultancy_Fix_hmd5d0.mp4",
                            tag: "Service",
                            description: "Identity, strategy & messaging.",
                            href:"/brand-consultancy"
                        },
                        {
                            title: "Reputation Management",
                            imageSrc: "/services/ReputationManagement.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567960/Video_Reputation_Management_evuc5j.mp4",
                            tag: "Service",
                            description: "Protect and strengthen trust.",
                            href:"/reputation-management"
                        },
                        {
                            title: "Website Development",
                            imageSrc: "/services/WebsiteDevelopment.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567951/Video_Website_Development_p0yssr.mp4",
                            tag: "Service",
                            description: "Modern, fast conversion websites.",
                            href:"/website-development"
                        },
                        {
                            title: "Digital Marketing",
                            imageSrc: "/services/DigitalMarketing.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769568007/Video_Digital_Marketing_b4te6a.mp4",
                            tag: "Service",
                            description: "Performance + creative campaigns.",
                            href:"/digital-marketing"
                        },
                        {
                            title: "Investor Relations",
                            imageSrc: "/services/InvestorRelations.png",
                            videoSrc: "https://res.cloudinary.com/dpkp4hymz/video/upload/v1769567979/Video_Investor_Relations_wffyxy.mp4",
                            tag: "Service",
                            description: "Clear communication for investors.",
                            href:"/investor-relations"
                        },
                    ]}
                />
            </div>
        </Wrapper>
    )
}
