"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NextImage from "next/image";
import dayjs from "dayjs";
import { LoadingIcon } from "@/components";
import { ChevronIcon } from "@/components/ChevronIcon/ChevronIcon";

const getComicReleaseDate = (dates: { type: string; date: Date }[]) => {
  const onSaleDate = dates.find((date) => date.type === "onsaleDate")?.date;
  if (!!onSaleDate) {
    return onSaleDate;
  }
  return dates[0].date;
};

export default function Comics() {
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const comicId = searchParams.get("id");
  const publicKey = "6d64d1eac4b584cc288684fb474d4218";
  const privateKey = "5e97a7a01eeedec799448a823183b212cb037a7c";

  const {
    data: comic,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getComic", comicId],
    queryFn: async () => {
      return (
        await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics/${comicId}`,
          {
            params: {
              apikey: publicKey,
            },
          }
        )
      ).data.data.results[0];
    },
    refetchOnWindowFocus: false,
  });

  const { data: characters } = useQuery({
    queryKey: ["getCharacters", comicId],
    queryFn: async () => {
      return (
        await axios.get(
          `http://gateway.marvel.com/v1/public/comics/${comicId}/characters`,
          {
            params: {
              apikey: publicKey,
            },
          }
        )
      ).data.data.results;
    },
    refetchOnWindowFocus: false,
  });

  console.log({ comic, characters });

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl my-10 mx-auto bg-white rounded-md">
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingIcon width={60} height={60} />
          </div>
        )}
        {isSuccess && !!comic && (
          <>
            <div className="w-full h-16 flex items-center justify-center bg-red text-white rounded-t-md text-xl">
              {comic.title}
            </div>
            <button
              className="text-red mt-2 pl-4 font-semibold flex items-center gap-1"
              onClick={() => back()}
            >
              <ChevronIcon
                rotate={180}
                color="#81001a"
                width={13}
                height={13}
              />
              Go Back
            </button>
            <div className="flex gap-8 p-4 pt-2">
              <div className="min-w-[300px]">
                <NextImage
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="comic image"
                  width={300}
                  height={300}
                />
              </div>
              <div>
                {!!comic.textObjects[0]?.text && (
                  <div
                    className="text-base font-medium mb-5"
                    dangerouslySetInnerHTML={{
                      __html: comic.textObjects[0].text,
                    }}
                  />
                )}
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">Release Date:</p>
                  <p className="text-lg">
                    {!!comic.dates.length &&
                    dayjs(getComicReleaseDate(comic.dates)).isValid()
                      ? dayjs(getComicReleaseDate(comic.dates)).format(
                          "DD MMMM, YYYY"
                        )
                      : "No release date available"}
                  </p>
                  {!!characters && !!characters.length && (
                    <>
                      <p className="font-semibold text-lg mt-3">
                        Related Characters
                      </p>
                      <div className="grid grid-cols-3">
                        {characters.map((character: any) => {
                          return (
                            <div
                              key={character.id}
                              className="flex flex-col items-center justify-center"
                            >
                              <NextImage
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                width={100}
                                height={100}
                              />
                              <p className="text-center">{character.name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
