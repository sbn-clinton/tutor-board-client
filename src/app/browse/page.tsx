"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import TutorCard from "@/components/tutors/tutor-card";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/animations/page-transition";
import { Tutor } from "@/types/tutor";
import axios from "axios";
import Loading from "./loading";

export default function BrowseTutors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [subject, setSubject] = useState("all");
  const [location, setLocation] = useState("all");
  const [select, setSelect] = useState("all");
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor/all`,
          {
            withCredentials: true,
          }
        );
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false); // 👈 Set loading to false after fetch
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      tutor?.bio?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      subject === "all" || tutor.subjects.includes(subject);
    const matchesLocation =
      location === "all" || tutor?.location?.includes(location);

    return matchesSearch && matchesSubject && matchesLocation;
  });

  const uniqueSubjects = Array.from(
    new Set(tutors.flatMap((tutor) => tutor.subjects))
  );
  const uniqueLocations = Array.from(
    new Set(tutors.map((tutor) => tutor.location))
  );

  return (
    <PageTransition>
      <div className="container px-4 py-10 md:px-6">
        <h1 className="mb-6 text-3xl font-bold">Browse Tutors</h1>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name, subject, or keyword..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {uniqueSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location as string}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                  <SheetDescription>
                    Refine your tutor search with additional filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Price Range ($/hour)</Label>
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Rating</SelectItem>
                        <SelectItem value="4.5">4.5 & Above</SelectItem>
                        <SelectItem value="4.0">4.0 & Above</SelectItem>
                        <SelectItem value="3.5">3.5 & Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Any Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Time</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {loading && <Loading />}

        {/* Results Count */}
        {!loading && (
          <p className="mb-6 text-gray-500">
            Showing {filteredTutors.length}{" "}
            {filteredTutors.length === 1 ? "tutor" : "tutors"}
          </p>
        )}

        {/* Tutors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            filteredTutors.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TutorCard tutor={tutor} />
              </motion.div>
            ))}
        </div>

        {/* No Results */}
        {!loading && filteredTutors.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-lg text-gray-500">
              No tutors found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSubject("all");
                setLocation("all");
                setPriceRange([0, 100]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
