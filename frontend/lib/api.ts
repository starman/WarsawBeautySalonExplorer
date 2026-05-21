const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5034/api";

export async function getSalons() {
  const res = await fetch(`${API_URL}/salons`);
  return res.json();
}

export async function getSalon(id: string) {
  const res = await fetch(`${API_URL}/salons/${id}`);
  return res.json();
}

export async function updateSalon(id: string, data: any) {
  const res = await fetch(`${API_URL}/salons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to parse update request");

  if (res.status === 204) return {};
  return res.json();
}
