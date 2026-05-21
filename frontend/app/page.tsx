import { getSalons } from "@/lib/api";
import SalonCard from "@/components/SalonCard";

export default async function HomePage() {
  const salons = await getSalons();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Warsaw Beauty Salon Explorer
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {salons.map((s: any, i: number) => (
          <SalonCard key={i} salon={s} />
        ))}
      </div>
    </main>
  );
}