---
name: Antiguan Identity Layer
description: Custom SVG components and cultural motifs woven into every page
type: design
---

## Components (src/components/antiguan/)
- AntiguaSunIcon — 7-pointed rising sun, supports spinning/pulsing
- FlagVShape — Inverted V-triangle watermark, gradient or outline variants
- AntiguaFlagBadge — "Proudly Antiguan 🇦🇬" pill, compact or full
- SectionDividerSun — Horizontal line with centered sun
- WaveDivider — Organic SVG wave for section transitions
- SunRating — Gold suns replace stars for ratings
- AntiguaFlag — Full SVG flag recreation (paths, not raster)

## Integration
- Navbar: sun icon in logo and BOOK NOW button, V-shape in mobile menu
- Footer: WaveDivider replaces simple wave, FlagBadge in contact col, V-shape watermark
- Homepage: V-shape gradient on hero, SectionDividerSun in welcome, sun watermark in fleet, SunRating in testimonials, sun separator in CTA
- Tours: sun in active filter, "Explore Antigua ☀️" hover text, SunRating on cards
- TourDetail: sun icons for timeline dots + included items, red top border with sun notch on sidebar
- About: SVG flag + "Born Under This Sun" color meaning grid, Daryl quote with gold marks, sun timeline dots
- Book: pulsing sun in success state, spinning sun in loading, cultural form placeholders
- 404: sun-setting scene with animated sun, "sailed off the map" copy
- WhatsApp: "Chat with Daryl 🌴" tooltip

## CSS Additions (tailwind.config.ts)
- animate-spin-slow: 3s linear infinite rotation
- animate-pulse-gold: 2s ease brightness pulse
- animate-sun-set: 3s alternate vertical bob
