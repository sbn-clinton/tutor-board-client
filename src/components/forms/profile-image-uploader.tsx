"use client";

import type React from "react";

import { useState, useRef, use, useEffect } from "react";
import { Button } from "../ui/button";
import { Camera, Upload, X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

interface ProfileImageUploaderProps {
  currentImage?: string;
  onImageSelected: (file: File) => void;
  name: string;
  path: string;
}

export function ProfileImageUploader({
  currentImage,
  onImageSelected,
  name,
  path,
}: ProfileImageUploaderProps) {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { setUser } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload
    setIsUploading(true);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await api.put(`/${path}/update-picture`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        onImageSelected(file);
        setIsUploading(false);
        toast({
          title: "Image uploaded successfully",
          description: "Your profile picture has been updated.",
        });
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      toast({
        title: "Error uploading image",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (currentImage) {
      const newImageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}/profile-image/${currentImage}`;
      setImageUrl(newImageUrl);
    }
  }, [currentImage]);

  const displayImage = previewImage || imageUrl;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-lime bg-lime/10 cursor-pointer hover:border-medium-green transition-colors"
          onClick={triggerFileInput}
        >
          {displayImage ? (
            <Image
              src={displayImage} // Use displayImage instead of reconstructing the URL
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Camera className="h-8 w-8 text-medium-green" />
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-green/50">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime border-t-transparent"></div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-dark-green/0 hover:bg-dark-green/30 transition-colors rounded-full">
            <Camera className="h-6 w-6 text-transparent hover:text-lime transition-colors" />
          </div>
        </div>

        <AnimatePresence>
          {previewImage && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        onClick={triggerFileInput}
        disabled={isUploading}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Update Profile Picture"}
      </Button>

      <p className="text-xs text-forest-green dark:text-lime/80">
        Click on the image or button to select. JPG, PNG or GIF. Max size 5MB.
      </p>
    </div>
  );
}
