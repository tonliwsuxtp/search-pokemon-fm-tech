"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { POKEMON_TYPES, getTypeColor } from "@/app/lib/utils";

export default function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type") ?? "";

  function selectType(type: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (type === activeType) {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    // Reset to page 1 when type changes
    params.delete("page");

    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {POKEMON_TYPES.map((type) => {
        const isActive = type === activeType;
        return (
          <button
            key={type}
            onClick={() => selectType(type)}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all ${
              isActive
                ? getTypeColor(type) + " ring-2 ring-offset-1 ring-current scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
