export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  status: string;
  /** One-line framing used on the index and the home page track. */
  summary: string;
  overview: string;
  challenge?: string;
  approach: string;
  result: string;
  /** Headline figure, shown large on the detail page. */
  metric?: string;
  metricLabel?: string;
  /** Tools, methods and domains, listed on the detail page. */
  stack?: string[];
};

export const projects: Project[] = [
  {
    slug: 'dp-collector',
    title: 'DP Collector',
    year: '2023',
    category: 'Product / Sustainability',
    status: 'Global Second Prize — ISCES',
    summary:
      'An incentive-led recycling app turning plastic waste into measurable participation.',
    overview:
      'DP Collector lets people upload images of plastic waste and exchange verified contributions for points or cash. The product treats recycling as a habit-forming loop rather than a civic duty: contribute, verify, get rewarded, see the aggregate impact.',
    challenge:
      'Individual environmental action is invisible. Nobody can see their own contribution, so nobody repeats it.',
    approach:
      'Connected a clear mobile contribution loop to community-scale incentives and impact storytelling, so a single upload reads as part of a larger number.',
    result:
      'Placed second globally at ISCES, selected from more than 400 projects in a UNEP and Tongji University context.',
    metric: '400+',
    metricLabel: 'Competing projects',
    stack: ['Product design', 'Mobile', 'Incentive design', 'Impact modelling'],
  },
  {
    slug: 'stakershub',
    title: 'StakersHub',
    year: '2025',
    category: 'Strategy / Climate',
    status: 'ISCES Finalist',
    summary: 'A plastic-waste management initiative designed for Mumbai.',
    overview:
      'A city-focused waste-management concept connecting household participation, collection operations and commercial durability — designed so that the people doing the work are not the people subsidising it.',
    challenge:
      'Build a system that works for communities and for the organisations moving recovered material, without either side carrying the whole cost.',
    approach:
      'Contributed to solution design, business strategy and impact assessment, modelling the flow of material and money through the city.',
    result: 'Selected as an ISCES finalist.',
    stack: ['Systems design', 'Business strategy', 'Impact assessment'],
  },
  {
    slug: 'health-ai',
    title: 'Health AI',
    year: '2026',
    category: 'AI / Product',
    status: 'In development',
    summary: 'A DeepSeek-powered assistant for the fresh-rice purchase moment.',
    overview:
      'A customer-facing assistant that brings product guidance directly into the automated fresh-rice milling journey, inside Shiweixian’s WeChat Mini Program ecosystem.',
    challenge:
      'Freshly milled rice has real, specific advantages that customers cannot evaluate at the point of purchase. The capability was invisible at exactly the moment it mattered.',
    approach:
      'Designed an LLM-assisted recommendation layer around the point of purchase, translating product properties into guidance a customer can act on in seconds.',
    result:
      'In active development as part of Shiweixian’s WeChat Mini Program ecosystem.',
    stack: ['DeepSeek', 'LLM product design', 'WeChat Mini Program', 'Retail'],
  },
  {
    slug: 'friday-evaluation',
    title: 'FRIDAY Evaluation',
    year: '2025',
    category: 'Software / Research',
    status: 'Meituan internship',
    summary:
      'Structured model evaluation that turned failure patterns into better decisions.',
    overview:
      'Case analysis on the FRIDAY multi-model evaluation platform for real operational scenarios, focused on why models failed rather than how often.',
    challenge:
      'Detection degraded when obstacle-context information changed, and aggregate accuracy numbers said nothing about the reason.',
    approach:
      'Worked in a six-person team using structured evaluation and enhanced prompting, grouping failures by cause so each iteration targeted a specific pattern.',
    result: 'Helped improve detection accuracy from 83% to 91%.',
    metric: '83 → 91',
    metricLabel: 'Detection accuracy (%)',
    stack: ['Model evaluation', 'Prompt engineering', 'Failure analysis'],
  },
  {
    slug: 'patents',
    title: 'Three Patents',
    year: '2025',
    category: 'Engineering / IP',
    status: 'Granted',
    summary:
      'Safety and fault-detection systems for vehicle assembly and charging infrastructure.',
    overview:
      'Three granted Chinese patents spanning maintenance display, charging-pile safety detection and integrated fault detection.',
    approach:
      'Developed practical detection concepts around automotive assembly and charging systems, working from the failure modes backwards.',
    result: 'Granted as CN119453703A, CN120293095A and CN120674870A.',
    metric: '03',
    metricLabel: 'Granted patents',
    stack: ['Fault detection', 'Automotive systems', 'Charging infrastructure'],
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
