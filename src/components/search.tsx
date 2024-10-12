"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, mutate } = api.word.search.useMutation();

  useEffect(() => {
    void mutate(search);
  }, [mutate, search]);

  return (
    <div className="mt-10">
      <div className="relative">
        <div className="relative">
          <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            dir="rtl"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="dhivehi-font bg-white py-5 pr-8 text-base shadow-none placeholder:pr-1"
            placeholder="ހޯދާ"
          />
          {search.trim().length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white p-5 drop-shadow">
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
                    router.push(`/word/${encodeURIComponent(word.word)}`);
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
      </div>
    </div>
  );
}
