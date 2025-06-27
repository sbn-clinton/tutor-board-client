"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Child } from "@/types/user";
import axios from "axios";
import AddChildForm from "../children/AddChildForm";
import EditChildForm from "../children/EditChildForm";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

interface ChildrenFormProps {
  children: Child[] | [];
  onChildrenUpdate: (children: Child[]) => void;
}

export function ChildrenForm({
  children,
  onChildrenUpdate,
}: ChildrenFormProps) {
  const { toast } = useToast();
  const [isAddingChild, setIsAddingChild] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState([] as string[]);

  const { setUser } = useAuth();

  const deleteChild = async (childId: string) => {
    const updatedChildren = children.filter((child) => child._id !== childId);
    onChildrenUpdate(updatedChildren);

    try {
      const res = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/delete-child/${childId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Child removed",
          description: "Child information has been removed successfully.",
        });
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error removing child",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Children */}
      <div className="space-y-4">
        {children.map((child) => (
          <motion.div
            key={child._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-medium-green/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-green dark:text-off-white">
                      {child.name}
                    </h3>
                    <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                      <div>
                        <span className="font-medium text-forest-green dark:text-lime/80">
                          Age:
                        </span>{" "}
                        {child.age} years old
                      </div>
                      <div>
                        <span className="font-medium text-forest-green dark:text-lime/80">
                          Grade:
                        </span>{" "}
                        {child.grade}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-forest-green dark:text-lime/80">
                          School:
                        </span>{" "}
                        {child.school}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-forest-green dark:text-lime/80">
                          Subjects:
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {child.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="secondary"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteChild(child._id)}
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

      {/* Add Form */}
      <AnimatePresence>
        {isAddingChild && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AddChildForm setIsAddingChild={setIsAddingChild} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Child Button */}
      {!isAddingChild && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAddingChild(true)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Child
        </Button>
      )}
    </div>
  );
}
