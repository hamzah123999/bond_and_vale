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
            <div className="bg-[#e0d1be] min-h-screen">
                <Header />
                <ServicesSection
                headingTop='Our Services'
                headingBottom=''
                    services={[
                        {
                            title: "Public Relations",
                            imageSrc: "/services/PublicRelations.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779872/PublicRelations_iyh2vz.mp4",
                            tag: "Service",
                            description: "Media outreach & brand positioning.",
                            href:"/public-relations"
                        },
                        {
                            title: "Brand Consultancy",
                            imageSrc: "/services/BrandConsultancy.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779882/BrandConsultancy_fklcds.mp4",
                            tag: "Service",
                            description: "Identity, strategy & messaging.",
                            href:"/brand-consultancy"
                        },
                        {
                            title: "Reputation Management",
                            imageSrc: "/services/ReputationManagement.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779877/ReputationManagement_pyi6ng.mp4",
                            tag: "Service",
                            description: "Protect and strengthen trust.",
                            href:"/reputation-management"
                        },
                        {
                            title: "Website Development",
                            imageSrc: "/services/WebsiteDevelopment.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779875/WebsiteDevelopment_pylnuy.mp4",
                            tag: "Service",
                            description: "Modern, fast conversion websites.",
                            href:"/website-development"
                        },
                        {
                            title: "Digital Marketing",
                            imageSrc: "/services/DigitalMarketing.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779874/DigitalMarketing_pzqiwq.mp4",
                            tag: "Service",
                            description: "Performance + creative campaigns.",
                            href:"/digital-marketing"
                        },
                        {
                            title: "Investor Relations",
                            imageSrc: "/services/InvestorRelations.png",
                            videoSrc: "https://res.cloudinary.com/dixhnqcby/video/upload/v1767779870/InvestorRelations_trvvqh.mp4",
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
