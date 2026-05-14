// Centralized site data for DCX Security Systems

export const COMPANY = {
  name: "DCX Security Wizards",
  short: "DCX",
  tagline: "Advanced Security Solutions for Homes, Offices & Businesses",
  phone: "099717 95961",
  phoneDial: "+919971795961",
  whatsapp: "919971795961",
  instagram: "dcxsecuritywizards",
  instagramUrl: "https://www.instagram.com/dcxsecuritywizards",
  address:
    "11/39, New Sita Nagar, Sita Nagar, Rambagh, Agra, Uttar Pradesh 282006",
  hours: "Open 24 Hours",
  email: "dcxwizards@gmail.com",
  mapsEmbed:
    "https://www.google.com/maps?q=Sita+Nagar+Rambagh+Agra+Uttar+Pradesh+282006&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=11/39,+New+Sita+Nagar,+Rambagh,+Agra,+Uttar+Pradesh+282006",
};

// Use a generic placeholder image strategy: each product gets a unique seed.
// Falls back to Unsplash images relevant to security tech.
const PRODUCT_IMG = {
  ir: "https://i.postimg.cc/sgSgTrgz/Whats-App-Image-2026-05-03-at-21-01-04.jpg",
  defender100: "https://i.postimg.cc/9QdrW7wg/Whats-App-Image-2026-05-06-at-23-27-15.jpg",
  defender200: "https://i.postimg.cc/9QdrW7wk/Whats-App-Image-2026-05-06-at-23-27-15-(1).jpg",
  defender300: "https://i.postimg.cc/Sx6JyMYv/Whats-App-Image-2026-05-06-at-23-27-16.jpg",
  panic: "https://i.postimg.cc/FKT8cTJ7/Whats-App-Image-2026-05-06-at-23-13-44.jpg",
  commercialdefender: "https://i.postimg.cc/52B6xCQs/Whats-App-Image-2026-05-06-at-23-25-03.jpg",
  fire: "https://i.postimg.cc/NfKMrThG/Whats-App-Image-2026-05-03-at-21-00-53.jpg",
  glass: "https://i.postimg.cc/HsFL0xdC/Whats-App-Image-2026-05-03-at-21-01-01.jpg",
  curtain: "https://i.postimg.cc/L8f8xp6w/Whats-App-Image-2026-05-03-at-21-01-02.jpg",
  outdoor: "https://i.postimg.cc/hPNG8jcW/Whats-App-Image-2026-05-03-at-21-01-01-(2).jpg",
  shutter: "https://i.postimg.cc/1zv26vNt/Whats-App-Image-2026-05-06-at-23-14-18.jpg",
  beam: "https://i.postimg.cc/RZfZgBZ5/Whats-App-Image-2026-05-03-at-21-01-03.jpg",
  door: "https://i.postimg.cc/28g5d6ms/Whats-App-Image-2026-05-03-at-21-01-02-(1).jpg",
  gas: "https://i.postimg.cc/wBwZJwsy/Whats-App-Image-2026-05-06-at-22-47-26.jpg",
};

export const PRODUCTS = [
  {
    id: "infrared-sensor",
    name: "Infrared Sensor",
    price: "₹9,949",
    image: PRODUCT_IMG.ir,
    category: "Sensor",
    description:
      "Advanced motion detection using dual infrared and microwave technology for unauthorized movement detection and 24x7 protection.",
    features: ["Dual-tech detection", "Pet immune", "24x7 protection", "Low power draw"],
  },
  {
    id: "defender100",
    name: "Defender-100",
    price: "₹33,949",
    image: PRODUCT_IMG.defender100,
    category: "Control",
    description:
      "Central security control hub with touchscreen, SOS, instant alerts, and multi-sensor integration.",
    features: ["Touchscreen", "Multi-zone", "SOS alerts", "Wireless integration"],
  },
  {
    id: "panic-switch",
    name: "Panic Switch",
    price: "₹2,450",
    image: PRODUCT_IMG.panic,
    category: "Emergency",
    description: "Emergency switch for immediate alarm activation in critical situations.",
    features: ["Instant trigger", "Tamper proof", "Wall / portable", "Long battery"],
  },
  {
    id: "defender200",
    name: "Defender-200",
    price: "₹39,950",
    image: PRODUCT_IMG.defender200,
    category: "Control",
    description:
      "Enhanced security control hub with built-in siren, voice prompts, and support for up to 100 sensors.",
    features: ["Built-in siren", "Voice prompts", "100 sensor support", "App control"],
  },
  {
    id: "defender300",
    name: "Defender-300",
    price: "₹49,950",
    image: PRODUCT_IMG.defender300,
    category: "Control",
    description:
      "Premium touchscreen smart hub with Away, Stay, Disarm, and SOS modes for whole-home security.",
    features: ["4 mode arming", "Smart automation", "App control", "Voice prompts"],
  },
  {
    id: "commercial-defender",
    name: "Commercial Defender",
    price: "₹37,950",
    image: PRODUCT_IMG.commercialdefender,
    category: "Control",
    description:
      "Enterprise-grade security control hub for large commercial spaces with advanced features and scalability.",
    features: ["Scalable architecture", "Advanced analytics", "Remote monitoring", "Multi-user access"],
  },

  {
    id: "fire-sensor",
    name: "Fire Sensor",
    price: "₹6,950",
    image: PRODUCT_IMG.fire,
    category: "Fire Safety",
    description:
      "Combined smoke and heat detection for early-stage fire protection across rooms and corridors.",
    features: ["Smoke + heat", "Loud siren", "Battery backup", "Self test"],
  },
  {
    id: "glass-break-sensor",
    name: "Glass Break Sensor",
    price: "₹6,950",
    image: PRODUCT_IMG.glass,
    category: "Sensor",
    description: "Acoustic glass break detection for windows and showcases with instant alarm trigger.",
    features: ["Acoustic detection", "9m range", "Wireless", "False alarm filter"],
  },
  {
    id: "curtain-sensor",
    name: "Curtain Sensor",
    price: "₹15,949",
    image: PRODUCT_IMG.curtain,
    category: "Sensor",
    description: "Vertical invisible protection layer for doors, windows, and balconies.",
    features: ["Narrow beam", "Pet friendly", "Indoor / outdoor", "Discreet design"],
  },
  {
    id: "outdoor-ir-sensor",
    name: "Outdoor Infrared Sensor",
    price: "₹29,950",
    image: PRODUCT_IMG.outdoor,
    category: "Perimeter",
    description: "Weather-proof outdoor perimeter motion detection for gardens and driveways.",
    features: ["IP65 rated", "Long range", "Anti-mask", "Dual element"],
  },
  {
    id: "shutter-sensor",
    name: "Shutter Sensor",
    price: "₹6,950",
    image: PRODUCT_IMG.shutter,
    category: "Sensor",
    description: "Heavy-duty protection for shop shutters against tampering and forced entry.",
    features: ["Vibration sense", "Magnetic combo", "Wireless", "Shop ready"],
  },
  {
    id: "beam-sensor",
    name: "Beam Sensor",
    price: "₹39,950",
    image: PRODUCT_IMG.beam,
    category: "Perimeter",
    description: "Long-range invisible boundary protection sensor for compound walls and gates.",
    features: ["Up to 100m", "Quad beam", "Weather proof", "AC / DC"],
  },
  {
    id: "door-sensor",
    name: "Door Sensor",
    price: "₹6,950",
    image: PRODUCT_IMG.door,
    category: "Sensor",
    description: "Magnetic contact door opening detection with long battery backup.",
    features: ["3 yr battery", "Slim design", "Wireless", "Tamper alert"],
  },
  {
    id: "Gas-leak-sensor",
    name: "Gas Leak Sensor",
    price: "₹12,995",
    image: PRODUCT_IMG.gas,
    category: "Safety",
    description: "Advanced gas leak detection for kitchens and industrial spaces with instant alerts.",
    features: ["Instant alert", "Long battery", "Wireless", "Self diagnostics"],
  },
  
];

export const SERVICES = [
  {
    id: "onsite-demo",
    title: "Onsite Demo",
    icon: "MonitorPlay",
    description: "Live product demonstrations at your home or business so you experience the system before you buy.",
  },
  {
    id: "consultancy",
    title: "Security Consultancy",
    icon: "ShieldCheck",
    description: "Expert advice on the right products, layout and protocols for your space and risk profile.",
  },
  {
    id: "site-survey",
    title: "Site Survey",
    icon: "Map",
    description: "Professional inspection that identifies vulnerabilities and produces a detailed protection plan.",
  },
  {
    id: "installation",
    title: "Installation Support",
    icon: "Wrench",
    description: "Fast, clean and certified installation by our trained technicians with full handover.",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    icon: "Settings",
    description: "Regular health-checks, firmware updates and component replacement to keep systems sharp.",
  },
  {
    id: "emergency",
    title: "Emergency Support",
    icon: "PhoneCall",
    description: "24x7 urgent technical assistance and rapid response for critical incidents.",
  },
];

export const STATS = [
  { value: 1500, suffix: "+", label: "Satisfied Clients" },
  { value: 24, suffix: "x7", label: "Support" },
  { value: 20, suffix: "+", label: "Security Products" },
];

export const CLIENTS = [
  {
    name: "Rajesh Sharma",
    location: "Agra, Uttar Pradesh",
    rating: 5,
    service: "Home Security Setup",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    quote:
      "DCX gave us complete peace of mind. The team mapped every corner of our home and installed a system that actually works.",
    coords: { lat: 27.1767, lng: 78.0081 },
  },
  {
    name: "Amit Verma",
    location: "Dayalbagh, Agra",
    rating: 4.9,
    service: "Shop Security",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    quote:
      "Shutter sensors plus beam protection. Best investment for my shop. Quick install, no fuss.",
    coords: { lat: 27.2033, lng: 77.9954 },
  },
  {
    name: "Neha Gupta",
    location: "Sikandra, Agra",
    rating: 5,
    service: "Fire Safety System",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    quote:
      "Their fire safety consultancy was thorough. They explained every sensor and tested everything in front of us.",
    coords: { lat: 27.2167, lng: 77.9667 },
  },
  {
    name: "Mohit Jain",
    location: "Kamla Nagar, Agra",
    rating: 4.8,
    service: "Office Security",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=80",
    quote:
      "Office is now zoned and monitored end to end. Support team responds within minutes.",
    coords: { lat: 27.207, lng: 78.0027 },
  },
];

export const INSTALLATIONS = [
  {
    image: "https://i.postimg.cc/3wsfv7rk/Whats-App-Image-2026-05-10-at-22-46-16.jpg",
    title: "Installed at BharatGas ",
    
  },
  {
    image: "https://i.postimg.cc/hGkZdg4n/Whats-App-Image-2026-05-10-at-22-46-16-(1).jpg",
    title: "Installed at Marutyi Suzuki Showroom",
    
  },
  {
    image: "https://i.postimg.cc/wBC4mHxq/Whats-App-Image-2026-05-10-at-22-47-09-(1).jpg",
    title: "Installed at Stock Holding Corporation Of India Ltd",
    
  },
  {
    image: "https://i.postimg.cc/XvR1C3Np/Whats-App-Image-2026-05-10-at-22-47-09.jpg",
    title: "Installed at Gramin Bank Of Aryavart",
    
  },
  {
    image: "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=1200&q=80",
    title: "Outdoor IR Detection",
    location: "Rambagh",
  },
  {
    image: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?auto=format&fit=crop&w=1200&q=80",
    title: "Touchscreen Defender Hub",
    location: "Agra Cantt",
  },
  {
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=1200&q=80",
    title: "Curtain Sensor – Balcony",
    location: "Tajganj",
  },
  {
    image: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1200&q=80",
    title: "Glass Break Showroom",
    location: "Sanjay Place",
  },
];

export const FAQS = [
  {
    q: "Do you provide free site survey in Agra?",
    a: "Yes — we offer a complimentary onsite security survey within Agra and surrounding areas. Our consultant maps every entry point and recommends the right system.",
  },
  {
    q: "How long does installation take?",
    a: "Most homes and shops are completed within 4–8 hours. Larger commercial sites are scheduled across 1–3 days based on complexity.",
  },
  {
    q: "Do your systems work during power cut?",
    a: "All hubs and sensors are battery backed. Critical hubs run for 8–24 hours on backup. Optional UPS extension is available.",
  },
  {
    q: "Can I monitor my system from my phone?",
    a: "Yes. Our hubs and WiFi cameras come with mobile apps for arming, disarming, live view and instant alerts.",
  },
  {
    q: "Do you offer AMC and maintenance?",
    a: "We offer annual maintenance contracts with quarterly health checks, priority response, and firmware updates.",
  },
  {
    q: "Which areas do you serve?",
    a: "We primarily serve Agra and nearby districts of Uttar Pradesh. We also undertake commercial projects across North India on request.",
  },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/installations", label: "Installations" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
];
