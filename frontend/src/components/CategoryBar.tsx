//C:\webproje\celikoglu_baklava\frontend\src\components\CategoryBar.tsx
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  categories: { name: string; slug: string }[];
}

export default function CategoryBar({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="bg-light py-2 mb-3 w-100 d-flex justify-content-center align-items-center position-relative">
      <div className="position-relative d-flex align-items-center w-100 container">
        <button
          onClick={() => scroll("left")}
          className="category-button position-absolute start-0 bg-dark-green text-white"
          style={{ zIndex: 10, borderRadius: "50%", padding: "8px" }}
        >
          <ChevronLeft size={20} />
        </button>
        <div ref={scrollRef} className="d-flex gap-2 overflow-auto scrollbar-hide mx-5 w-100">
          <Link href="/" className="category-button bg-dark-green text-white me-2">
            Tümü
          </Link>
          {categories.map((cat, idx) => (
            <Link key={idx} href={`/category/${cat.slug}`} className="category-button bg-dark-green text-white me-2">
              {cat.name}
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="category-button position-absolute end-0 bg-dark-green text-white"
          style={{ zIndex: 10, borderRadius: "50%", padding: "8px" }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}