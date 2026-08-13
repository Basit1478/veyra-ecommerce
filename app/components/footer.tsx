import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return <>
    <section className="keepsake">
      <div className="keepsake-image"><Image src="/images/veyra-hero.png" alt="Oxblood leather developing a quiet patina" fill sizes="(max-width: 700px) 100vw, 46vw" /></div>
      <div className="keepsake-copy"><span>A NOTE ON KEEPING / Nº 01</span><h2>The first mark<br />makes it <em>yours.</em></h2><p>Leather remembers. The rain you ran through. The corner of a table. The hand that reached for it every morning.</p><p>We do not make our pieces to remain untouched. We make them to become unmistakably yours.</p><i>Keep the evidence of a life well lived.</i></div>
    </section>
    <footer className="footer">
      <div className="footer-letter"><p>Private notes from the atelier</p><h2>Objects, stories,<br />and new editions.</h2><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Email address" /><button type="submit">Join us ↗</button></form></div>
      <div className="footer-links"><div><span>Visit</span><Link href="/shop">Collection</Link><Link href="/story">The house</Link></div><div><span>Service</span><a href="mailto:concierge@veyra.example">Concierge</a><a href="#">Care guide</a></div></div>
      <div className="footer-bottom"><Logo light /><span>New York · Paris · Everywhere</span><small>© 2026 Veyra Atelier</small></div>
    </footer>
  </>;
}
