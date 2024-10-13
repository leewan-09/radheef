import Search from "@/components/search";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Result from "./_components/result";
import { type Metadata } from "next";
import Image from 'next/image';

interface Props {
  params: {
    param: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const word = decodeURIComponent(params.param);

  try {
    const wordData = await api.word.get(word);

    if (!wordData) {
      return {
        title: `${word} - ރަދީފް`,
        description: `Definition for "${word}" not found in the Dhivehi dictionary.`,
      };
    }

    const description = wordData.meaning.meaning
      ? wordData.meaning.meaning.substring(0, 160) +
        (wordData.meaning.meaning.length > 160 ? "..." : "")
      : `Explore the definition and usage of "${word}" in the Dhivehi language.`;

    return {
      title: `${word} - ރަދީފް`,
      description,
      openGraph: {
        title: `${word} - ރަދީފް (Dhivehi Dictionary)`,
        description,
      },
      twitter: {
        card: "summary",
        title: `${word} - ރަދީފް (Dhivehi Dictionary)`,
        description,
      },
    };
  } catch (error) {
    console.error("Error fetching word data:", error);
    return {
      title: "ރަދީފް - Dhivehi Dictionary",
      description:
        "Explore the Dhivehi language with our comprehensive online dictionary.",
    };
  }
}

export default async function WordPage({ params }: Props) {
  const word = decodeURIComponent(params.param);

  const wordData = await api.word.get(word);

  if (!wordData) {
    return notFound();
  }

  return (
    <main className="relative z-0 h-dvh w-full bg-white">
      <div
        className="absolute top-0 -z-10 h-40 w-full sm:h-52"/>
      <div className="mx-auto flex max-w-screen-lg flex-col px-5 lg:px-0">

      <div className="mt-8 flex justify-center md:justify-end">
          <Image src='/Logo.svg' alt='Radheef Logo' width={115} height={115}/>
      </div>

        <Search />
        <Result data={wordData} />
      </div>
    </main>
  );
}
