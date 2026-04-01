import tourIsland from "@/assets/tour-island.jpg";
import tourBeach from "@/assets/tour-beach.jpg";
import tourHistorical from "@/assets/tour-historical.jpg";
import tourSunset from "@/assets/tour-sunset.jpg";
import tourNightlife from "@/assets/tour-nightlife.jpg";
import tourCustom from "@/assets/tour-custom.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export interface Tour {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  duration: string;
  durationHours: number;
  category: "island" | "beach" | "historical" | "nightlife" | "custom";
  difficulty: "Easy" | "Moderate" | "Adventure";
  maxGuests: number;
  image: string;
  galleryImages: string[];
  rating: number;
  reviewCount: number;
  included: string[];
  whatToBring: string[];
  itinerary: { stop: string; description: string }[];
  isFeatured: boolean;
}

export const toursData: Tour[] = [
  {
    slug: "full-island-tour",
    title: "Full Island Tour",
    shortDescription: "See the best of Antigua in one unforgettable day — beaches, history, culture, and breathtaking views.",
    description: "Experience the complete beauty of Antigua on this comprehensive full-day island tour. Daryl will take you to the most stunning beaches, historical landmarks, and hidden gems that only a local would know. From the panoramic views at Shirley Heights to the crystal-clear waters of Half Moon Bay, this tour covers it all. Along the way, enjoy stories about Antigua's rich history, sample local cuisine, and create memories that will last a lifetime.",
    price: 85,
    duration: "6 Hours",
    durationHours: 6,
    category: "island",
    difficulty: "Easy",
    maxGuests: 12,
    image: tourIsland,
    galleryImages: [tourIsland, gallery1, gallery4, gallery3],
    rating: 4.9,
    reviewCount: 187,
    included: [
      "Hotel/resort pickup & drop-off",
      "Professional local guide (Daryl)",
      "Complimentary bottled water",
      "Snacks & light refreshments",
      "All entrance fees included",
      "Photo opportunities at iconic spots",
    ],
    whatToBring: [
      "Sunscreen (reef-safe recommended)",
      "Comfortable walking shoes",
      "Swimsuit & towel",
      "Camera",
      "Light jacket (for Shirley Heights)",
      "Cash for souvenirs",
    ],
    itinerary: [
      { stop: "Hotel Pickup", description: "Daryl collects you from your hotel or resort with a warm welcome." },
      { stop: "Shirley Heights Lookout", description: "Panoramic views of English Harbour and Falmouth Bay from 490 feet above sea level." },
      { stop: "Nelson's Dockyard", description: "Explore the UNESCO World Heritage Site — the only working Georgian dockyard in the world." },
      { stop: "Fig Tree Drive", description: "Wind through the tropical rainforest along Antigua's most scenic road." },
      { stop: "Half Moon Bay", description: "Relax on one of the Caribbean's most beautiful beaches with pristine white sand." },
      { stop: "Betty's Hope", description: "Visit Antigua's first full-scale sugar plantation, dating back to 1651." },
      { stop: "Local Lunch Stop", description: "Enjoy authentic Antiguan cuisine at a local favorite restaurant." },
      { stop: "Hotel Drop-off", description: "Return to your hotel refreshed and full of unforgettable memories." },
    ],
    isFeatured: true,
  },
  {
    slug: "beach-hopper",
    title: "Beach Hopper",
    shortDescription: "Hop between Antigua's most stunning beaches — from hidden coves to the famous 365 beaches.",
    description: "Antigua is famous for having 365 beaches — one for every day of the year. On this tour, Daryl takes you to the absolute best ones. From the pink sands of Barbuda's influence to the calm turquoise waters of Dickenson Bay, each stop is more beautiful than the last. Swim, snorkel, sunbathe, or simply take in the views. This is the ultimate beach lover's paradise tour.",
    price: 65,
    duration: "4 Hours",
    durationHours: 4,
    category: "beach",
    difficulty: "Easy",
    maxGuests: 8,
    image: tourBeach,
    galleryImages: [tourBeach, gallery1, gallery2, gallery4],
    rating: 4.8,
    reviewCount: 143,
    included: [
      "Hotel pickup & drop-off",
      "Visit to 4 stunning beaches",
      "Snorkeling gear provided",
      "Bottled water & tropical juice",
      "Beach chairs at select locations",
    ],
    whatToBring: [
      "Swimsuit & towel",
      "Reef-safe sunscreen",
      "Waterproof phone case",
      "Snacks if desired",
      "Cash for beachside vendors",
    ],
    itinerary: [
      { stop: "Hotel Pickup", description: "Collected from your accommodation with cold towels and water." },
      { stop: "Dickenson Bay", description: "Start at one of Antigua's most popular beaches with calm, crystal-clear water." },
      { stop: "Fort James Beach", description: "A quieter gem near St. John's with historic fort ruins to explore." },
      { stop: "Valley Church Beach", description: "Stunning white sand and turquoise waters — perfect for snorkeling." },
      { stop: "Ffryes Beach", description: "End at this hidden paradise known for its incredible sunset views." },
      { stop: "Hotel Drop-off", description: "Return sun-kissed and relaxed to your hotel." },
    ],
    isFeatured: true,
  },
  {
    slug: "historical-antigua",
    title: "Historical Antigua",
    shortDescription: "Journey through 400 years of Antiguan history — from colonial forts to sugar plantations.",
    description: "Step back in time and explore the fascinating history of Antigua & Barbuda. This tour takes you through centuries of colonial history, from the strategic military fortifications to the sugar plantations that shaped the island's culture. Visit Nelson's Dockyard, a UNESCO World Heritage Site, explore the ruins of Betty's Hope plantation, and learn about the island's journey from colonization to independence. Daryl brings history to life with captivating stories and deep local knowledge.",
    price: 75,
    duration: "5 Hours",
    durationHours: 5,
    category: "historical",
    difficulty: "Moderate",
    maxGuests: 10,
    image: tourHistorical,
    galleryImages: [tourHistorical, gallery3, gallery1, gallery4],
    rating: 4.9,
    reviewCount: 98,
    included: [
      "Hotel pickup & drop-off",
      "Expert historical commentary",
      "All entrance fees",
      "Bottled water",
      "Visit to 5+ historical sites",
    ],
    whatToBring: [
      "Comfortable walking shoes",
      "Hat & sunscreen",
      "Camera",
      "Water bottle",
      "Notebook (optional)",
    ],
    itinerary: [
      { stop: "Hotel Pickup", description: "Begin your journey through time." },
      { stop: "St. John's Cathedral", description: "Visit the iconic twin-towered Anglican cathedral, rebuilt after the 1843 earthquake." },
      { stop: "Museum of Antigua & Barbuda", description: "Explore artifacts from the Arawak period through independence." },
      { stop: "Nelson's Dockyard", description: "Walk through the world's only continuously working Georgian dockyard." },
      { stop: "Clarence House", description: "Tour the 18th-century residence built for Prince William Henry (later King William IV)." },
      { stop: "Betty's Hope Plantation", description: "See the restored twin windmills at Antigua's oldest sugar plantation." },
      { stop: "Hotel Drop-off", description: "Return enriched with the stories of Antigua." },
    ],
    isFeatured: true,
  },
  {
    slug: "sunset-cruise",
    title: "Sunset Cruise",
    shortDescription: "Sail into a Caribbean sunset with rum punch, music, and unforgettable ocean views.",
    description: "There's nothing quite like an Antiguan sunset seen from the water. Join Daryl for an intimate sunset cruise along the coast, sipping rum punch as the sky transforms into shades of gold, orange, and crimson. With reggae music playing softly and dolphins occasionally surfacing alongside, this is pure Caribbean magic. Perfect for couples, families, or anyone looking for a magical evening on the water.",
    price: 95,
    duration: "3 Hours",
    durationHours: 3,
    category: "island",
    difficulty: "Easy",
    maxGuests: 6,
    image: tourSunset,
    galleryImages: [tourSunset, gallery4, gallery1, gallery2],
    rating: 5.0,
    reviewCount: 76,
    included: [
      "Hotel pickup & drop-off to marina",
      "Catamaran cruise",
      "Rum punch & soft drinks",
      "Light appetizers",
      "Snorkeling stop (weather permitting)",
      "Onboard music",
    ],
    whatToBring: [
      "Light layers for evening breeze",
      "Camera (waterproof recommended)",
      "Swimsuit",
      "Seasickness remedy if needed",
    ],
    itinerary: [
      { stop: "Marina Pickup", description: "Board the catamaran at Jolly Harbour Marina." },
      { stop: "Coastal Cruise", description: "Sail along Antigua's stunning west coast with commentary." },
      { stop: "Snorkel Stop", description: "Quick swim and snorkel in a secluded cove (weather permitting)." },
      { stop: "Sunset Viewing", description: "Find the perfect spot as the sun paints the sky in Caribbean colors." },
      { stop: "Return to Marina", description: "Sail back under the stars to Jolly Harbour." },
    ],
    isFeatured: true,
  },
  {
    slug: "sunset-nightlife",
    title: "Sunset & Nightlife",
    shortDescription: "Experience Antigua after dark — beach bars, live music, and Caribbean vibes.",
    description: "When the sun goes down, Antigua comes alive. This evening tour starts with sunset at Shirley Heights — famous for its Sunday steel band party — then takes you through the island's best nightlife spots. From beachside rum shacks to lively bars with live calypso and reggae music, Daryl knows exactly where the best vibes are. Dance, drink, and soak up the incredible energy of Antiguan nightlife.",
    price: 80,
    duration: "5 Hours",
    durationHours: 5,
    category: "nightlife",
    difficulty: "Moderate",
    maxGuests: 8,
    image: tourNightlife,
    galleryImages: [tourNightlife, gallery3, gallery1, gallery4],
    rating: 4.7,
    reviewCount: 62,
    included: [
      "Hotel pickup & drop-off",
      "Welcome rum punch",
      "Visit to 3-4 nightlife spots",
      "Local guide throughout",
      "Safe late-night return",
    ],
    whatToBring: [
      "Comfortable shoes for dancing",
      "Cash for drinks & tips",
      "Light layers",
      "Good vibes!",
    ],
    itinerary: [
      { stop: "Hotel Pickup", description: "Evening pickup as the sun starts to set." },
      { stop: "Shirley Heights", description: "Catch the famous sunset with steel band music and BBQ." },
      { stop: "English Harbour Bar", description: "Cold drinks at a historic waterfront bar." },
      { stop: "St. John's Nightlife", description: "Experience the island's main nightlife district." },
      { stop: "Beach Bar Finale", description: "End the night at a legendary beachside bar." },
      { stop: "Hotel Drop-off", description: "Safe and fun ride back to your hotel." },
    ],
    isFeatured: false,
  },
  {
    slug: "custom-private-tour",
    title: "Custom Private Tour",
    shortDescription: "Design your own Antigua adventure — you choose where to go, and Daryl makes it happen.",
    description: "Have something specific in mind? The Custom Private Tour lets you design your own perfect day in Antigua. Whether you want to visit every rum distillery on the island, find the most secluded beach, explore local markets, or combine a bit of everything, Daryl will create a personalized itinerary just for you. This is the ultimate way to experience Antigua on your own terms, at your own pace.",
    price: 120,
    duration: "Flexible",
    durationHours: 8,
    category: "custom",
    difficulty: "Easy",
    maxGuests: 6,
    image: tourCustom,
    galleryImages: [tourCustom, gallery1, gallery3, gallery4],
    rating: 5.0,
    reviewCount: 45,
    included: [
      "Hotel pickup & drop-off",
      "Fully customizable itinerary",
      "Private vehicle & guide",
      "Bottled water & refreshments",
      "Flexible timing",
      "Local insider recommendations",
    ],
    whatToBring: [
      "Whatever you need for your chosen activities",
      "Sunscreen & hat",
      "Camera",
      "Sense of adventure",
    ],
    itinerary: [
      { stop: "Consultation", description: "Chat with Daryl about your dream Antigua day — he'll suggest amazing options." },
      { stop: "Custom Stop 1", description: "Your first chosen destination, perfectly timed." },
      { stop: "Custom Stop 2", description: "Continue your personalized adventure." },
      { stop: "Lunch Break", description: "Daryl recommends the perfect restaurant for your tastes." },
      { stop: "Custom Stop 3", description: "Afternoon exploration of your choice." },
      { stop: "Hotel Drop-off", description: "End your perfect custom day whenever you're ready." },
    ],
    isFeatured: false,
  },
];

export const categories = [
  { value: "all", label: "All" },
  { value: "island", label: "Island Tours" },
  { value: "beach", label: "Beach" },
  { value: "historical", label: "Historical" },
  { value: "nightlife", label: "Nightlife" },
  { value: "custom", label: "Custom" },
] as const;
