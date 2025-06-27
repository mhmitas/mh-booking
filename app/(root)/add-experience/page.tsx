import { ExperienceForm } from "@/components/shared/experience-form";
import { Toaster } from "sonner";

export default async function NewExperiencePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Experience</h1>
      <ExperienceForm />
      <Toaster />
    </div>
  );
}
