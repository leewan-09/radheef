import { db } from "@/server/db";

async function search(query: string) {
  const normalizedQuery = query.normalize("NFC");
  return await db.word.findMany({
    where: {
      OR: [
        { letter: { letter: { equals: normalizedQuery } } },
        { word: { startsWith: normalizedQuery } },
        { word: { endsWith: normalizedQuery } },
        { word: { contains: normalizedQuery } },
      ],
    },
    take: 5,
    orderBy: {
      word: "asc",
    },
  });
}

async function get(word: string) {
  return await db.word.findUnique({
    where: { word },
    include: {
      letter: true,
      meaning: true,
    },
  });
}

const wordService = {
  search,
  get,
};

export default wordService;
