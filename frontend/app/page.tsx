import { getSalons } from "@/lib/api";
import SalonCard from "@/components/SalonCard";

export default async function HomePage({ searchParams }: any) {
  const salons = await getSalons();

  const params = await searchParams;

  const q = params?.q?.toLowerCase() || "";

  const filteredSalons =
    salons?.filter((salon: any) => {
      const matchesName =
        salon.name?.toLowerCase().includes(q);

      return matchesName;
    }) || [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        
        <h1 className="text-4xl font-black text-gray-900 mt-3 mb-8">
          Warsaw Beauty Salon Explorer
        </h1>

        <form className="mb-8 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            name="q"
            placeholder="Search..."
            defaultValue={searchParams?.q || ""}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {filteredSalons.length === 0 ? (
          <div className="text-gray-500 mt-10">
            <h2 className="text-xl font-semibold">
              No salons found
            </h2>
            
             {salons.length === 0 ? (
                <p className="mt-2">
                  Please check your connection or try again later.
                </p>
              ) : (
                <p className="mt-2">Try adjusting your search.</p>
              )}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredSalons.map((salon: any) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}