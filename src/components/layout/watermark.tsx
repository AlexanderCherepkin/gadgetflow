"use client";

import Image from "next/image";

export function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none select-none flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/logo-gadgetflow.png"
        alt=""
        width={1920}
        height={960}
        className="w-screen h-auto max-h-screen object-contain opacity-[0.2]"
        priority={false}
      />
    </div>
  );
}
