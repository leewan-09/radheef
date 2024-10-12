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
    include: {
      letter: true,
      meaning: true,
    },
    take: 5,
    orderBy: {
      word: "asc",
    },
  });
}

const wordService = {
  search,
};

export default wordService;
