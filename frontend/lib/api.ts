const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5034/api";

export async function getSalons() {
  try {
    const res = await fetch(`${API_URL}/salons`);

    if (!res.ok) {
      throw new Error("Failed to fetch salons");
    }

    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function getSalon(id: string) {
  try {
    const res = await fetch(`${API_URL}/salons/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch salon");
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function updateSalon(id: string, data: any) {
  const res = await fetch(`${API_URL}/salons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update salon");

  if (res.status === 204) return null;
  return res.json();
}
