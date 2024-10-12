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
    <div
      dir="rtl"
      className="mt-14 flex flex-col rounded-lg border bg-white p-5 drop-shadow-sm sm:mt-28"
    >
      <div className="flex flex-col gap-2">
        <div className="dhivehi-font text-2xl font-bold sm:text-3xl">
          {data.word}
        </div>
        <div className="text-sm text-muted-foreground">{data.en_word}</div>

        <div className="mt-2 flex flex-col gap-1">
          <div className="dhivehi-font font-bold text-muted-foreground">
            މާނަ :
          </div>
          <div className="dhivehi-font leading-7 tracking-wider">
            {data.meaning.meaning}
          </div>
          {data.meaning.en_meaning && (
            <>
              <div className="my-2 border-b border-gray-200"></div>
              <div className="font-bold text-muted-foreground">Meaning</div>
              <div>{data.meaning.en_meaning}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
