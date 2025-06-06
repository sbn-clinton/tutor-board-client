"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkExperience } from "@/types/user";
import AddExperienceForm from "../experience/AddExperienceForm";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface ExperienceFormProps {
  workExperiences: WorkExperience[];
}

export function ExperienceForm({ workExperiences }: ExperienceFormProps) {
  const { toast } = useToast();
  const [isAddingExperience, setIsAddingExperience] = useState(false);

  const { setUser } = useAuth();

  const deleteExperience = async (experienceId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-work-experiences/${experienceId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Experience deleted",
          description: "Experience has been deleted successfully.",
        });
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting experience",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Experiences */}
      <div className="space-y-4">
        {workExperiences.map((experience) => (
          <motion.div
            key={experience._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-medium-green/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-green dark:text-off-white">
                      {experience.role}
                    </h3>
                    <p className="text-medium-green dark:text-lime">
                      {experience.schoolName} • {experience.period}
                    </p>
                    {experience.description && (
                      <p className="mt-2 text-sm text-forest-green dark:text-off-white/80">
                        {experience.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExperience(experience._id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAddingExperience && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AddExperienceForm setIsAddingExperience={setIsAddingExperience} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Experience Button */}
      {!isAddingExperience && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAddingExperience(true)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Work Experience
        </Button>
      )}
    </div>
  );
}
