import Wrapper from '@/app/Wrapper'
import Header from '@/components/Header'
import ServicesSection from '@/components/ServicesSection'
import { SERVICE_CARDS } from '@/lib/media/service-videos'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Our Services",
    description:
        "Explore Bond & Vale's services: public relations, brand consultancy, reputation management, digital marketing, and more.",
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "Our Services | Bond & Vale",
        description:
            "Explore Bond & Vale's integrated communications services for brand growth and strategic influence.",
        url: "/services",
    },
};

export default function Services() {
    return (
        <Wrapper>
            <div className="bg-[#e0d1be] min-h-screen">
                <Header />
                <ServicesSection
                headingTop='Our Services'
                headingBottom=''
                    services={SERVICE_CARDS}
                />
            </div>
        </Wrapper>
    )
}
