import Link from "next/link";

export function Logo({ light = false, decorative = false }: { light?: boolean; decorative?: boolean }) {
  const mark = <>
      <svg className="veyra-seal" viewBox="0 0 64 64" role="img" aria-label="Veyra Atelier monogram">
        <ellipse className="seal-ring" cx="32" cy="32" rx="25.75" ry="28.25" />
        <path className="seal-v" d="M18.5 20.25 31.8 46.6 45.6 20.25" />
        <path className="seal-a" d="M23.2 40.9 32.1 22.4 41.3 40.9M26.5 34.5h11.2" />
        <path className="seal-crown" d="M27.5 15.8h9" />
        <circle className="seal-point" cx="32" cy="51.35" r="1.05" />
      </svg>
      <span className="veyra-wordmark"><b>VEYRA</b><i>ATELIER</i></span>
      <small className="season-mark">14 · VIII · 1947</small>
    </>;

  const className = `logo veyra-signature ${light ? "logo-light" : ""}`;
  if (decorative) return <span className={className} aria-hidden="true">{mark}</span>;

  return <Link href="/" className={className} aria-label="Veyra Atelier home">{mark}</Link>;
}
