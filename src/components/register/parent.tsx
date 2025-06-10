import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import axios from "axios";

const parent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, you would send the registration data to your backend
    // Example: axios.post('/api/auth/register', { name, email, password, role })

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/parent-register`,
        {
          fullName,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
      if (response.status === 201) {
        toast({
          title: "Registration Successful",
          description: `Your ${role} account has been created successfully.`,
        });
        setFullName("");
        setEmail("");
        setPassword("");
        setRole("");
        router.push("/auth/login");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="parent">
      <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="parent-name">Full Name</Label>
          <Input
            id="parent-name"
            placeholder="John Doe"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parent-email">Email</Label>
          <Input
            id="parent-email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="parent-password">Password</Label>
          <Input
            id="parent-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="parent-terms" required />
          <label
            htmlFor="parent-terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-primary underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register as Tutor"}
        </Button>
      </form>
    </TabsContent>
  );
};

export default parent;
