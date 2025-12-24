import Wrapper from '@/app/Wrapper'
import Header from '@/components/Header'
import TabLoader from '@/components/Loader'
import ServicesSection from '@/components/ServicesSection'
import React from 'react'

export default function Services() {
    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            {/* <TabLoader direction="top" speed={1.4} /> */}
            <div className="bg-[#e6d7c4] min-h-screen">
                <Header />
                <ServicesSection
                headingTop='Our Services'
                headingBottom=''
                    services={[
                        {
                            title: "Public Relations",
                            imageSrc: "/services/PublicRelations.png",
                            videoSrc: "/services/PublicRelations.mp4",
                            tag: "Service",
                            description: "Media outreach & brand positioning.",
                            href:"/public-relations"
                        },
                        {
                            title: "Brand Consultancy",
                            imageSrc: "/services/BrandConsultancy.png",
                            videoSrc: "/services/BrandConsultancy.mp4",
                            tag: "Service",
                            description: "Identity, strategy & messaging.",
                            href:"/brand-consultancy"
                        },
                        {
                            title: "Reputation Management",
                            imageSrc: "/services/ReputationManagement.png",
                            videoSrc: "/services/ReputationManagement.mp4",
                            tag: "Service",
                            description: "Protect and strengthen trust.",
                            href:"/reputation-management"
                        },
                        {
                            title: "Website Development",
                            imageSrc: "/services/WebsiteDevelopment.png",
                            videoSrc: "/services/WebsiteDevelopment.mp4",
                            tag: "Service",
                            description: "Modern, fast conversion websites.",
                            href:"/website-development"
                        },
                        {
                            title: "Digital Marketing",
                            imageSrc: "/services/DigitalMarketing.png",
                            videoSrc: "/services/DigitalMarketing.mp4",
                            tag: "Service",
                            description: "Performance + creative campaigns.",
                            href:"/digital-marketing"
                        },
                        {
                            title: "Investor Relations",
                            imageSrc: "/services/InvestorRelations.png",
                            videoSrc: "/services/InvestorRelations.mp4",
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
