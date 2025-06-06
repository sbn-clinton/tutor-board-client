"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroAnimation() {
  return (
    <div className="relative h-[400px] w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-[10%] top-[20%] h-64 w-48 overflow-hidden rounded-lg border-2 border-lime shadow-lg"
      >
        <Image
          src="/images/hero1.webp"
          alt="Tutor teaching"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute right-[15%] top-[10%] h-48 w-64 overflow-hidden rounded-lg border-2 border-medium-green shadow-lg"
      >
        <Image
          src="/images/hero2.webp"
          alt="Student learning"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-[10%] right-[25%] h-56 w-40 overflow-hidden rounded-lg border-2 border-forest-green shadow-lg"
      >
        <Image
          src="/images/hero3.webp"
          alt="Online tutoring"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute left-[30%] top-[40%] h-16 w-16 rounded-full bg-lime/30"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute bottom-[30%] left-[20%] h-12 w-12 rounded-full bg-medium-green/20"
      />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute right-[10%] top-[60%] h-14 w-14 rounded-full bg-forest-green/20"
      />
    </div>
  );
}
