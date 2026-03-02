---
title: Sponsorships
description: Understand how tscircuit contributor sponsorships are awarded
---

tscircuit automatically sponsors regular contributors based on the impact of
their work. This activity is tracked in the open-source
[contribution-tracker](https://github.com/tscircuit/contribution-tracker),
which powers [contributions.tscircuit.com](https://contributions.tscircuit.com)
and resets every Wednesday.

## How the contribution tracker works

- Every PR across the tscircuit GitHub org is scanned and summarized via an LLM
  so we can consistently understand the scope of each change.
- The LLM classifies each diff/PR into attributes such as **🐳 Major**,
  **🐙 Minor**, and **🐌 Tiny** impact levels and assigns a star rating that feeds
  the weekly score shown on the sponsorship leaderboard.
- The resulting data is organized into the sections you see on the tracker—such
  as Contributor Overview, PRs by Repository, and PRs by Contributor—so you can
  quickly understand where impactful work is happening across the ecosystem.
- Historical exports, including weekly contribution overviews and AI-generated
  monthly changelogs, are kept directly in the
  [contribution-tracker repo](https://github.com/tscircuit/contribution-tracker)
  if you want to dig deeper into past activity.

**The best way to increase sponsorship eligibility is to consistently contribute
high-impact improvements.** A great approach is to actively use tscircuit,
report confusing or buggy behavior, and submit fixes for the issues you uncover.
Contributors who repeatedly do this tend to build deep product context and
deliver meaningful improvements over time.

## How sponsorship amounts are calculated

Sponsorship payouts are based on the last four weeks of star ratings captured by
the tracker. The algorithm takes the median, minimum, and maximum weekly star
counts to decide on a base amount—ranging from $15 for occasional stars up to
$500 for consistently high-impact weeks—with a $5 safety net for anyone whose
historical high score stays above 3. You can read the current logic directly in
[`getSponsorshipAmount.ts`](https://github.com/tscircuit/contribution-tracker/blob/main/lib/scoring/getSponsorshipAmount.ts)
for the exact thresholds.

Maintainers receive an additional fixed monthly sponsorship on top of the weekly
calculation so their support stays stable. Those maintainer bonuses are defined
alongside the algorithm in the tracker codebase.

To be eligible for Github Sponsorship, you must be in a supported country and
have Github Sponsors enabled on your Github profile.
