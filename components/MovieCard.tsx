import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typing";
import Image from "next/image";

function MovieCard({ movie, onClick }: { movie: Movie; onClick?: () => void }) {
  return (
    <div className="relative flex-shrink-0 cursor-pinter transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29] z-10" />
      <p className="absolute z-20 bottom-5 left-5">{movie.title}</p>
      <Image
        className="w-full lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
        src={getImagePath(movie.poster_path || movie.poster_path, true)}
        alt={movie.title}
        width={500}
        height={300}
      />
    </div>
  );
}

export default MovieCard;
