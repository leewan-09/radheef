import { type AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

interface Props {
  data: RouterOutput["word"]["get"];
}

export default function Result({ data }: Props) {
  if (!data) {
    return null;
  }

  return (
    <article
      dir="rtl"
      className="mt-14 flex flex-col rounded-lg border bg-white p-5 drop-shadow-sm sm:mt-28"
    >
      <header className="flex flex-col gap-2">
        <h1 className="dhivehi-font text-2xl font-bold sm:text-3xl">
          {data.word}{" "}
          {data.transliteration && (
            <span className="text-sm text-muted-foreground">
              ({data.transliteration})
            </span>
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          <span className="sr-only">English translation: </span>
          {data.en_word}
        </p>
      </header>

      <section className="mt-2 flex flex-col gap-1">
        <h2 className="dhivehi-font font-bold text-muted-foreground">މާނަ :</h2>
        <p className="dhivehi-font leading-7 tracking-wider">
          {data.meaning.meaning}
        </p>
        {data.meaning.en_meaning && (
          <>
            <hr className="my-2 border-b border-gray-200" />
            <h2 className="font-bold text-muted-foreground">Meaning</h2>
            <p>{data.meaning.en_meaning}</p>
          </>
        )}
      </section>
    </article>
  );
}
