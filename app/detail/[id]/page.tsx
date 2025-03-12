import CarouselBanner from "@/components/CarouselBanner";
import YoutubePlayer from "@/components/YoutubePlayer";
import { getMovieById, getVideoTrailer } from "@/lib/getMovies";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const movie = await getMovieById(id);
  const videoTrailer = await getVideoTrailer(movie.id);

  return (
    <div>
      <CarouselBanner movies={[movie]} isShowingDetails={false} />
      <div className="flex space-y-2 xl:-mt-68">
        <div className="z-50 max-w-2xl space-y-2">
          <h1 className="text-xl lg:text-5xl font-bold px-4 ">{`${movie.title} (${movie.release_date.split("-")[0]})`}</h1>{" "}
          <div className="flex items-center px-4 gap-4">
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            <YoutubePlayer videoKey={videoTrailer} />
          </div>
          <p className="px-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
