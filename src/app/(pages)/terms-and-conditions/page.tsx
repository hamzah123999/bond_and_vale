"use client";

import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import TabLoader from "@/components/Loader";
import React from "react";

export default function TermsAndConditions() {
    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <section className="bg-[#eadcc9] text-[#0e221c]">
                <Header />
                <div className="mx-auto max-w-[1100px] px-4 md:px-10 py-16 md:py-24">
                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="font-[PPPangaia] uppercase tracking-wide leading-[1] text-[clamp(2.5rem,6vw,4.5rem)]">
                            Terms & Conditions
                        </h1>

                        <p className="mt-6 text-sm uppercase tracking-widest text-[#0e221c]/60">
                            Last updated: July 2025
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mt-16 space-y-14 text-[15px] leading-7 text-[#0e221c]/80">
                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">1. Introduction</h2>
                            <p>
                                These Terms & Conditions govern your use of the Bond &amp; Value website
                                and services. By accessing our website or engaging our services, you agree
                                to be bound by these terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">2. Services</h2>
                            <p>
                                Bond &amp; Value provides strategic communication, public relations,
                                marketing, and related consultancy services. All services are delivered
                                based on mutual agreement, scope, and objectives defined with the client.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">3. Pay-On-Success Model</h2>
                            <p>
                                Where applicable, our pay-on-success model means fees are based on agreed
                                results rather than upfront retainers. Specific success criteria,
                                timelines, and payment terms will always be defined in writing prior to
                                project commencement.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">4. Intellectual Property</h2>
                            <p>
                                All content, materials, strategies, designs, and intellectual property
                                created by Bond &amp; Value remain our property unless otherwise agreed in
                                writing. Unauthorized use, reproduction, or distribution is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">5. Client Responsibilities</h2>
                            <p>
                                Clients agree to provide accurate information, timely feedback, and
                                cooperation necessary for the successful delivery of services. Delays or
                                inaccuracies may affect outcomes and timelines.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">6. Limitation of Liability</h2>
                            <p>
                                While we strive for excellence, Bond &amp; Value cannot guarantee specific
                                results. We are not liable for indirect, incidental, or consequential
                                damages arising from the use of our services or website.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">7. Confidentiality</h2>
                            <p>
                                All client information and project details are treated as confidential and
                                will not be disclosed to third parties without consent, unless required by
                                law.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">8. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites. Bond &amp; Value is
                                not responsible for the content, accuracy, or policies of these external
                                sites.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">9. Termination</h2>
                            <p>
                                Either party may terminate a service agreement in accordance with the
                                agreed terms. Any outstanding obligations or payments due at the time of
                                termination remain payable.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">10. Governing Law</h2>
                            <p>
                                These Terms & Conditions are governed by and construed in accordance with
                                the laws of the Netherlands, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">11. Changes to These Terms</h2>
                            <p>
                                Bond &amp; Value reserves the right to update or modify these Terms &
                                Conditions at any time. Updates will be posted on this page with a revised
                                date.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase tracking-wider font-semibold text-2xl mb-4">12. Contact</h2>
                            <p>
                                For questions regarding these Terms & Conditions, please contact us at:
                            </p>
                            <p className="mt-2">
                                <strong>Email:</strong> info@bondandvalue.com
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </Wrapper>
    );
}
