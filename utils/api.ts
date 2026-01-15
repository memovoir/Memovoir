// utils/api.ts
export async function togglePin(memoryId: string, isPinned: boolean) {
    const res = await fetch("/api/memories/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memory_id: memoryId,
        is_pinned: isPinned
      })
    });
  
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error || "Failed to toggle pin");
    }
  
    return json;
  }
  