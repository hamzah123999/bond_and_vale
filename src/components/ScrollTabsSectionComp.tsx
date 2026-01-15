"use client"
import dynamic from 'next/dynamic';
import React from 'react'

const ScrollTabsSection = dynamic(() => import("@/components/ScrollTabsSection"), {
    ssr: false,
    loading: () => <div className="h-[60vh]" />,
});

export default function ScrollTabsSectionComp() {
    return (
        <div>
            <ScrollTabsSection />
        </div>
    )
}
