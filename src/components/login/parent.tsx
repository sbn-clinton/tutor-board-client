import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

const parent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, you would send the login data to your backend
    // Example: axios.post('/api/auth/login', { email, password, role })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "Login Successful",
        description: `You have been logged in as a ${role}.`,
      });

      // Redirect based on role
      if (role === "parent") {
        router.push("/profile/parent");
      } else {
        router.push("/profile/tutor");
      }
    }, 1500);
  };
  return (
    <TabsContent value="parent">
      <form onSubmit={(e) => handleLogin(e, "parent")} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="parent-password">Password</Label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-gray-500 underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="parent-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login as Parent"}
        </Button>
      </form>
    </TabsContent>
  );
};

export default parent;
