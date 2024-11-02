"use client";
import React, { useEffect } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { usePaginationComponent } from "@/components";

export default function Home() {
  const publicKey = "6d64d1eac4b584cc288684fb474d4218";
  const privateKey = "5e97a7a01eeedec799448a823183b212cb037a7c";

  const {
    data: comics,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getComics"],
    queryFn: async () => {
      return (
        await axios.get("http://gateway.marvel.com/v1/public/comics", {
          params: {
            apikey: publicKey,
            limit: 16,
            offset: (currentPage || 1) * 16 - 16,
          },
        })
      ).data.data;
    },
    refetchOnWindowFocus: false,
  });

  const { totalPages, PaginationComponent, currentPage } =
    usePaginationComponent({
      total: comics?.total,
      resultsPerPage: 16,
    });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl my-10 mx-auto bg-white p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-y-8">
          {comics?.results.map((comic: any, index: number) => (
            <div key={index} className="flex justify-center">
              <NextLink href={`/comics?id=${comic.id}`}>
                <div className="bg-gray-200 rounded-md p-5">
                  <div className="flex justify-between h-full flex-col">
                    <NextImage
                      alt="comic"
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      width={180}
                      height={270}
                    />
                    <span className="font-semibold text-center mt-3 max-w-44">
                      {comic.title}
                    </span>
                  </div>
                </div>
              </NextLink>
            </div>
          ))}
        </div>
        <div className="mt-10 mb-3">
          <PaginationComponent />
        </div>
      </div>
    </main>
  );
}
