import Link from "next/link";

export default function SalonCard({ salon }: any) {
  return (
    <Link
      href={`/salon/${salon.id}`}
      className="
        group
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition
        overflow-hidden
    "
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="
              text-xs
              uppercase
              font-extrabold
              tracking-widest
              bg-indigo-50
              text-indigo-700
              px-2.5
              py-1
              rounded-md
            "
            >
              {salon.district}
            </span>

            <h2
              className="
                text-xl
                font-black
                text-gray-900
                mt-3
                group-hover:text-indigo-700
                transition
                line-clamp-2
                min-h-[56px]
            "
            >
              {salon.name}
            </h2>
          </div>

          <div
            className="
            bg-yellow-100
            text-yellow-700
            text-sm
            font-bold
            px-3
            py-1.5
            rounded-xl
            whitespace-nowrap
          "
          >
            ⭐ {salon.rating}
          </div>
        </div>
      </div>
    </Link>
  );
}
