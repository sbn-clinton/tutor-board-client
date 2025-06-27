import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

interface ExperienceFormProps {
  setIsAddingExperience: (isAddingExperience: boolean) => void;
}

const AddExperienceForm = ({ setIsAddingExperience }: ExperienceFormProps) => {
  const [role, setRole] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role || !schoolName || !period) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      const res = await api.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-work-experiences`,
        { role, schoolName, period, description },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Experience updated",
          description:
            "Your experience information has been updated successfully.",
        });
        setUser(res.data.user);
        setRole("");
        setSchoolName("");
        setPeriod("");
        setDescription("");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating experience",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelForm = () => {
    setRole("");
    setSchoolName("");
    setPeriod("");
    setDescription("");
    setIsAddingExperience(false);
  };

  return (
    <Card className="border-medium-green/20">
      <CardHeader>
        <CardTitle className="text-dark-green dark:text-off-white">
          Add New Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="expTitle">Job Title *</Label>
              <Input
                id="expTitle"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Mathematics Teacher"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expInstitution">Institution/Company *</Label>
              <Input
                id="expInstitution"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g., Lincoln High School"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expPeriod">Period *</Label>
            <Input
              id="expPeriod"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="e.g., 2018 - Present or Jan 2020 - Dec 2022"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expDescription">Description</Label>
            <Textarea
              id="expDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Add Experience"}
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

export default AddExperienceForm;
