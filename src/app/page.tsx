import Search from "@/components/search";

export default async function HomePage() {
  return (
    <main className="relative z-0 h-dvh w-full bg-muted">
      <div
        className="absolute top-0 -z-10 h-40 w-full sm:h-52"
        style={{
          background:
            "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
        }}
      />
      <div className="mx-auto flex max-w-screen-lg flex-col px-5 lg:px-0">
        <div className="mt-5">
          <h1
            dir="rtl"
            className="dhivehi-font text-2xl font-bold text-white sm:text-3xl"
          >
            ރަދީފް
          </h1>
        </div>
        <Search />
      </div>
    </main>
  );
}
