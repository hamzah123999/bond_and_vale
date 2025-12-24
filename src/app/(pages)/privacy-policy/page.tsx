"use client";

import Wrapper from "@/app/Wrapper";
import Header from "@/components/Header";
import TabLoader from "@/components/Loader";
import React from "react";

export default function PrivacyPolicy() {
    return (
        <Wrapper>
            <TabLoader direction="top" speed={1.4} minDuration={2000} />
            <section className="bg-[#eadcc9] text-[#0e221c]">
            <Header />
                <div className="mx-auto max-w-[1100px] px-4 md:px-10 py-16 md:py-24">
                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="font-[PPPangaia] uppercase tracking-wide leading-[1] text-[clamp(2.5rem,6vw,4.5rem)]">
                            Privacy Policy
                        </h1>

                        <p className="mt-6 text-sm uppercase tracking-widest text-[#0e221c]/60">
                            Last updated: July 2025
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mt-16 space-y-14 text-[15px] leading-7 text-[#0e221c]/80">
                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">1. Introduction</h2>
                            <p>
                                Bond &amp; Value (“we”, “our”, “us”) respects your privacy and is committed
                                to protecting your personal data. This Privacy Policy explains how we
                                collect, use, and safeguard your information when you visit our website
                                or use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">2. Information We Collect</h2>
                            <p>We may collect the following types of personal data:</p>
                            <ul className="mt-4 list-disc pl-6 space-y-2">
                                <li>Name and contact details (email address, phone number)</li>
                                <li>Information you submit via contact forms</li>
                                <li>Technical data such as IP address, browser type, and device information</li>
                                <li>Usage data regarding how you interact with our website</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">3. How We Use Your Data</h2>
                            <p>Your data is used only when necessary and for legitimate purposes, including:</p>
                            <ul className="mt-4 list-disc pl-6 space-y-2">
                                <li>Responding to inquiries and requests</li>
                                <li>Providing and improving our services</li>
                                <li>Website analytics and performance optimization</li>
                                <li>Legal and regulatory compliance</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">4. Cookies & Tracking</h2>
                            <p>
                                Our website may use cookies and similar technologies to enhance user
                                experience and analyze website performance. You can control or disable
                                cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">5. Data Sharing</h2>
                            <p>
                                We do not sell or rent your personal data. Your information may only be
                                shared with trusted partners when necessary to provide our services or
                                when legally required.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">6. Data Security</h2>
                            <p>
                                We take appropriate technical and organizational measures to protect your
                                personal data against unauthorized access, loss, or misuse.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">7. Your Rights</h2>
                            <p>
                                Under applicable data protection laws, you have the right to:
                            </p>
                            <ul className="mt-4 list-disc pl-6 space-y-2">
                                <li>Access your personal data</li>
                                <li>Request correction or deletion</li>
                                <li>Withdraw consent at any time</li>
                                <li>Object to data processing</li>
                                <li>Request data portability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">8. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites. We are not
                                responsible for the privacy practices or content of those websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be
                                posted on this page with an updated revision date.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-[PPPangaia] uppercase font-semibold tracking-wider text-2xl mb-4">10. Contact</h2>
                            <p>
                                If you have any questions about this Privacy Policy or how we handle your
                                data, please contact us at:
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
