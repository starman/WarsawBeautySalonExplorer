import { getSalons } from "@/lib/api";
import SalonCard from "@/components/SalonCard";

export default async function HomePage() {
  const salons = await getSalons();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-black text-gray-900 mt-3 mb-8">
            Warsaw Beauty Salon Explorer
        </h1>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {salons.map((salon: any) => (
            <SalonCard
              key={salon.id}
              salon={salon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}