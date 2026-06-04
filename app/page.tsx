"use client";

import { useRef } from "react";
import { demos } from '@/lib/demos';
import Link from "next/link";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <div aria-hidden />
      <header>

      </header>
      <main>
        {demos.map((demo) => (
          <Link>
            <div>
              
            </div>
          </Link>
        ))}
      </main>

      <footer>

      </footer>
    </div>
  )
}