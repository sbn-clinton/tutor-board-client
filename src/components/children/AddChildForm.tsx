"use client";

import { Loader, Loader2, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Child } from "@/types/user";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { set } from "date-fns";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface ChildFormProps {
  setIsAddingChild: (isAddingChild: boolean) => void;
}

const AddChildForm = ({ setIsAddingChild }: ChildFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState([] as string[]);
  const [isLoading, setIsLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const { setUser } = useAuth();

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

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject();
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setSubjects(subjects.filter((s) => s !== subjectToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !grade || !school || !subjects) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log(name, age, grade, school, subjects);

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/update-children`,
        { name, age, grade, school, subjects },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast({
          title: "Child updated",
          description: "Your child information has been updated successfully.",
        });
        setUser(res.data.user);
        setName("");
        setAge("");
        setGrade("");
        setSchool("");
        setSubjects([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating child",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelForm = () => {
    setName("");
    setAge("");
    setGrade("");
    setSchool("");
    setSubjects([]);
    setIsAddingChild(false);
    setNewSubject("");
  };
  return (
    <Card className="border-medium-green/20">
      <CardHeader>
        <CardTitle className="text-dark-green dark:text-off-white">
          Add Child
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name *</Label>
              <Input
                id="childName"
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childGrade">Grade *</Label>
              <Select value={grade} onValueChange={(value) => setGrade(value)}>
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
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a subject and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addSubject}
                disabled={!newSubject.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* <div className="space-y-2">
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
                  {commonSubjects.map((subject) => (
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
          </div> */}

          <div className="flex gap-2">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </span>
              ) : (
                "Add Child"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={cancelForm}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddChildForm;
