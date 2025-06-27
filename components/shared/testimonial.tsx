import { Quote } from "lucide-react";

interface TestimonialProps {
  name: string;
  service: string;
  content: string;
  avatar?: string;
}

export default function Testimonial({
  name,
  service,
  content,
  avatar,
}: TestimonialProps) {
  return (
    <div className="group relative">
      <div className="relative">
        {/* Quote Icon */}
        <div className="mb-6 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
          <Quote className="h-8 w-8 text-foreground" />
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 font-light italic">
          "{content}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-sm font-semibold text-primary">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {service} Experience
            </p>
          </div>
        </div>

        {/* Subtle accent line */}
        <div className="absolute left-0 top-0 w-1 h-16 bg-gradient-to-b from-primary/40 to-transparent transition-all duration-300 group-hover:h-20 group-hover:from-primary/60" />
      </div>
    </div>
  );
}
