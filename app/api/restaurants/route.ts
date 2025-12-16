const EXTERNAL_API = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

export async function GET(): Promise<Response> {
  try {
    const res = await fetch(`${EXTERNAL_API}/restaurants`, {
      next: { revalidate: 300 }, // 5 min
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch restaurants" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error: unknown) {
    console.error("Error fetching restaurants:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
