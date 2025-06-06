"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  Users,
  BookOpen,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/animations/page-transition";

export default function AboutUs() {
  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users },
    { number: "2,500+", label: "Qualified Tutors", icon: Award },
    { number: "50+", label: "Subjects Covered", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Target },
  ];

  const values = [
    {
      title: "Quality Education",
      description:
        "We believe every student deserves access to high-quality, personalized education that meets their unique learning needs.",
      icon: Award,
    },
    {
      title: "Passionate Teaching",
      description:
        "Our tutors are passionate educators who are committed to helping students achieve their academic goals and build confidence.",
      icon: Heart,
    },
    {
      title: "Innovation",
      description:
        "We continuously innovate our platform to provide the best possible learning experience for both students and tutors.",
      icon: Lightbulb,
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team1.webp",
      bio: "Former educator with 15 years of experience in personalized learning.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team3.webp",
      bio: "Tech leader passionate about using technology to improve education.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      image: "/images/team2.webp",
      bio: "Curriculum specialist with expertise in adaptive learning methodologies.",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-lime/10 to-off-white py-20 dark:from-forest-green/30 dark:to-dark-green">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center"
              >
                <h1 className="mb-6 text-4xl font-bold tracking-tighter text-dark-green dark:text-off-white sm:text-5xl md:text-6xl">
                  About Tutor Board
                </h1>
                <p className="mb-8 text-xl text-forest-green dark:text-lime/90">
                  We're on a mission to make quality education accessible to
                  everyone through personalized tutoring connections.
                </p>
                <Link href="/browse">
                  <Button size="lg" className="gap-2">
                    Start Learning Today <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[400px] w-full max-w-md">
                  <Image
                    src="/images/about1.webp"
                    alt="Students learning"
                    fill
                    className="rounded-lg border-2 border-medium-green object-cover shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime/20">
                    <stat.icon className="h-8 w-8 text-medium-green dark:text-lime" />
                  </div>
                  <div className="mb-2 text-3xl font-bold text-dark-green dark:text-off-white">
                    {stat.number}
                  </div>
                  <div className="text-forest-green dark:text-lime/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-lime/5 py-20 dark:bg-forest-green/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-bold text-dark-green dark:text-off-white sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mb-8 text-lg text-forest-green dark:text-lime/90">
                  At Tutor Board, we believe that every student has the
                  potential to excel when given the right support and guidance.
                  Our mission is to bridge the gap between students seeking help
                  and qualified tutors who can provide personalized, effective
                  instruction. We're committed to creating a platform that makes
                  quality education accessible, affordable, and convenient for
                  learners of all ages and backgrounds.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-dark-green dark:text-off-white sm:text-4xl">
                  Our Values
                </h2>
                <p className="text-lg text-forest-green dark:text-lime/90">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-medium-green/20 bg-white dark:bg-forest-green/20">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime/20">
                          <value.icon className="h-8 w-8 text-medium-green dark:text-lime" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-dark-green dark:text-off-white">
                          {value.title}
                        </h3>
                        <p className="text-forest-green dark:text-off-white/80">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-lime/5 py-20 dark:bg-forest-green/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-dark-green dark:text-off-white sm:text-4xl">
                  Meet Our Team
                </h2>
                <p className="text-lg text-forest-green dark:text-lime/90">
                  The passionate people behind Tutor Board
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                      <CardContent className="p-6 text-center">
                        <div className="relative h-[120px] w-[120px] mb-4 mx-auto">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="rounded-full border-4 border-lime object-cover"
                          />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-dark-green dark:text-off-white">
                          {member.name}
                        </h3>
                        <p className="mb-3 text-medium-green dark:text-lime">
                          {member.role}
                        </p>
                        <p className="text-sm text-forest-green dark:text-off-white/80">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-medium-green py-20 text-off-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Join Our Community
              </h2>
              <p className="mb-8 text-xl text-off-white/90">
                Whether you're looking to learn or teach, we'd love to have you
                as part of our growing community
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/browse">
                  <Button
                    size="lg"
                    className="bg-lime text-dark-green hover:bg-lime/80"
                  >
                    Find a Tutor
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-off-white text-off-white hover:bg-forest-green"
                  >
                    Become a Tutor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
