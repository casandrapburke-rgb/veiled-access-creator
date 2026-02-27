import { useState, useRef } from "react";
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
import { Upload, X, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Apply = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const age = parseInt(formData.get("age") as string);

    if (isNaN(age) || age < 18) {
      setAgeError("You must be at least 18 years of age.");
      return;
    }
    setAgeError("");
    setSubmitting(true);

    // Upload photo if exists
    let photo_url: string | null = null;
    if (photo) {
      const ext = photo.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const { data: uploadData } = await supabase.storage
        .from("application-photos")
        .upload(fileName, photo);
      if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("application-photos")
          .getPublicUrl(fileName);
        photo_url = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from("applications").insert({
      full_name: formData.get("fullName") as string,
      gender: formData.get("gender") as string || null,
      age,
      country: formData.get("country") as string || null,
      state: formData.get("state") as string || null,
      city: formData.get("city") as string || null,
      address: formData.get("address") as string || null,
      occupation: formData.get("occupation") as string || null,
      income: formData.get("income") ? parseFloat(formData.get("income") as string) : null,
      marital_status: formData.get("maritalStatus") as string || null,
      parent_name: formData.get("parentName") as string || null,
      phone: formData.get("phone") as string || null,
      email: formData.get("email") as string || null,
      purpose: formData.get("purpose") as string || "spiritual",
      agent_id: formData.get("agentId") as string,
      photo_url,
    });

    if (error) {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/images/sigil.png" alt="Illumi Echelon" className="w-16 h-16 mx-auto sigil-glow mb-8" />
          <h2 className="font-serif text-2xl md:text-3xl gold-gradient-text font-bold">
            Your request has been recorded.
          </h2>
          <p className="mt-4 text-foreground/70 font-body text-lg">
            If approved, you will receive a private Access Code.
          </p>
          <Link to="/">
            <Button variant="heroOutline" className="mt-8">Return</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "bg-secondary border-border text-foreground placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/" className="text-primary/60 text-sm tracking-widest uppercase hover:text-primary transition-colors">
            ← Return
          </Link>

          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <img src="/images/sigil.png" alt="" className="w-8 h-8 opacity-50" />
            <span className="text-primary/50 text-xs tracking-[0.3em] uppercase font-body">Illumi Echelon</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-gradient-text">
            Request Entry
          </h1>
          <p className="mt-4 text-foreground/60 font-body text-base sm:text-lg">
            Entry is by referral. Every request is reviewed in silence.
          </p>

          <div className="mt-4 w-16 h-[1px] bg-primary/40" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 sm:mt-12 space-y-8 sm:space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Photo Upload */}
          <fieldset className="space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Your Photograph</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div className="flex flex-col items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-primary/30"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-border hover:border-primary/50 bg-secondary/50 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer group"
                >
                  <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors tracking-wider uppercase">Upload</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground font-body">Recent photograph required. Max 5MB.</p>
            </div>
          </fieldset>

          {/* Personal Details */}
          <fieldset className="space-y-4 sm:space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Personal Details</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" name="fullName" required className={inputClasses} placeholder="Enter your full name" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select name="gender">
                  <SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
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
          <fieldset className="space-y-4 sm:space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Professional Details</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" name="occupation" className={inputClasses} placeholder="Your occupation" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                  <SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger>
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
          <fieldset className="space-y-4 sm:space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Family Reference</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div>
              <Label htmlFor="parentName">Father or Mother's Name</Label>
              <Input id="parentName" name="parentName" className={inputClasses} placeholder="Parent's full name" />
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="space-y-4 sm:space-y-5">
            <legend className="font-serif text-xl text-primary tracking-wide">Contact Information</legend>
            <div className="h-[1px] bg-border/40 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
          <fieldset className="space-y-4 sm:space-y-5">
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
          <fieldset className="space-y-4 sm:space-y-5">
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

          <Button variant="hero" size="lg" type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Silent Review"}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Apply;
