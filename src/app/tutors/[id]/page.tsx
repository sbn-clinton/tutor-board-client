"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Clock, FileText, Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ContactTutorModal from "@/components/tutors/contact-tutor-modal";
import { PageTransition } from "@/components/animations/page-transition";
import { motion } from "framer-motion";
import axios from "axios";
import { Tutor } from "@/types/tutor";
import { AddReviewForm } from "@/components/reviews/add-review-form";
import { useAuth } from "@/context/AuthContext";

export default function TutorProfile() {
  const params = useParams();
  const [tutor, setTutor] = useState<Tutor>();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const getTutor = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor/${params.id}`,
          { withCredentials: true }
        );
        const data = response.data;
        setTutor(data);
      } catch (error) {
        console.error("Error fetching tutor:", error);
        return { message: "Error fetching tutor", error };
      }
    };

    getTutor();
  }, [params.id]);

  if (!tutor) {
    return (
      <div className="container py-10">
        Loading...
        <span className="animate-spin"></span>
      </div>
    );
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/tutor/profile-image/${tutor._id}`;

  const averageRating =
    tutor.reviews && tutor.reviews.length > 0
      ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) /
        tutor.reviews.length
      : 0;

  return (
    <PageTransition>
      <div className="container px-4 py-10 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar with profile info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={tutor.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-2xl font-bold">{tutor.fullName}</h1>

                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {averageRating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({tutor.reviews?.length ?? 0} reviews)
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        {tutor.location}
                      </div>
                    </div>

                    <div className="w-full">
                      <p className="mb-2 text-center text-lg font-bold">
                        $100/month
                      </p>
                      {user?.role === "parent" && (
                        <Button
                          className="w-full"
                          onClick={() => setIsContactModalOpen(true)}
                        >
                          Contact Tutor
                        </Button>
                      )}
                    </div>

                    <div className="w-full">
                      <h3 className="mb-2 font-medium">Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="w-full">
                      <h3 className="mb-2 font-medium">Availability</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          {/* ✅ NEW FIELD: array of available days */}
                          {tutor.availableDays?.map((day) => (
                            <span
                              key={day}
                              className="flex items-center gap-1 mr-1"
                            >
                              {day},
                            </span>
                          ))}
                        </div>
                        <div className="flex items-start">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span>9:00 AM - 5:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="about">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>

                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-xl font-bold">About Me</h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        {tutor.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-xl font-bold">Certificates</h2>
                      <div className="space-y-4">
                        {tutor?.certificates?.map((cert, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <FileText className="h-5 w-5 text-gray-500" />
                            <div>
                              <h3 className="font-medium">{cert.certName}</h3>
                              <p className="text-sm text-gray-500">
                                {cert.schoolName} • {cert.year}
                              </p>
                              <Button
                                variant="link"
                                className="h-auto p-0 text-sm"
                              >
                                View Certificate
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="mb-4 text-xl font-bold">
                        Work Experience
                      </h2>
                      <div className="space-y-6">
                        {tutor?.workExperiences?.map((exp, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-gray-200 pl-4 dark:border-gray-700"
                          >
                            <h3 className="font-bold">{exp.role}</h3>
                            <p className="text-sm text-gray-500">
                              {exp.schoolName} • {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Parent Reviews</h2>
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {averageRating.toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({tutor.reviews?.length ?? 0} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Add Review Form */}
                      {user?.role === "parent" && (
                        <AddReviewForm
                          tutorId={tutor._id}
                          tutorName={tutor.fullName}
                        />
                      )}

                      <div className="mt-8 space-y-6">
                        {tutor?.reviews?.map((review) => (
                          <div
                            key={review._id}
                            className="border-b pb-4 last:border-0"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">
                                {review.parent.fullName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mb-2 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>

        <ContactTutorModal
          tutor={tutor}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
}
