"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="mb-10">
      <Image src="/logo.svg" alt="Munchies" width={200} height={32} priority />
    </header>
  );
}
