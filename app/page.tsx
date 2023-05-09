import Images from "@/components/Images";
import Error from "@/components/Error";

export default function Home() {
  return (
    <Error statusCode={404 || 500}>
      <main className="mx-0">
        <Images />
      </main>
    </Error>
  );
}
