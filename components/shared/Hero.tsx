"use client"; // Important: This allows motion and interactive buttons

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Next.js Link instead of TanStack
import Image from "next/image"; // Next.js Image for optimization
import { Show } from "@clerk/nextjs";

interface HeroProps {
  eventCount: number;
}

export default function Hero({ eventCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <p className="text-sm font-medium mb2 uppercase tracking-normal ">
            Volume No. 026
          </p>
          {/* <div className="inline-flex w-fit items-center gap-2 rounded-none border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            Volume No. 026
          </div> */}
          <h1 className="mt-6 font-serif text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Find your <span className="italic text-accent">people.</span>
            <br />
            Make the night.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground text-balance">
            Discover and host high-fidelity events within a premium curated
            ecosystem. From technology summits to artisanal culinary
            experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Show when="signed-in">
              <Button asChild size="lg" className="rounded-none">
                <Link href="/events/create">
                  Host an event
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-in">
                <Button size="lg" className="rounded-none cursor-pointer">
                  Sign in to host
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </Show>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none"
            >
              <Link href="#events">Browse events</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          // className="flex flex-center"
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
            <Image
              src="/assets/images/hero.jpg" // Using your existing Next.js image path
              alt="Crowd at an event"
              width={1600}
              height={1200}
              priority
              className="max-h[70vh] h-full object-cover objectcontain objectcenter 2xl:max-h[50vh] rounded-2xl"
              // className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 -left-8 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm sm:block">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              This week
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {eventCount} Events
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
