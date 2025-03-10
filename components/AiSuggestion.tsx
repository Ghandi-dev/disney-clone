"use client";

import { getAiSuggestions } from "@/lib/gemini";
import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async (term: string) => {
  if (!term) return "";
  return await getAiSuggestions(term);
};

function AiSuggestion({ searchTerm }: { searchTerm: string }) {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["suggestions", searchTerm],
    queryFn: () => fetchSuggestions(searchTerm),
    enabled: !!searchTerm,
  });

  const generateText = () => {
    if (isLoading || isRefetching) {
      return (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">Ai Assistant is thinking...</p>
        </>
      );
    }
    if (error) return <>Error...</>;
    if (!data) return <>No data</>;
    return (
      <>
        <div className="animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-white" />
        <div>
          <p className="text-sm text-gray-400">AI (Gemini) Assistant Suggests:{""}</p>
          <p className="italic text-xl">{`"${data}"`}</p>
        </div>
      </>
    );
  };

  return <div className="flex space-x-5 items-center px-10">{generateText()}</div>;
}

export default AiSuggestion;
