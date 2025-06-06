"use client";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tutor } from "@/types/tutor";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/tutor/profile-image/${tutor._id}`;

  const averageRating =
    tutor.reviews && tutor.reviews.length > 0
      ? Number(
          (
            tutor.reviews.reduce((sum, r) => sum + r.rating, 0) /
            tutor.reviews.length
          ).toFixed(1)
        )
      : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden border-medium-green/20 bg-off-white dark:bg-forest-green/20">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={tutor.fullName}
            fill
            className="object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-dark-green dark:text-off-white">
              {tutor.fullName}
            </h3>
            <div className="flex items-center">
              {tutor.reviews && tutor.reviews.length > 0 ? (
                <>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-sm font-medium text-dark-green dark:text-off-white">
                    rating
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-muted-foreground italic">
                  No reviews yet
                </span>
              )}
            </div>
          </div>

          <div className="mb-3 flex items-center text-sm text-forest-green dark:text-lime/80">
            <MapPin className="mr-1 h-4 w-4" />
            {tutor.location}
          </div>

          <div className="mb-4 flex flex-wrap gap-1">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs border-medium-green/30 text-forest-green dark:text-lime/80"
              >
                +{tutor.subjects.length - 3} more
              </Badge>
            )}
          </div>

          <p className="mb-4 line-clamp-3 text-sm text-forest-green dark:text-off-white/80">
            {tutor.bio}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-medium-green/20 bg-lime/10 p-4 dark:bg-forest-green/40">
          <div className="font-medium text-dark-green dark:text-lime">
            $50/hour
          </div>
          <Link href={`/tutors/${tutor._id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
