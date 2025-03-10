import environment from "@/config/environment";
import { SearchResult } from "@/typing";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
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
  const data = (await response.json()) as SearchResult;

  return data;
}

export async function getUpcomingMovies() {
  const url = new URL(`${environment.API_URL}movie/upcoming`);
  const data = await fetchFromTMDB(url, 60 * 60 * 24);
  return data.results;
}

export async function getPopularMovies() {
  const url = new URL(`${environment.API_URL}movie/popular`);
  const data = await fetchFromTMDB(url, 60 * 60 * 24);
  return data.results;
}
export async function getTopRatedMovies() {
  const url = new URL(`${environment.API_URL}movie/top_rated`);
  const data = await fetchFromTMDB(url, 60 * 60 * 24);
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
  const data = await fetchFromTMDB(url, 60 * 60 * 24);
  return data.results;
}
export async function getSearchMovies(term: string) {
  const url = new URL(`${environment.API_URL}search/movie`);
  url.searchParams.set("query", term);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  const data = await fetchFromTMDB(url, 60 * 60 * 24);
  return data.results;
}
