export const NAV = [
  ['home', 'Home'], ['about', 'About Us'], ['services', 'Our Services'],
  ['process', 'Treatment Process'], ['sustainability', 'Sustainability'], ['contact', 'Contact Us'],
]

export const STATS = [
  { n: 140, label: 'plants commissioned' },
  { n: 85, label: 'million litres treated daily' },
  { n: 17, label: 'years of operation' },
  { n: 98, label: '% discharge compliance' },
]

export const SERVICES = [
  { title: 'Industrial effluent treatment', text: 'Plants for textile, food, chemical and pharma units that must meet strict discharge limits.',
    icon: <><path d="M6 40V20l12-8v8l12-8v8l12-8v28Z" /><path d="M14 40v-8h6v8" /></> },
  { title: 'Municipal sewage plants', text: 'Large-capacity systems that keep towns and cities clean, built to run around the clock.',
    icon: <><path d="M6 42V18l18-10 18 10v24" /><path d="M16 42V28h16v14" /></> },
  { title: 'Water recycling and reuse', text: 'Treated water polished for gardening, cooling towers and flushing, cutting freshwater demand.',
    icon: <><path d="M24 6S10 22 10 30a14 14 0 0 0 28 0C38 22 24 6 24 6Z" /><path d="M17 31a7 7 0 0 0 7 7" /></> },
  { title: 'Operation and maintenance', text: 'Our operators run your plant, monitor it live and fix problems before they become shutdowns.',
    icon: <><circle cx="24" cy="24" r="8" /><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" /></> },
]

export const STEPS = [
  { color: '#8a6d3b', tag: 'Raw wastewater', title: 'Screening and grit removal', text: 'Bar screens catch plastics, rags and debris. Heavy grit settles out so it can’t damage pumps downstream.' },
  { color: '#8f8a4a', tag: 'Solids settled', title: 'Primary settling', text: 'In large calm tanks, suspended solids sink as sludge and oils float up to be skimmed away.' },
  { color: '#6fa07a', tag: 'Biologically treated', title: 'Biological treatment', text: 'Friendly microbes in aerated tanks digest dissolved organic waste, doing the heavy lifting of cleaning.' },
  { color: '#4fb9a8', tag: 'Filtered', title: 'Filtration and clarification', text: 'Sand, membrane and ultrafiltration units remove the finest particles, leaving the water visibly clear.' },
  { color: '#2ec4e0', tag: 'Safe to reuse', title: 'Disinfection and discharge', text: 'UV light and controlled chlorination remove harmful pathogens. The water is tested, then reused or released safely.' },
]

export const RINGS = [
  { p: 92, text: 'of treated water reused on site or nearby' },
  { p: 70, text: 'of plant energy from solar and biogas' },
  { p: 100, text: 'of sludge turned into compost or fuel' },
]
