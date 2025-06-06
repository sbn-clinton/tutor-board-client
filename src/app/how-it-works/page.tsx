"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, MessageCircle, Calendar, Star, CheckCircle, Users, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/animations/page-transition"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Sign up as a student/parent or tutor. Complete your profile with your information, subjects, and preferences.",
      icon: Users,
      color: "bg-lime/20",
    },
    {
      number: "02",
      title: "Browse & Search",
      description: "Use our advanced search filters to find tutors by subject, location, price, and availability.",
      icon: Search,
      color: "bg-medium-green/20",
    },
    {
      number: "03",
      title: "Connect & Message",
      description: "Send messages to potential tutors, discuss your learning goals, and schedule a trial session.",
      icon: MessageCircle,
      color: "bg-forest-green/20",
    },
    {
      number: "04",
      title: "Schedule Sessions",
      description: "Book regular tutoring sessions that fit your schedule. Track your progress and achievements.",
      icon: Calendar,
      color: "bg-lime/30",
    },
  ]

  const features = [
    {
      title: "Verified Tutors",
      description: "All our tutors are background-checked and verified for quality assurance.",
      icon: CheckCircle,
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions that work with your busy schedule, including evenings and weekends.",
      icon: Clock,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress reports and feedback.",
      icon: Star,
    },
    {
      title: "Subject Variety",
      description: "Find tutors for any subject from elementary math to advanced university courses.",
      icon: BookOpen,
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-lime/10 to-off-white py-20 dark:from-forest-green/30 dark:to-dark-green">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="mb-6 text-4xl font-bold tracking-tighter text-dark-green dark:text-off-white sm:text-5xl md:text-6xl">
                  How Tutor Board Works
                </h1>
                <p className="mb-8 text-xl text-forest-green dark:text-lime/90">
                  Getting started with personalized tutoring is simple. Follow these easy steps to connect with the
                  perfect tutor for your learning needs.
                </p>
                <Link href="/browse">
                  <Button size="lg" className="gap-2">
                    Get Started Now <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-dark-green dark:text-off-white sm:text-4xl">
                  Simple Steps to Success
                </h2>
                <p className="text-lg text-forest-green dark:text-lime/90">
                  Our platform makes it easy to find and connect with qualified tutors
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="relative h-full border-medium-green/20 bg-white dark:bg-forest-green/20">
                      <CardContent className="p-6">
                        <div
                          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${step.color}`}
                        >
                          <step.icon className="h-6 w-6 text-medium-green dark:text-lime" />
                        </div>
                        <Badge variant="secondary" className="mb-3">
                          Step {step.number}
                        </Badge>
                        <h3 className="mb-3 text-xl font-bold text-dark-green dark:text-off-white">{step.title}</h3>
                        <p className="text-forest-green dark:text-off-white/80">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-lime/5 py-20 dark:bg-forest-green/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-dark-green dark:text-off-white sm:text-4xl">
                  Why Choose Tutor Board?
                </h2>
                <p className="text-lg text-forest-green dark:text-lime/90">
                  We provide the tools and support you need for successful learning
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-medium-green/10">
                      <feature.icon className="h-8 w-8 text-medium-green dark:text-lime" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-dark-green dark:text-off-white">{feature.title}</h3>
                    <p className="text-forest-green dark:text-off-white/80">{feature.description}</p>
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
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Start Your Learning Journey?</h2>
              <p className="mb-8 text-xl text-off-white/90">
                Join thousands of students who have improved their grades with our platform
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/browse">
                  <Button size="lg" className="bg-lime text-dark-green hover:bg-lime/80">
                    Find a Tutor
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline" className="border-off-white text-off-white hover:bg-forest-green">
                    Become a Tutor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
