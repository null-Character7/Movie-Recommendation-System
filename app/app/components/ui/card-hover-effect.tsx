import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  movies,
  className,
}: {
  movies: {
    title: string;
    releaseYear: string;
    cast:string | null;
    link: string;
    posterUrl: string; // Add posterUrl for movie image
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", // Add gap for spacing
        className
      )}
    >
      {movies.map((movie, idx) => (
        <Link
          href={movie.link}
          key={movie.link}
          className="relative group block p-2 h-full w-full" // Increased padding
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={movie.posterUrl} alt={movie.title} />
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>{"Cast : "+movie.cast} <br /> {/* Cast on the first line */}
            {"Release Year : "+movie.releaseYear}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20", // Increased padding
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide m-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm", // Adjusted margin-top for better spacing
        className
      )}
    >
      {children}
    </p>
  );
};

// New component for the card image
export const CardImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto rounded-lg mb-4" // Adjust the image styling if necessary
    />
  );
};
