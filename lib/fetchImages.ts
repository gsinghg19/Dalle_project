const fetchImages = () =>
  fetch("/api/getImages", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchImages;

// const fetchImages = () =>
//   fetch("http://localhost:7071/api/getImages", {
//     cache: "no-store",
//   }).then((res) => res.json());

// export default fetchImages;
