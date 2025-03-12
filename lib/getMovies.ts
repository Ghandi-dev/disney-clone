import environment from "@/config/environment";
import { Movie, SearchResult, Video } from "@/typing";

async function fetchFromTMDB<T>(url: URL, cacheTime?: number): Promise<T> {
  url.searchParams.set("language", "en-US");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("page", "1");
  url.searchParams.set("sort_by", "popularity.desc");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data: T = await response.json();

  return data;
}

export async function getUpcomingMovies() {
  const url = new URL(`${environment.API_URL}movie/upcoming`);
  const data = await fetchFromTMDB<SearchResult>(url, 60 * 60 * 24);
  return data.results;
}

export async function getPopularMovies() {
  const url = new URL(`${environment.API_URL}movie/popular`);
  const data = await fetchFromTMDB<SearchResult>(url, 60 * 60 * 24);
  return data.results;
}
export async function getTopRatedMovies() {
  const url = new URL(`${environment.API_URL}movie/top_rated`);
  const data = await fetchFromTMDB<SearchResult>(url, 60 * 60 * 24);
  return data.results;
}
export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`${environment.API_URL}discover/movie`);
  if (id) {
    url.searchParams.set("with_genres", id);
  }
  if (keywords) {
    url.searchParams.set("query", keywords);
  }
  const data = await fetchFromTMDB<SearchResult>(url, 60 * 60 * 24);
  return data.results;
}
export async function getSearchMovies(term: string) {
  const url = new URL(`${environment.API_URL}search/movie`);
  url.searchParams.set("query", term);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  const data = await fetchFromTMDB<SearchResult>(url, 60 * 60 * 24);
  return data.results;
}

export async function getMovieById(id: string) {
  const url = new URL(`${environment.API_URL}movie/${id}?language=en-US`);
  const data = await fetchFromTMDB<Movie>(url, 60 * 60 * 24);
  return data;
}

export async function getVideoTrailer(id: number) {
  const url = new URL(`${environment.API_URL}movie/${id}/videos?language=en-US`);
  const data = await fetchFromTMDB<Video>(url, 60 * 60 * 24);
  return data.results[0]?.key;
}
