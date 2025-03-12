"use client";

import { Movie } from "@/typing";
import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

function MoviesCarousel({ title, movies, isVertical }: Props) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDragScroll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const onMouseMove = (event: MouseEvent) => {
      const x = event.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Sesuaikan kecepatan scroll
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="z-50">
      <h2 className="text-xl font-bold px-10 py-2">{title}</h2>
      <div
        ref={scrollRef}
        onMouseDown={handleDragScroll}
        className={cn(
          "flex overflow-x-scroll space-x-4 px-5 lg:px-10 py-5 scrollbar-hide overflow-y-hidden cursor-grab active:cursor-grabbing",
          isVertical && "flex-col space-x-0 space-y-12"
        )}
      >
        {isVertical
          ? movies.map((movie) => (
              <div key={movie.id} className="flex space-y-5 space-x-5" onClick={() => router.push(`/detail/${movie.id}`)}>
                <MovieCard movie={movie} />
                <div className="max-w-2xl">
                  <p className="font-bold">
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </p>
                  <hr className="mb-3" />
                  <p className="line-clamp-3 lg:line-clamp-none">{movie.overview}</p>
                </div>
              </div>
            ))
          : movies.map((movie) => <MovieCard movie={movie} key={movie.id} onClick={() => router.push(`/detail/${movie.id}`)} />)}
      </div>
    </div>
  );
}

export default MoviesCarousel;
