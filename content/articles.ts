export type Article = {
  slug: string;
  /** Display date, YYYY.MM. */
  date: string;
  /** Machine-readable date used for <time> and the sitemap. */
  published: string;
  title: string;
  excerpt: string;
  /** Full body. Each string is one paragraph. */
  body: string[];
};

export const articles: Article[] = [
  {
    slug: 'between-disciplines',
    date: '2026.03',
    published: '2026-03-01',
    title: 'The useful space between disciplines',
    excerpt:
      'Why the handoff between technology, business and people is often the real product.',
    body: [
      'Every organisation I have worked inside has a map of itself. Engineering here, commercial there, design somewhere between them, operations underneath. The map is useful. It is also the reason certain problems never get solved, because those problems do not live inside any of the boxes — they live in the handoffs.',
      'At Meituan I spent a summer on model evaluation. The technical framing was clear enough: detection accuracy was too low in scenarios where obstacle context changed. But the number itself was not the problem. The problem was that nobody could say *why* the model failed, which meant every proposed fix was a guess. The work that mattered was not building a better model. It was building a way to group failures by cause, so that the next iteration could aim at something specific.',
      'That is a technical task with a distinctly non-technical shape. It required sitting with operations people who knew what the scenarios actually looked like, and with engineers who knew what the model could see. Accuracy moved from 83% to 91%, and almost none of that came from a cleverer architecture. It came from a shared vocabulary that had not existed the month before.',
      'I keep meeting the same pattern in different clothes. In cross-border trade, the constraint is rarely the product; it is that two sides describe the same transaction with different words and assume the other is being evasive. In competition work, the strongest teams are not the ones with the best technology, they are the ones who can explain why the technology matters to someone who does not care about technology.',
      'The uncomfortable part is that this space has no owner. An engineer is not rewarded for translating, a commercial lead is not measured on technical fidelity, and a designer is usually brought in after the framing is already fixed. So the gap stays open, and everyone routes around it.',
      'I have come to think that routing around it is the expensive choice. The handoff is not overhead between the real work. Very often it *is* the real work — the point where a capability becomes a decision someone can act on. That is the part I want to keep getting better at.',
    ],
  },
  {
    slug: 'markets-are-interfaces',
    date: '2025.11',
    published: '2025-11-01',
    title: 'Markets are interfaces',
    excerpt:
      'Cross-border work is less about translation than designing clarity across different systems.',
    body: [
      'The first assumption people make about cross-border business is that the hard part is language. It is not. Translation is a solved problem and getting more solved every year. The hard part is that two parties can understand every word of a sentence and still hold completely different models of what was agreed.',
      'Three years of China-to-South-Asia B2B work taught me to read this as an interface problem. An interface is the surface where two systems meet, and a good one makes the next step obvious while hiding what the other side does not need to know. That is exactly what a working trade relationship does. The buyer does not need the supplier’s production calendar. They need to know what happens if the shipment slips.',
      'Where deals break down is almost always an underspecified interface. Payment terms that mean one thing in Guangzhou and another in Dhaka. A quality standard that both sides agree to because neither has written down what it excludes. A delivery estimate treated as a commitment on one side and a forecast on the other. Nobody lied. The contract simply had no field for the thing that mattered.',
      'The fix is unglamorous and looks like product work. You find the ambiguity, you name it, you give it a default, and you make the default visible to both sides. Then the relationship stops depending on goodwill and starts depending on structure — which is the only thing that survives a bad quarter.',
      'This is also why I think incentives deserve more attention than culture in these conversations. Culture explains tone. Incentives explain behaviour. When a counterparty does something that looks irrational, it is usually a rational response to a constraint you cannot see from your side of the interface.',
      'Designing that clarity is a real discipline, and it is closer to interface design than to diplomacy. The work is not making two parties agree. It is making disagreement visible early enough to be cheap.',
    ],
  },
  {
    slug: 'building-with-constraints',
    date: '2025.07',
    published: '2025-07-01',
    title: 'Building with constraints',
    excerpt:
      'What model evaluation, product work and competitions taught me about useful limits.',
    body: [
      'Competitions are an artificial environment, and that is precisely what makes them instructive. A fixed deadline, a fixed team, a fixed format and a panel who will not read your appendix. Everything that would normally be deferred has to be decided.',
      'DP Collector started as a much larger idea about waste infrastructure. What survived was narrow: photograph plastic waste, verify it, exchange the contribution for points or cash. The constraint of a competition format forced the question we had been avoiding, which was what a single person actually does on a single afternoon. The narrow version placed second globally out of more than four hundred projects. The larger version would not have made it out of the room.',
      'I have started treating constraints as a diagnostic rather than an obstacle. When a limit makes a project obviously worse, the project usually depended on something unexamined. When a limit makes it sharper, you have found the real shape of the thing.',
      'Model evaluation taught me the same lesson from the other direction. An unconstrained evaluation produces a number. A constrained one — this scenario, this context change, this failure mode — produces a decision. The second is worth far more, and it is only available because you refused to measure everything.',
      'The version of this I find hardest is time. A deadline is the one constraint that cannot be negotiated by being cleverer, and it exposes whether a plan was ever real. Most of my worst work has come from having more time than the idea deserved.',
      'None of this is an argument for scarcity. Resources help. But the useful question early on is rarely *what else do we need* — it is *what would this look like if we could only do one thing*. That answer tends to be the project.',
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
