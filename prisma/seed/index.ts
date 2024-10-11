import { PrismaClient } from "@prisma/client";
import Letters from "./letter.json";
import Words from "./words.json";
import Meanings from "./meanings.json";

interface Word {
  word_id: string;
  letter: string;
  word_en?: string;
  transliteration?: string;
  approved_word_dv: string;
}

interface Meaning {
  word_id: string;
  meaning_text: string;
  word_en_meaning: string;
}

async function main() {
  const words = Words as Word[];
  const meanings = Meanings as Meaning[];
  const prisma = new PrismaClient();

  for (const { letter } of Letters) {
    await prisma.letter.upsert({
      where: { letter },
      update: {},
      create: { letter },
    });
  }

  for (const word of words) {
    const wordMeanings = meanings.find((val) => val.word_id === word.word_id);
    if (!wordMeanings) {
      console.log("unable find word");
      console.log(word);
      continue;
    }

    console.log({
      word,
      wordMeanings,
    });

    const enWord = cleanWord(word.word_en);
    const enMeaning = cleanWord(wordMeanings.word_en_meaning);
    const meaning = wordMeanings.meaning_text.trim();
    await prisma.word.upsert({
      where: { word: word.approved_word_dv.trim() },
      update: {
        en_word: enWord,
        transliteration: cleanWord(word.transliteration),
        meaning: {
          update: {
            meaning,
            en_meaning: enMeaning === enWord ? null : enMeaning,
          },
        },
      },
      create: {
        word: word.approved_word_dv.trim(),
        letter: { connect: { letter: word.letter } },
        en_word: enWord,
        transliteration: cleanWord(word.transliteration),
        meaning: {
          create: {
            meaning,
            en_meaning: enMeaning === enWord ? null : enMeaning,
          },
        },
      },
    });
  }
}

function cleanWord(enWord?: string): string | null {
  if (!enWord) return null;
  const trimmed = enWord.trim();
  if (trimmed.length === 0) return null;
  if (trimmed === "none") return null;
  return trimmed;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
