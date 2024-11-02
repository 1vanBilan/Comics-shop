"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

export default function Comics() {
  const searchParams = useSearchParams();
  const comicId = searchParams.get("id");
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdmNmM0MWQ2YTUyMGEzM2E4ZjI4YWRiODc1M2EyZSIsIm5iZiI6MTcyMTg0MzQ3Mi45NDY0NDgsInN1YiI6IjY2YTEzZDE4ZjdhMTE0YTA4M2UwZDkwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EZF0OpLX9NNO0nIfX7HrGhxeKIi9VjQ4JgJbg5V_i_Q",
    },
  };

  const {
    data: comics,
    isLoading,
    refetch,
  } = useQuery(["getFilms"], async () => {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
  });

  return (
    <div>
      <h1>Comics</h1>
    </div>
  );
}
