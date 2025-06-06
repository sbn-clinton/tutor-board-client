"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroAnimation } from "@/components/animations/hero-animation";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-off-white to-lime/10 py-20 dark:from-dark-green dark:to-forest-green/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-dark-green dark:text-off-white sm:text-5xl md:text-6xl">
                  Find Your Perfect Tutor
                </h1>
                <p className="max-w-[600px] text-forest-green dark:text-lime/90 md:text-xl">
                  Connect with qualified tutors in your area for personalized
                  learning experiences. Boost your grades and confidence with
                  one-on-one tutoring.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/browse">
                  <Button size="lg" className="gap-1">
                    Browse Tutors <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    Become a Tutor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-off-white dark:bg-dark-green">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-dark-green dark:text-off-white sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[700px] text-forest-green dark:text-lime/90 md:text-xl">
                Our platform makes it easy to find, connect with, and learn from
                expert tutors.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="flex flex-col items-center space-y-2 rounded-lg border border-medium-green/20 p-6 shadow-sm bg-white dark:bg-forest-green/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-lime/30 p-3 dark:bg-lime/20">
                <Users className="h-6 w-6 text-medium-green dark:text-lime" />
              </div>
              <h3 className="text-xl font-bold text-dark-green dark:text-off-white">
                Browse Tutors
              </h3>
              <p className="text-center text-forest-green dark:text-off-white/80">
                Search through our extensive database of qualified tutors based
                on subject, location, and rating.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-2 rounded-lg border border-medium-green/20 p-6 shadow-sm bg-white dark:bg-forest-green/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-lime/30 p-3 dark:bg-lime/20">
                <BookOpen className="h-6 w-6 text-medium-green dark:text-lime" />
              </div>
              <h3 className="text-xl font-bold text-dark-green dark:text-off-white">
                Connect & Learn
              </h3>
              <p className="text-center text-forest-green dark:text-off-white/80">
                Contact tutors directly through our platform and schedule your
                first session.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-2 rounded-lg border border-medium-green/20 p-6 shadow-sm bg-white dark:bg-forest-green/20 sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-lime/30 p-3 dark:bg-lime/20">
                <Clock className="h-6 w-6 text-medium-green dark:text-lime" />
              </div>
              <h3 className="text-xl font-bold text-dark-green dark:text-off-white">
                Track Progress
              </h3>
              <p className="text-center text-forest-green dark:text-off-white/80">
                Monitor your learning journey and see your grades improve with
                regular tutoring sessions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-lime/10 py-20 dark:bg-forest-green/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-dark-green dark:text-off-white sm:text-4xl md:text-5xl">
                What Our Students Say
              </h2>
              <p className="max-w-[700px] text-forest-green dark:text-lime/90 md:text-xl">
                Hear from students who have transformed their academic
                performance with our tutors.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="rounded-lg border border-medium-green/20 bg-off-white p-6 shadow-sm dark:bg-forest-green/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src="/images/testimonial1.webp"
                    alt="Student"
                    fill
                    className="rounded-full border-2 border-lime object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-green dark:text-off-white">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-forest-green dark:text-lime/80">
                    High School Student
                  </p>
                </div>
              </div>
              <p className="mt-4 text-forest-green dark:text-off-white/80">
                "My math grades improved from a C to an A after just two months
                of tutoring. My tutor made complex concepts easy to understand."
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg border border-medium-green/20 bg-off-white p-6 shadow-sm dark:bg-forest-green/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src="/images/testimonial2.webp"
                    alt="Student"
                    fill
                    className="rounded-full border-2 border-lime object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-green dark:text-off-white">
                    Michael Chen
                  </h3>
                  <p className="text-sm text-forest-green dark:text-lime/80">
                    College Student
                  </p>
                </div>
              </div>
              <p className="mt-4 text-forest-green dark:text-off-white/80">
                "I was struggling with organic chemistry until I found my tutor
                on Tutor Board. Now I'm confident in my understanding and
                performing well on exams."
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg border border-medium-green/20 bg-off-white p-6 shadow-sm dark:bg-forest-green/20 sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src="/images/testimonial3.jpeg"
                    alt="Student"
                    fill
                    className="rounded-full border-2 border-lime object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-green dark:text-off-white">
                    Emily Rodriguez
                  </h3>
                  <p className="text-sm text-forest-green dark:text-lime/80">
                    Parent
                  </p>
                </div>
              </div>
              <p className="mt-4 text-forest-green dark:text-off-white/80">
                "Finding a qualified Spanish tutor for my daughter was so easy
                with Tutor Board. Her confidence has grown tremendously and
                she's now excelling in class."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-medium-green text-off-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Excel?
              </h2>
              <p className="max-w-[600px] text-off-white/90 md:text-xl">
                Join thousands of students who have improved their grades and
                confidence with Tutor Board.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="gap-1 bg-lime text-dark-green hover:bg-lime/80"
                >
                  Find a Tutor Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-off-white text-off-white hover:bg-forest-green hover:text-off-white"
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
