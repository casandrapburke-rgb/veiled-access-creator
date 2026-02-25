import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Apply = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [ageError, setAgeError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const age = parseInt(formData.get("age") as string);

    if (isNaN(age) || age < 18) {
      setAgeError("You must be at least 18 years of age.");
      return;
    }
    setAgeError("");

    // For now, show success (will wire to DB later)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/images/sigil.png" alt="Sigil" className="w-16 h-16 mx-auto sigil-glow mb-8" />
          <h2 className="font-serif text-2xl md:text-3xl gold-gradient-text font-bold">
            Your request has been recorded.
          </h2>
          <p className="mt-4 text-foreground/70 font-body text-lg">
            If approved, you will receive a private Access Code.
          </p>
          <Link to="/">
            <Button variant="heroOutline" className="mt-8">
              Return
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "bg-secondary border-border text-foreground placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className="text-primary/60 text-sm tracking-widest uppercase hover:text-primary transition-colors">
            ← Return
          </Link>

          <h1 className="mt-8 font-serif text-3xl md:text-5xl font-bold gold-gradient-text">
            Request Entry
          </h1>
          <p className="mt-4 text-foreground/60 font-body text-lg">
            Entry is by referral. Every request is reviewed in silence.
          </p>

          <div className="mt-4 w-16 h-[1px] bg-primary/40" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-12 space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Personal Details */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Personal Details</legend>
            <div className="h-[1px] bg-border/40 mb-4" />

            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" name="fullName" required className={inputClasses} placeholder="Enter your full name" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender">
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="age">Age *</Label>
                <Input id="age" name="age" type="number" required min={18} className={inputClasses} placeholder="18+" />
                {ageError && <p className="text-destructive text-sm mt-1">{ageError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" className={inputClasses} placeholder="Country" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" className={inputClasses} placeholder="State" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" className={inputClasses} placeholder="City" />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Full Residential Address</Label>
              <Textarea id="address" name="address" className={inputClasses} placeholder="Your full address" />
            </div>
          </fieldset>

          {/* Professional Details */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Professional Details</legend>
            <div className="h-[1px] bg-border/40 mb-4" />

            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" name="occupation" className={inputClasses} placeholder="Your occupation" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="income">Monthly Income (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="income" name="income" type="number" className={`${inputClasses} pl-7`} placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select name="maritalStatus">
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>

          {/* Family Reference */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Family Reference</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div>
              <Label htmlFor="parentName">Father or Mother's Name</Label>
              <Input id="parentName" name="parentName" className={inputClasses} placeholder="Parent's full name" />
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Contact Information</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" className={inputClasses} placeholder="+1 (000) 000-0000" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" className={inputClasses} placeholder="your@email.com" />
              </div>
            </div>
          </fieldset>

          {/* Purpose */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Purpose of Entry</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <RadioGroup name="purpose" defaultValue="spiritual" className="space-y-3">
              {[
                { value: "spiritual", label: "Spiritual Insight" },
                { value: "fame", label: "Fame & Influence" },
                { value: "loan", label: "Loan" },
                { value: "financial", label: "Financial Support" },
              ].map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <RadioGroupItem value={item.value} id={item.value} />
                  <Label htmlFor={item.value} className="cursor-pointer">{item.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          {/* Agent ID */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Referral Verification</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div>
              <Label htmlFor="agentId">Agent ID Number *</Label>
              <Input id="agentId" name="agentId" required className={inputClasses} placeholder="Enter your Agent ID" />
              <div className="mt-2 p-3 border border-destructive/30 rounded bg-destructive/5">
                <p className="text-destructive text-sm font-body">
                  Applications without a valid Agent ID will not be reviewed.
                  <br />
                  Incorrect Agent IDs result in automatic denial.
                </p>
              </div>
            </div>
          </fieldset>

          <Button variant="hero" size="lg" type="submit" className="w-full">
            Submit for Silent Review
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Apply;
