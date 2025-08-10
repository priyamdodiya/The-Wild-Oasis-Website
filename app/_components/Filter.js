"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex gap-2 p-2">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </FilterButton>
      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1–3 guests
      </FilterButton>
      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4–7 guests
      </FilterButton>
      <FilterButton
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8–12 guests
      </FilterButton>
    </div>
  );
};

function FilterButton({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 rounded transition-colors ${filter === activeFilter
          ? "bg-primary-700 text-primary-50"
          : "hover:bg-primary-700"
        }`}
    >
      {children}
    </button>
  );
}

export default Filter;
