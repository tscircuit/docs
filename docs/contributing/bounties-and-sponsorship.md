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

Monthly sponsorships use the completed contribution weeks whose end dates fall
in the target month. The tracker calculates the minimum, median, and maximum
weekly star counts, plus the highest raw weekly score from those weeks.

The first matching tier determines the base amount. Current star-based tiers
range from $30 to $700. If no star-based tier applies, a highest weekly score of
at least 3 qualifies for the $10 base tier. These are calculation rules, not a
guarantee that an individual contribution will receive payment.

Maintainers receive an additional monthly amount based on their maintainer
level. For the current thresholds and examples, see the
[sponsorship calculation explanation](https://github.com/tscircuit/contribution-tracker/blob/main/docs/sponsorship-calculation-explanation.md).
The source of truth is
[`getSponsorshipAmount.ts`](https://github.com/tscircuit/contribution-tracker/blob/main/lib/scoring/getSponsorshipAmount.ts);
[`generate-sponsorship-csv.ts`](https://github.com/tscircuit/contribution-tracker/blob/main/scripts/generate-sponsorship-csv.ts)
selects the weeks and prepares the monthly payout data.

To be eligible for Github Sponsorship, you must be in a supported country and
have Github Sponsors enabled on your Github profile.
