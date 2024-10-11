import { db } from "@/server/db";

async function search(query: string) {
  return await db.word.findMany({
    where: {
      OR: [
        { letter: { letter: { contains: query, mode: "insensitive" } } },
        { word: { contains: query, mode: "insensitive" } },
        { en_word: { contains: query, mode: "insensitive" } },
        { transliteration: { contains: query, mode: "insensitive" } },
        { meaning: { meaning: { contains: query, mode: "insensitive" } } },
        { meaning: { en_meaning: { contains: query, mode: "insensitive" } } },
      ],
    },
    include: {
      letter: true,
      meaning: true,
    },
    take: 5,
  });
}

const wordService = {
  search,
};

export default wordService;
