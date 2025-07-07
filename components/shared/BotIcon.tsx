"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface BotIconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
  onClick?: () => void;
  loading?: "lazy" | "eager";
}

const BotIcon = ({
  className,
  size = 24,
  width,
  height,
  alt = "AI Bot Assistant",
  priority = false,
  fallback,
  onClick,
  loading = "lazy",
  ...props
}: BotIconProps) => {
  const [imageError, setImageError] = React.useState(false);

  // Use size for both width and height if individual dimensions aren't provided
  const imageWidth = width || size;
  const imageHeight = height || size;

  // Fallback component when image fails to load
  const DefaultFallback = () => (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold rounded-lg",
        className
      )}
      style={{ width: imageWidth, height: imageHeight }}
    >
      🤖
    </div>
  );

  if (imageError) {
    return fallback || <DefaultFallback />;
  }

  return (
    <div
      className={cn("relative inline-block", onClick && "cursor-pointer")}
      onClick={onClick}
      {...props}
    >
      <Image
        src="/custom_bot.png"
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className={cn("object-contain", className)}
        priority={priority}
        loading={loading}
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
    </div>
  );
};

export default BotIcon;
