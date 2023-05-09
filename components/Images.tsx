"use client";

import React from "react";
import Image from "next/image";
import useSWR, { useSWRConfig } from "swr";
import fetchImages from "@/lib/fetchImages";

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

  return <div>Images</div>;
}

export default Images;
