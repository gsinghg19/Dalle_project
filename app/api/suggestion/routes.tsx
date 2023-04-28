export async function GET(request: Request) {
  const response = await fetch("...", {
    //needs to connect to microsoft azure function here.
    cache: "no-store",
  });
  const textData = await response.text();
  return (
    new Response(JSON.stringify(textData.trim())),
    {
      status: 200,
    }
  );
}
