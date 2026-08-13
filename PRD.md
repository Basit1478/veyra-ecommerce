# VEYRA ATELIER — Product Requirements Document

## Product vision

VEYRA ATELIER is a fictional premium accessories house built around quiet confidence, sculptural leather goods, and small-batch craft. The website should feel like a digital flagship: editorial enough to be memorable, familiar enough to shop without friction, and refined enough that no surface feels template-generated.

## Creative direction

- Brand position: contemporary European atelier; understated, architectural, tactile.
- Voice: concise, assured, human. Never salesy or filled with generic luxury clichés.
- Palette: ink black, bone, parchment, oxblood, muted brass.
- Typography: high-contrast editorial serif for statements, neutral grotesk for navigation and commerce.
- Logo: custom code-native monogram combining a V and an atelier arch; paired with a spaced wordmark.
- Photography: warm, directional studio light; real leather grain; restrained styling; no embedded text or third-party marks.
- Inspiration synthesis: Dribbble’s editorial product layouts, Pinterest’s tactile material palettes, Awwwards’ immersive storytelling and motion, and Layers’ disciplined component hierarchy.

## Audience

Design-conscious shoppers aged 25–45 who value material quality, considered objects, and a premium but calm buying experience.

## Core experience

1. First visit opens with a full-screen “collection overture.” The user scrolls, wheels, swipes, or uses the arrow control to move through three product frames before entering the store. A visible Skip control preserves agency.
2. The homepage moves from cinematic campaign to shoppable new arrivals, craft story, category navigation, and journal/editorial content.
3. The shop page provides category filters, responsive product cards, quick-add feedback, and direct product navigation.
4. Product detail pages provide imagery, price, color and size selection, shipping context, accordion details, and a clear add-to-bag action.
5. The story page explains the house, materials, process, and principles.
6. Cart state is visible globally in a polished side drawer and persists during the session.

## Pages

- `/` — opening showcase + flagship homepage
- `/shop` — complete collection and filters
- `/product/[slug]` — product detail experience
- `/story` — brand story and craft manifesto

## Functional requirements

- Fully responsive from 320px mobile to large desktop.
- Working mobile navigation, product filters, product links, color/size controls, quantity and add-to-cart interactions.
- Cart drawer with editable quantity, subtotal, empty state, and checkout affordance.
- Semantic navigation, keyboard focus states, alt text, accessible buttons, and sufficient contrast.
- Reduced-motion mode removes scroll hijacking and spatial movement while keeping gentle fades.
- Images optimized through Next.js with stable aspect ratios to avoid layout shift.

## Motion principles

- GSAP drives the first-visit showcase and selected scroll-linked editorial reveals.
- Interaction motion stays under 300ms, uses strong ease-out curves, and animates transform/opacity only.
- Buttons respond on press with subtle scale feedback.
- Motion communicates hierarchy and state; repeated commerce actions remain fast.
- No decorative perpetual motion, cursor gimmicks, or inaccessible scroll traps.

## Success criteria

- Looks authored and brand-specific rather than like a generic AI landing page.
- Every core page works at mobile, tablet, and desktop breakpoints.
- Production build and lint pass.
- Opening showcase is skippable, keyboard-accessible, touch-friendly, and respects reduced motion.
- Shopping path from discovery to cart is complete and understandable.

