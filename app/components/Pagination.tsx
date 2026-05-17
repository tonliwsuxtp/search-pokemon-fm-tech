"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrev}
        className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        ← Prev
      </button>

      <span className="text-sm text-gray-500">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNext}
        className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        Next →
      </button>
    </div>
  );
}
