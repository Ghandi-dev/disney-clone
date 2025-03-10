import environment from "@/config/environment";
import { Genres } from "@/typing";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

async function GenreDropdown() {
  const url = `${environment.API_URL}genre/movie/list?language=en`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };
  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex items-center justify-center">
        Genre
        <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.genres.map((genre) => (
          <DropdownMenuItem key={genre.id}>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>{genre.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
