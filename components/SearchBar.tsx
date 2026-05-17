"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue }: SearchBarProps) {
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams();
        if (value.trim()) {
          params.set("q", value.trim());
        }
        const qs = params.toString();
        router.push(qs ? `/?${qs}` : "/");
      }, 300);
    },
    [router]
  );

  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="Search Pokémon by name…"
        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-base text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-800"
      />
    </div>
  );
}
