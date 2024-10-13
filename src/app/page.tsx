import Search from "@/components/search";
import Image from 'next/image';

export default async function HomePage() {
  return (
    <main className="relative z-0 h-dvh w-full bg-white">
      <div className="absolute top-0 -z-10 h-40 w-full sm:h-52"/>
      <div className="mx-auto flex max-w-screen-lg flex-col px-5 lg:px-0">
        <div className="mt-8 flex justify-center md:justify-end">
          <Image src='/Logo.svg' alt='Radheef Logo' width={110} height={110}/>
        </div>
        <Search />
      </div>
    </main>
  );
}