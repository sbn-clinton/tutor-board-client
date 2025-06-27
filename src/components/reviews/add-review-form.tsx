"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

interface AddReviewFormProps {
  tutorId: string;
  tutorName: string;
}

export function AddReviewForm({ tutorId, tutorName }: AddReviewFormProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/auth/login");
  }
  const userId = user?._id;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Comment too short",
        description:
          "Please provide a more detailed review (at least 10 characters).",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post(
        `/reviews/add-parent-review`,
        {
          rating,
          comment,
          tutorId,
          userId,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Review submitted",
          description: `Your review for ${tutorName} has been submitted successfully.`,
        });
        setRating(0);
        setComment("");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-medium-green/20 bg-off-white p-6 dark:bg-forest-green/20"
    >
      <h3 className="mb-4 text-lg font-bold text-dark-green dark:text-off-white">
        Write a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-green dark:text-off-white">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 transition-all ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-forest-green dark:text-lime/80">
              {rating > 0
                ? `${rating} star${rating !== 1 ? "s" : ""}`
                : "Select rating"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-dark-green dark:text-off-white"
          >
            Your Review
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this tutor..."
            rows={4}
            className="resize-none"
            required
          />
          <p className="text-xs text-forest-green dark:text-lime/80">
            {comment.length < 10
              ? `At least ${10 - comment.length} more character${
                  10 - comment.length !== 1 ? "s" : ""
                } required`
              : `${comment.length} characters`}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </motion.div>
  );
}
