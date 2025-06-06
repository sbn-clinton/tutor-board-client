import Link from "next/link"
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-medium-green/20 bg-off-white dark:bg-dark-green">
      <div className="container px-4 py-10 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-medium-green dark:text-lime" />
              <span className="text-lg font-bold text-dark-green dark:text-off-white">Tutor Board</span>
            </Link>
            <p className="text-sm text-forest-green dark:text-off-white/80">
              Connecting students with qualified tutors for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-medium-green hover:text-forest-green dark:text-lime dark:hover:text-lime/80"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-medium-green hover:text-forest-green dark:text-lime dark:hover:text-lime/80"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-medium-green hover:text-forest-green dark:text-lime dark:hover:text-lime/80"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-dark-green dark:text-lime">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/browse"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-dark-green dark:text-lime">For Tutors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/auth/register"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor-resources"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor-faq"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Tutor FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-dark-green dark:text-lime">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-forest-green hover:text-medium-green dark:text-off-white/80 dark:hover:text-lime"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-medium-green/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-forest-green dark:text-off-white/70">
              &copy; {new Date().getFullYear()} Tutor Board. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-xs text-forest-green hover:text-medium-green dark:text-off-white/70 dark:hover:text-lime"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-forest-green hover:text-medium-green dark:text-off-white/70 dark:hover:text-lime"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-forest-green hover:text-medium-green dark:text-off-white/70 dark:hover:text-lime"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
