"use client";

import React from "react";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const {
    data: images,
    error,
    isValidating,
    isLoading,
    mutate: refreshImages, //this recalls the fetchImages> Renamed to refreshImages to make more sense
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  if (!images) return <div>loading...</div>;

  console.log(images);

  return (
    <div>
      <div>
        {images?.imageUrls?.map((image: ImageType) => (
          <div key={image.name}>
            <Image
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow -lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
