import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="Veyra Atelier home">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M7 7h22v22H7z" />
        <path d="M11 11l7 14 7-14M13 23h10" />
      </svg>
      <span>VEYRA <i>ATELIER</i></span>
    </Link>
  );
}

