"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { SortOrder } from "@/app/lib/utils";

export default function SortSelect({ current }: { current: SortOrder }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "id") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      <option value="id">Sort: Number</option>
      <option value="name">Sort: Name</option>
    </select>
  );
}
