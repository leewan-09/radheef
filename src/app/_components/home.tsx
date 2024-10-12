"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, mutate } = api.word.search.useMutation();

  useEffect(() => {
    void mutate(search);
  }, [mutate, search]);

  return (
    <div className="mt-10">
      <div className="">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            dir="rtl"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="dhivehi-font bg-white py-5 pr-8 text-base shadow-none placeholder:pr-1"
            placeholder="ހޯދާ"
          />
        </div>
      </div>
      {search.trim().length > 0 && (
        <div className="mt-5 rounded-lg bg-white p-5 drop-shadow">
          {data?.length === 0 && (
            <div
              dir="rtl"
              className="dhivehi-font text-center text-sm text-muted-foreground"
            >
              އެއްވެސް ނަތީޖާއެއް ނުފެން
            </div>
          )}
          {data?.map((word) => (
            <div
              key={word.id}
              onClick={() => {
                router.push(`/word/${word.word}`);
              }}
              className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100"
            >
              <div className="text-sm text-muted-foreground">
                {word.en_word}
              </div>
              <div className="dhivehi-font text-base">{word.word}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
