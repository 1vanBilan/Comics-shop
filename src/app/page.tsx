"use client";
import React, { useEffect } from "react";
import NextLink from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingIcon, usePaginationComponent } from "@/components";

export default function Home() {
  const publicKey = "6d64d1eac4b584cc288684fb474d4218";
  const privateKey = "5e97a7a01eeedec799448a823183b212cb037a7c";

  const {
    data: comics,
    isLoading,
    isRefetching,
    isSuccess,
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
    <main className="container mx-auto">
      <div className="max-w-5xl my-10 mx-auto bg-white rounded-md pb-4">
        <div className="w-full h-16 flex items-center justify-center bg-red text-white rounded-t-md text-xl">
          MARVEL Comics
        </div>
        {isLoading || isRefetching ? (
          <div className="flex justify-center py-20">
            <LoadingIcon width={60} height={60} />
          </div>
        ) : (
          isSuccess && (
            <>
              <div className="grid grid-cols-4 gap-y-8 m-4">
                {comics?.results.map((comic: any, index: number) => (
                  <div key={index} className="flex justify-center">
                    <NextLink href={`/comics?id=${comic.id}`}>
                      <div className="bg-gray-200 rounded-md p-5 h-full">
                        <div className="flex justify-start h-full flex-col ">
                          <div
                            style={{
                              backgroundImage:
                                comic.thumbnail.path ===
                                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                                  ? `url(/placeholder.jpg)`
                                  : `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              width: "180px",
                              height: "270px",
                            }}
                          />
                          <span className="font-semibold text-center mt-3 max-w-44">
                            {comic.title.length > 35
                              ? `${comic.title.slice(0, 35)}...`
                              : comic.title}
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
            </>
          )
        )}
      </div>
    </main>
  );
}
