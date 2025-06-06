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
import { toast, useToast } from "../ui/use-toast";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Child } from "@/types/user";
import axios from "axios";

interface ChildFormProps {
  setIsAddingChild: (isAddingChild: boolean) => void;
  setEditingChild: (editingChild: boolean) => void;
  startEdit: (child: Child) => void;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGrade: (grade: string) => void;
  setSchool: (school: string) => void;
  setSubjects: (subjects: string[]) => void;
  name: string;
  age: string;
  grade: string;
  school: string;
  subjects: string[];
}

const EditChildForm = ({
  setIsAddingChild,
  setEditingChild,
  startEdit,
  setName,
  setAge,
  setGrade,
  setSchool,
  setSubjects,
  name,
  age,
  grade,
  school,
  subjects,
}: ChildFormProps) => {
  const [newSubject, setNewSubject] = useState("");

  const grades = [
    "Kindergarten",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
    "11th Grade",
    "12th Grade",
    "College Freshman",
    "College Sophomore",
    "College Junior",
    "College Senior",
    "Graduate",
  ];

  const commonSubjects = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Spanish",
    "French",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
  ];

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !grade || !school) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/update-children`,
        { name, age, grade, school, subjects },
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast({
          title: "Child updated",
          description: "Your child information has been updated successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating child",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const cancelForm = () => {
    setName("");
    setAge("");
    setGrade("");
    setSchool("");
    setSubjects([]);
    setIsAddingChild(false);
    setEditingChild(false);
    setNewSubject("");
  };

  return (
    <Card className="border-medium-green/20">
      <CardHeader>
        <CardTitle className="text-dark-green dark:text-off-white">
          Edit Child
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name *</Label>
              <Input
                id="childName"
                defaultValue={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter child's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childAge">Age *</Label>
              <Input
                id="childAge"
                type="number"
                min="3"
                max="25"
                defaultValue={age}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childGrade">Grade *</Label>
              <Select
                defaultValue={grade}
                value={grade}
                onValueChange={(value) => setGrade(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="childSchool">School *</Label>
              <Input
                id="childSchool"
                defaultValue={school}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Enter school name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subjects Needing Help</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newSubject} onValueChange={setNewSubject}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {commonSubjects
                    .filter((subject) => subjects.includes(subject))
                    .map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addSubject} disabled={!newSubject}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit">Edit Child</Button>
            <Button type="button" variant="outline" onClick={cancelForm}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditChildForm;
