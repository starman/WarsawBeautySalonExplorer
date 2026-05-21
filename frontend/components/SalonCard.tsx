import Link from "next/link";

export default function SalonCard({ salon }: any) {
  return (
    <Link
      href={`/salon/${salon.id}`}
      className="border rounded-xl p-4 hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold">{salon.name}</h2>

      <p className="text-sm text-gray-500">
        {salon.district}
      </p>

      <div className="mt-2 text-sm">
        ⭐ {salon.rating}
      </div>
    </Link>
  );
}