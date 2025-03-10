import AiSuggestion from "@/components/AiSuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    genre: string;
  }>;
};

async function GenrePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { genre } = await searchParams;

  const movies = await getDiscoverMovies(id, genre);

  return (
    <div className="max-w-7xl mx-auto">
      {/* AI suggestions */}
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-5xl font-bold px-10">Result for: {genre}</h1>
        <AiSuggestion searchTerm={genre} />
        <MoviesCarousel movies={movies} title={genre} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
