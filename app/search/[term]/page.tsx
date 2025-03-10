import AiSuggestion from "@/components/AiSuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";
import React from "react";

export default async function SearchPage({ params }: { params: { term: string } }) {
  const { term } = await params;

  if (!term) notFound();

  const termToUse = decodeURIComponent(term);
  const movies = await getSearchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:-mt-42">
        <h1 className="text-6xl font-bold px-10 py-2">Search results for: {termToUse}</h1>
        {/* Ai suggestions */}
        <AiSuggestion searchTerm={term} />
        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}
