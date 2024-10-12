import Search from "@/components/search";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Result from "./_components/result";

interface Props {
  params: {
    param: string;
  };
}

export default async function WordPage({ params }: Props) {
  const word = decodeURIComponent(params.param);

  const wordData = await api.word.get(word);

  if (!wordData) {
    return notFound();
  }

  return (
    <main className="relative z-0 h-dvh w-full bg-muted">
      <div
        className="absolute top-0 -z-10 h-40 w-full sm:h-52"
        style={{
          background:
            "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
        }}
      />
      <div className="mx-auto flex max-w-screen-lg flex-col px-5 lg:px-0">
        <div className="mt-5">
          <div className="mx-auto">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Radheef
            </h1>
          </div>
        </div>
        <Search />
        <Result data={wordData} />
      </div>
    </main>
  );
}
