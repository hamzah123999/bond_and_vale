"use client";

import Link from "next/link";
import { useId } from "react";

type ContactFormLegalProps = {
    marketingOptIn: boolean;
    onMarketingOptInChange: (checked: boolean) => void;
    disabled?: boolean;
};

export default function ContactFormLegal({
    marketingOptIn,
    onMarketingOptInChange,
    disabled = false,
}: ContactFormLegalProps) {
    const checkboxId = useId();

    return (
        <div className="space-y-3">
            <p className="text-sm text-[#0e221c]/90">
                By clicking Let&apos;s Bond, you agree to our{" "}
                <Link
                    href="/terms-and-conditions"
                    className="underline underline-offset-2 hover:text-[#0e221c]"
                >
                    Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy-policy"
                    className="underline underline-offset-2 hover:text-[#0e221c]"
                >
                    Privacy Policy
                </Link>
                .
            </p>

            <label
                htmlFor={checkboxId}
                className="flex items-start gap-3 text-sm text-[#0e221c]/90 cursor-pointer"
            >
                <input
                    id={checkboxId}
                    name="marketingOptIn"
                    type="checkbox"
                    checked={marketingOptIn}
                    onChange={(e) => onMarketingOptInChange(e.target.checked)}
                    disabled={disabled}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#3f4b3f]"
                />
                <span>
                    I&apos;d like to receive news, insights and marketing emails from Bond
                    &amp; Vale. You can unsubscribe at any time.
                </span>
            </label>
        </div>
    );
}
