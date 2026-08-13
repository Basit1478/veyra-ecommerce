export type Product = {
  slug: string;
  name: string;
  category: "Bags" | "Purses" | "Watches" | "Footwear" | "Small leather";
  price: number;
  image: string;
  tone: string;
  description: string;
  note: string;
  material: string;
  dimensions: string;
};

export const products: Product[] = [
  { slug: "serein-hobo", name: "Serein Hobo", category: "Bags", price: 890, image: "/images/product-oxblood-hobo-v2.webp", tone: "Deep Oxblood", description: "A sculptural crescent silhouette cut from deep oxblood full-grain calfskin and finished by hand.", note: "For the shoulder that carries your whole day.", material: "Full-grain Italian calfskin, cotton twill lining, brushed brass.", dimensions: "38 × 24 × 11 cm · strap drop 28 cm" },
  { slug: "atelier-tote", name: "Atelier Tote 32", category: "Bags", price: 1120, image: "/images/azadi-atelier-tote.png", tone: "Pakistan Green", description: "An architectural daily tote with a generous interior and hand-set brass hardware.", note: "Built for work, softened by everywhere after.", material: "Vegetable-tanned calfskin, suede interior, hand-set brass.", dimensions: "42 × 32 × 14 cm · handle drop 25 cm" },
  { slug: "voyage-weekender", name: "Voyage 48", category: "Bags", price: 1480, image: "/images/azadi-voyage-weekender.png", tone: "Deep Emerald", description: "A softly structured weekender for departures that deserve to be remembered.", note: "Pack less. Carry the story home.", material: "Tumbled calfskin, linen lining, solid brass zip.", dimensions: "48 × 29 × 22 cm · cabin ready" },
  { slug: "serein-noir", name: "Serein Hobo 24", category: "Bags", price: 840, image: "/images/azadi-serein-noir.png", tone: "Midnight Green", description: "The smaller Serein, balanced for evenings and unhurried days.", note: "The piece you reach for without looking.", material: "Full-grain calfskin, cotton twill, brushed brass.", dimensions: "31 × 20 × 9 cm · strap drop 25 cm" },
  { slug: "pli-mini", name: "Pli Mini", category: "Purses", price: 720, image: "/images/azadi-pli-mini.png", tone: "Ivory & Green", description: "A compact study in folds, with a softened frame and an adjustable shoulder strap.", note: "Small enough to disappear into the day. Distinct enough to remember.", material: "Pebbled calfskin, nappa lining, pale gold hardware.", dimensions: "21 × 15 × 7 cm · adjustable strap" },
  { slug: "lune-frame", name: "Lune Frame Purse", category: "Purses", price: 660, image: "/images/azadi-lune-frame.png", tone: "Ivory & Green", description: "A softly rounded frame purse inspired by one kept in the founder’s family.", note: "Some objects feel inherited before they are old.", material: "Grained calfskin, lambskin lining, antique brass frame.", dimensions: "19 × 14 × 6 cm · chain drop 52 cm" },
  { slug: "nocturne-crossbody", name: "Nocturne Crossbody", category: "Purses", price: 780, image: "/images/azadi-nocturne-crossbody.png", tone: "Midnight Green", description: "A slim evening crossbody with one continuous fold and a hidden magnetic closure.", note: "For the nights that become stories by morning.", material: "Silk-touch calfskin, suede lining, blackened brass.", dimensions: "23 × 13 × 5 cm · strap drop 54 cm" },
  { slug: "meridian-automatic", name: "Meridian Automatic 38", category: "Watches", price: 1850, image: "/images/azadi-meridian-automatic.png", tone: "Pakistan Green", description: "A quiet automatic watch designed around the ritual of putting it on each morning.", note: "Not to count the hours. To notice them.", material: "Brushed steel, sapphire crystal, hand-cut calfskin strap.", dimensions: "38 mm case · 9.2 mm profile · 5 ATM" },
  { slug: "meridian-36", name: "Meridian 36", category: "Watches", price: 1620, image: "/images/azadi-meridian-36.png", tone: "Midnight Green", description: "A smaller hand-wound case with a warm ivory dial and no unnecessary complication.", note: "Time, reduced to what matters.", material: "Brushed steel, sapphire crystal, black calfskin strap.", dimensions: "36 mm case · 8.6 mm profile · 5 ATM" },
  { slug: "afterlight-watch", name: "Afterlight 32", category: "Watches", price: 1490, image: "/images/azadi-afterlight-watch.png", tone: "Pakistan Green", description: "A slender oval watch whose brushed dial changes gently with the light.", note: "Made for the glances between important moments.", material: "Recycled steel, mineral dial, oxblood calfskin strap.", dimensions: "32 × 27 mm case · 6.8 mm profile" },
  { slug: "passage-loafer", name: "Passage Loafer", category: "Footwear", price: 640, image: "/images/azadi-passage-loafer.png", tone: "Pakistan Green", description: "A hand-lasted loafer made to crease, soften and become unmistakably yours.", note: "The finest shoes remember your way home.", material: "Box calf, vegetable-tanned sole, stacked leather heel.", dimensions: "European sizing 35–46 · true to size" },
  { slug: "rue-derby", name: "Rue Derby", category: "Footwear", price: 690, image: "/images/azadi-rue-derby.png", tone: "Midnight Green", description: "An unlined derby with a softened toe and a remarkably light step.", note: "For long walks and longer conversations.", material: "Unlined calfskin, cork footbed, Blake-stitched leather sole.", dimensions: "European sizing 35–46 · generous fit" },
  { slug: "morrow-slide", name: "Morrow Leather Slide", category: "Footwear", price: 480, image: "/images/product-morrow-slide.png", tone: "Deep Emerald", description: "A pared-back leather slide shaped for slow mornings and warm pavements.", note: "Summer, made tangible.", material: "Vegetable-tanned calfskin, contoured cork, rubber insert.", dimensions: "European sizing 35–46 · half sizes size up" },
  { slug: "folio-wallet", name: "Folio Wallet", category: "Small leather", price: 310, image: "/images/product-folio-wallet.png", tone: "Pakistan Green", description: "A slim, hand-creased folio with eight card pockets and a hidden note sleeve.", note: "It will hold receipts from places you almost forgot.", material: "Full-grain calfskin, moiré lining, hand-painted edges.", dimensions: "11 × 9 × 1.2 cm · eight card pockets" },
  { slug: "arc-cardholder", name: "Arc Cardholder", category: "Small leather", price: 190, image: "/images/product-arc-cardholder.png", tone: "Ivory & Green", description: "Five pockets, one continuous curve, and edges burnished to a quiet sheen.", note: "Only what you need, held beautifully.", material: "Calfskin, five card pockets, burnished edges.", dimensions: "10 × 7 cm · five card pockets" },
  { slug: "memoir-case", name: "Memoir Passport Case", category: "Small leather", price: 340, image: "/images/product-memoir-case.png", tone: "Pakistan Green", description: "A passport case with room for the document, two cards and the ticket you keep.", note: "For stamps, crossings and the proof that you went.", material: "Full-grain calfskin, silk lining, blind-debossed interior.", dimensions: "14 × 10 cm · two card pockets" },
];

export const categories = ["All pieces", "Bags", "Purses", "Watches", "Footwear", "Small leather"] as const;

export const money = (value: number) => `$${value.toLocaleString("en-US")}`;


