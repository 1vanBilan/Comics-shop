"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NextImage from "next/image";
import NextLink from "next/link";
import dayjs from "dayjs";
import { LoadingIcon } from "@/components";
import { ChevronIcon } from "@/components/ChevronIcon/ChevronIcon";

// const getComicReleaseDate = (dates: { type: string; date: Date }[]) => {
//   const onSaleDate = dates.find((date) => date.type === "onsaleDate")?.date;
//   if (!!onSaleDate) {
//     return onSaleDate;
//   }
//   return dates[0].date;
// };

export default function Character({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const publicKey = "6d64d1eac4b584cc288684fb474d4218";
  const privateKey = "5e97a7a01eeedec799448a823183b212cb037a7c";

  const {
    data: character,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getCharacter", params.id],
    queryFn: async () => {
      return (
        await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${params.id}`,
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

  const {
    data: characterComics,
    isLoading: isLoadingComics,
    isSuccess: isSuccessComisc,
  } = useQuery({
    queryKey: ["getCharacterComics", params.id],
    queryFn: async () => {
      return (
        await axios.get(
          `http://gateway.marvel.com/v1/public/characters/${params.id}/comics`,
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

  console.log(characterComics);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl my-10 mx-auto bg-white rounded-md">
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingIcon width={60} height={60} />
          </div>
        )}
        {isSuccess && !!character && (
          <>
            <div className="w-full h-16 flex items-center justify-center bg-red text-white rounded-t-md text-xl">
              {character.name}
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
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt="character image"
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-full">
                {!!character.description && (
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">Description</div>
                    <div className="text-lg font-medium mb-5">
                      {character.description}
                    </div>
                  </div>
                )}
                {!!characterComics && !!characterComics.length && (
                  <div className="flex flex-col min-w-full">
                    <div className="flex-lg font-semibold mb-3">
                      This character appears in the following comics:
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {characterComics.map((comic: any) => {
                        return (
                          <div
                            className="flex flex-col items-center justify-start"
                            key={comic.id}
                          >
                            <NextLink href={`/comics?id=${comic.id}`}>
                              <div className="flex flex-col items-center justify-center gap-2">
                                <NextImage
                                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                  alt={comic.name}
                                  width={100}
                                  height={100}
                                />
                                <p className="text-center text-xs font-semibold">
                                  {comic.title}
                                </p>
                              </div>
                            </NextLink>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
