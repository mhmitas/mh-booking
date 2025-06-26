"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { ExperienceFormValues, ExperienceSchema } from "@/lib/constants";
import {
  createExperience,
  getCategoriesAndTypes,
} from "@/lib/actions/dynamic.actions";
import { toast } from "sonner";

type CategoryType = { _id: string; name: string };
type FormData = { categories: CategoryType[]; types: CategoryType[] };

export function ExperienceForm() {
  const [formData, setFormData] = useState<FormData>({
    categories: [],
    types: [],
  });
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      images: [],
      info: "",
      category: "",
      type: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoriesAndTypes();
      setFormData(data);
    };
    fetchData();
  }, []);

  const onSubmit = async (values: ExperienceFormValues) => {
    try {
      setLoading(true);
      const result = await createExperience(values);
      if (result.success) {
        form.reset();
        // Optionally show success toast/notification
        toast.success("Experience created successfully");
        console.log("Experience created successfully");
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create experience");
    }
  };

  useEffect(() => {
    setSlug(() => generateSlug(slug));
  }, [slug]);

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formData.types.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formData.categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug Field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="unique-identifier" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input
            placeholder="Generate Slug by title"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Experience title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description"
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images Field */}
          <div>
            <FormLabel>Image URLs</FormLabel>
            {form.watch("images")?.map((_, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  placeholder={`https://example.com/image${index + 1}.jpg`}
                  {...form.register(`images.${index}` as const)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const current = form.getValues("images") || [];
                    current.splice(index, 1);
                    form.setValue("images", current);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => {
                const current = form.getValues("images") || [];
                form.setValue("images", [...current, ""]);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Image URL
            </Button>
          </div>

          {/* Info Field */}
          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Comprehensive guide/article"
                    {...field}
                    className="min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Experience"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function generateSlug(text: string) {
  return text
    .toString() // Convert to string
    .normalize("NFKD") // Normalize unicode
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Collapse multiple -
}
