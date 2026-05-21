"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSalon, updateSalon } from "@/lib/api";

interface SalonDetails {
  name: string;
  address: string;
  district: string;
  services: string[];
  rating: number;
  reviewsCount: number;
}

export default function SalonDetailPage() {
  const params = useParams<{ id: string }>();
  const salonId = params.id;

  const [salon, setSalon] = useState<SalonDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!salonId) return;

    setLoading(true);

    getSalon(salonId).then((data) => {
      setSalon(data);
      setLoading(false);
    });
  }, [salonId]);

  if (loading) return <div>Loading...</div>;
  if (!salon) return <div>Not found</div>;

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const preparedPayload: SalonDetails = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      district: formData.get("district") as string,
      services: (formData.get("servicesString") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      rating: Number(formData.get("rating")),
      reviewsCount: Number(formData.get("reviewsCount")),
    };

    try {
      await updateSalon(salonId, preparedPayload);
      const refreshed = await getSalon(salonId);
      setSalon(refreshed);
      setIsEditing(false);
      setSuccessMessage("Salon details updated successfully!");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      alert("Update failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto text-gray-900">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition mb-6"
      >
        Back to browsing
      </Link>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          {successMessage}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
              {salon.district}
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-2">
              {salon.name}
            </h1>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-xl shadow-xs"
            >
              Modify details
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Address
                </h4>
                <p className="text-gray-600 mt-0.5">{salon.address}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rating
                </h4>
                <p className="text-gray-600 mt-0.5 font-semibold">
                  {salon.rating.toFixed(1)}{" "}
                  <span className="text-gray-400 font-normal">
                    ({salon.reviewsCount} reviews)
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">
                Available Services
              </h3>
              {salon.services?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {salon.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg font-medium border border-gray-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No information about provided services
                </p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={salon.name}
                className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  defaultValue={salon.district}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={salon.address}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Rating (0 - 5)
                </label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={salon.rating}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Review Count
                </label>
                <input
                  type="number"
                  name="reviewsCount"
                  defaultValue={salon.reviewsCount}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 tracking-wider">
                Services (Separate with commas)
              </label>
              <textarea
                name="servicesString"
                defaultValue={salon.services?.join(", ")}
                rows={3}
                placeholder="Haircut, Manicure, Balayage"
                className="mt-1 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition rounded-xl shadow-xs"
              >
                {isSaving ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
