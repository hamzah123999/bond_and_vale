"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /**
   * ✅ Fix "flash on reload" WITHOUT changing your animation:
   * - Hide overlay/panels by default with opacity/visibility classes (NO translate classes)
   * - Use useLayoutEffect so gsap.set() runs before first paint
   * - Remove the "pre-paint hide" classes right before opening animation
   */
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!overlay || !left || !right) return;

    if (!tlRef.current) {
      // Your original starting states (keep animation same)
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(left, { yPercent: -100, autoAlpha: 1 });
      gsap.set(right, { yPercent: -100, autoAlpha: 1 });

      const tl = gsap.timeline({ paused: true });

      tl.to(overlay, { autoAlpha: 1, duration: 0.15, ease: "power1.out" }, 0);
      tl.to(left, { yPercent: 0, duration: 0.55, ease: "expo.out" }, 0);
      tl.to(right, { yPercent: 0, duration: 0.55, ease: "expo.out" }, 0.1);

      tlRef.current = tl;
    }

    const tl = tlRef.current;

    if (menuOpen) {
      // allow clicking when open
      gsap.set(overlay, { pointerEvents: "auto" });

      // ✅ remove pre-paint hiding classes so GSAP can show it
      overlay.classList.remove("opacity-0", "invisible");
      left.classList.remove("opacity-0");
      right.classList.remove("opacity-0");

      tl.play(0);
    } else {
      // close animation (reverse) - keep your logic
      tl.reverse();
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(overlay, { pointerEvents: "none" });
        // (we don't re-add opacity classes here; gsap autoAlpha handles it)
      });
    }
  }, [menuOpen]);

  const menuItems = [
    { href: "/", label: "HOME" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  const path = usePathname();
  const changeColor = path === "/" ? false : true;

  return (
    <>
      <header className="navbar relative z-[999] w-full">
        <div className="w-full">
          <div className="mx-auto flex h-24 w-full max-w-[1400px] items-center justify-between px-6">
            {/* <div className="copyright-text lg:flex hidden items-center">
              <div className={`${!changeColor ? "text-white" : "text-black/90"}`}>
                Bond & Vale©
              </div>
            </div> */}

            <Link
              href="/"
              aria-current="page"
              className="ta-logo w-inline-block md:flex hidden items-center justify-center"
              onClick={closeMenu}
            >
              <Image
                src="/ylogo.svg"
                alt="Logo TA Creatives &amp; Design"
                width={200}
                height={200}
                className={`w-auto h-4 md:block hidden ${changeColor ? "invert" : ""} `}
              />
              {/* {
                !changeColor ? (
                ) : (
                  <>
                    <Image
                      src="/logoicon.webp"
                      alt="Logo TA Creatives &amp; Design"
                      width={200}
                      height={200}
                      className={`w-auto ${!changeColor ? "invert" : ""} `}
                    />
                  </>
                )
              } */}
            </Link>
            <Image
              src="/logoicon.webp"
              alt="Logo TA Creatives &amp; Design"
              width={200}
              height={200}
              className={`w-auto ${!changeColor ? "invert brightness-0" : ""} `}
            />
            {/* <Image
              src="/ylogoicon.svg"
              alt="Logo TA Creatives &amp; Design"
              width={200}
              height={200}
              className={`w-auto h-12`}
            /> */}

            {changeColor ? (
              <nav className="navbar-items hidden items-center gap-10 lg:flex">
                <Link href="/" className="text_rg-button text-black/90 hover:text-black">
                  <DecryptedText
                    text="Home"
                    className="text-black "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-black cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link
                  href="/services"
                  className="text_rg-button text-black/90 hover:text-black"
                >
                  <DecryptedText
                    text="Services"
                    className="text-black "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-black cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link href="/blog" className="text_rg-button text-black/90 hover:text-black">
                  <DecryptedText
                    text="Blog"
                    className="text-black "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-black cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link
                  href="/contact"
                  className="text_rg-button text-black/90 hover:text-black"
                >
                  <DecryptedText
                    text="Contact"
                    className="text-black "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-black cursor-pointer"
                    speed={50}
                  />
                </Link>
              </nav>
            ) : (
              <nav className="navbar-items hidden items-center gap-10 lg:flex">
                <Link href="/" className="text_rg-button text-white/90 hover:text-white">
                  <DecryptedText
                    text="Home"
                    className="text-white "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-white cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link
                  href="/services"
                  className="text_rg-button text-white/90 hover:text-white"
                >
                  <DecryptedText
                    text="Services"
                    className="text-white "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-white cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link href="/blog" className="text_rg-button text-white/90 hover:text-white">
                  <DecryptedText
                    text="Blog"
                    className="text-white "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-white cursor-pointer"
                    speed={50}
                  />
                </Link>
                <Link
                  href="/contact"
                  className="text_rg-button text-white/90 hover:text-white"
                >
                  <DecryptedText
                    text="Contact"
                    className="text-white "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-white cursor-pointer"
                    speed={50}
                  />
                </Link>
              </nav>
            )}

            {changeColor ? (
              <div className="navbar-wrapper-40 flex items-center gap-8">
                <Link
                  href="/contact"
                  className="contact-button hidden items-center gap-3 lg:inline-flex"
                  onClick={closeMenu}
                >
                  <div className="text-black/90 hover:text-black">
                    <DecryptedText
                      text="Let's Bond"
                      className="text-black "
                      useOriginalCharsOnly
                      animateOn="hover"
                      parentClassName="text-black cursor-pointer"
                      speed={50}
                    />
                  </div>
                  <ArrowRight className="h-4 w-4 text-black/90" />
                </Link>

                <button
                  type="button"
                  className="cursor-pointer text-black/90 hover:text-black"
                  aria-expanded={menuOpen}
                  aria-controls={navId}
                  onClick={toggleMenu}
                >
                  <DecryptedText
                    text="menu"
                    className="text-black "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-black cursor-pointer"
                    speed={50}
                  />
                </button>
              </div>
            ) : (
              <div className="navbar-wrapper-40 flex items-center gap-8">
                <Link
                  href="/contact"
                  className="contact-button hidden items-center gap-3 lg:inline-flex"
                  onClick={closeMenu}
                >
                  <div className="text-white/90 hover:text-white">
                    <DecryptedText
                      text="Let's Bond"
                      className="text-white "
                      useOriginalCharsOnly
                      animateOn="hover"
                      parentClassName="text-white cursor-pointer"
                      speed={50}
                    />
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/90" />
                </Link>

                <button
                  type="button"
                  className="cursor-pointer text-white/90 hover:text-white"
                  aria-expanded={menuOpen}
                  aria-controls={navId}
                  onClick={toggleMenu}
                >
                  <DecryptedText
                    text="menu"
                    className="text-white "
                    useOriginalCharsOnly
                    animateOn="hover"
                    parentClassName="text-white cursor-pointer"
                    speed={50}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <div
        id={navId}
        ref={overlayRef}
        aria-hidden={!menuOpen}
        // ✅ pre-paint hidden (prevents reload flash)
        className="nav-menu fixed inset-0 z-[1000] h-screen w-screen opacity-0 invisible"
      >
        <div className="absolute inset-0 bg-black/10" onClick={closeMenu} />

        <div className="menu-wrapper fixed inset-0 z-[9999] w-[100vw] h-[100dvh] min-h-[100svh] overflow-hidden">
          <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
            {/* LEFT PANEL */}
            <div
              ref={leftRef}
              // ✅ pre-paint hidden ONLY by opacity (no transform conflict)
              className="h-full bg-[#e8ddcf] overflow-hidden opacity-0"
            >
              <div className="flex h-full flex-col">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="lg:hidden flex items-end justify-end cursor-pointer"
                >
                  <span className="text-[#0e221c] px-5 font-medium pt-5">Close</span>
                </button>

                {menuItems.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      menu-link group relative flex flex-1 items-center
                      border-b border-black/20
                      px-[clamp(1rem,3vw,2.5rem)]
                    "
                  >
                    <span
                      className="
                        pointer-events-none absolute left-[clamp(1rem,3vw,2.5rem)]
                        top-1/2 -translate-y-1/2
                        opacity-0 -translate-x-3
                        transition-all duration-300 ease-out
                        group-hover:opacity-100 group-hover:translate-x-0
                      "
                    >
                      <ArrowRight className="h-[clamp(1.25rem,2.5vw,1.75rem)] w-[clamp(1.25rem,2.5vw,1.75rem)] text-[#0e221c]/60" />
                    </span>

                    <div className="flex w-full items-center justify-between">
                      <div
                        className="
                          font-[PPPangaia] uppercase leading-[0.95] text-[#0e221c]
                          text-[clamp(2.2rem,6vw,3.5rem)]
                          transition-transform duration-300 ease-out
                          group-hover:translate-x-[clamp(2.25rem,4vw,3.25rem)]
                        "
                      >
                        {item.label}
                      </div>

                      <ArrowRight
                        className="
                          h-[clamp(1.25rem,2.5vw,1.75rem)] w-[clamp(1.25rem,2.5vw,1.75rem)]
                          text-[#0e221c]/60
                          transition-opacity duration-300 ease-out
                          group-hover:opacity-0
                        "
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              ref={rightRef}
              // ✅ pre-paint hidden ONLY by opacity (no transform conflict)
              className="lg:block hidden relative h-full bg-[#0e221c] text-white overflow-hidden opacity-0"
            >
              <div className="flex h-full flex-col justify-between px-[clamp(1rem,3vw,2.5rem)] py-[clamp(1rem,3vh,2.5rem)]">
                <div className="relative flex items-start justify-center">
                  <Image
                    src="/logoicon.webp"
                    alt="Logo TA Creatives &amp; Design"
                    width={200}
                    height={200}
                    className="w-auto invert"
                  />

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="absolute right-0 top-0 inline-flex cursor-pointer items-center gap-2 text-white/90 hover:text-white"
                  >
                    <DecryptedText
                      text="close"
                      className="text-white "
                      useOriginalCharsOnly
                      animateOn="hover"
                      parentClassName="text-white cursor-pointer"
                      speed={50}
                    />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-[clamp(1rem,2.5vh,2rem)]">
                  <div className="menu-img w-full max-w-[min(380px,70vw)]">
                    <Image
                      src="/img17.png"
                      width={500}
                      height={500}
                      loading="lazy"
                      alt="Portret foto van Anne Tijhof"
                      className="h-[60vh] mx-auto mb-5 w-auto object-cover"
                    />
                  </div>

                  <div className="socials-wrapper flex items-center gap-[clamp(0.75rem,2vw,1.5rem)]">
                    <Link
                      href="https://www.instagram.com/bondandvale"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white
                        h-[clamp(2.5rem,5vh,3rem)] w-[clamp(2.5rem,5vh,3rem)]"
                    >
                      <Instagram className="h-6 w-6" />
                    </Link>

                    <Link
                      href="https://www.tiktok.com/@bondandvale"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="TikTok"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white
                        h-[clamp(2.5rem,5vh,3rem)] w-[clamp(2.5rem,5vh,3rem)]"
                    >
                      <span className="text-lg font-semibold">t</span>
                    </Link>

                    <Link
                      href="https://www.facebook.com/share/1BS1H9f9mn/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white
                        h-[clamp(2.5rem,5vh,3rem)] w-[clamp(2.5rem,5vh,3rem)]"
                    >
                      <Facebook className="h-6 w-6" />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/company/bond-vale"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white
                        h-[clamp(2.5rem,5vh,3rem)] w-[clamp(2.5rem,5vh,3rem)]"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                  </div>
                </div>

                <div className="menu-info-details flex w-full items-center justify-between text-white/80 text-[clamp(0.85rem,1.2vw,1rem)]">
                  <div className="text_rg-text">Home</div>

                  <div className="menu-legals flex gap-[clamp(0.75rem,2vw,1.5rem)]">
                    <Link
                      href="/terms-and-conditions"
                      className="text_rg-button underline underline-offset-4 hover:text-white"
                      onClick={closeMenu}
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="text_rg-button underline underline-offset-4 hover:text-white"
                      onClick={closeMenu}
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </>
  );
}
