"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { Tutor } from "@/types/tutor";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface ContactTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor;
}

export default function ContactTutorModal({
  tutor,
  isOpen,
  onClose,
}: ContactTutorModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setFullName(user?.fullName);
    setEmail(user?.email);
    setPhone(user?.phone);
  }, [user]);

  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would send the message data to your backend
    // Example: axios.post('/api/messages', { tutorId: tutor.id, message, date, ... })

    console.log(fullName, email, phone, message);

    if (!fullName || !email || !phone || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/contact-tutor`,
        { tutorId: tutor._id, message, fullName, email, phone },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast({
          title: "Message Sent",
          description: `Your message has been sent to ${tutor.fullName}.`,
        });
        setMessage("");
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to send message.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact {tutor.fullName}</DialogTitle>
          <DialogDescription>
            Send a message to inquire about tutoring sessions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" required defaultValue={fullName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" required defaultValue={email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Your Phone </Label>
              <Input id="phone" required defaultValue={phone} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your tutoring needs..."
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
