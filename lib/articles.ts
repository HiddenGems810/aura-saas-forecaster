export type ArticleSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: ArticleSection[];
  related: string[];
  sources?: { label: string; href: string }[];
};

const baseLearnArticles: LearnArticle[] = [
  {
    slug: 'what-is-mrr',
    title: 'What Is MRR? Formula, Examples, and SaaS Use Cases',
    description: 'Learn how monthly recurring revenue works, how to calculate MRR, and how SaaS founders use MRR to forecast growth.',
    updated: '2026-04-28',
    related: ['mrr-vs-arr', 'churn-rate', 'saas-growth-model'],
    sections: [
      {
        heading: 'What MRR Means',
        body: [
          'Monthly recurring revenue, usually shortened to MRR, is the predictable subscription revenue a SaaS company expects to earn in a month from active recurring plans. It excludes one-time setup fees, consulting projects, hardware sales, and other non-recurring charges because those items do not repeat reliably in the next month.',
          'MRR matters because it turns a messy set of invoices into a consistent operating metric. A founder can compare January to February, measure whether acquisition is outpacing cancellations, and build a forecast from a stable base. If your business has monthly and annual contracts, MRR normalizes both into a monthly number so the model does not overstate revenue in the month an annual invoice is collected.',
        ],
      },
      {
        heading: 'MRR Formula',
        body: [
          'The basic formula is: MRR = sum of monthly recurring subscription revenue from active customers.',
          'For a simple plan-based business, you can also calculate MRR as: MRR = active customers x average monthly subscription price. That shortcut is helpful for early models, but detailed SaaS reporting usually separates MRR into new, expansion, contraction, and churned components.',
        ],
        bullets: [
          'New MRR: recurring revenue from new customers added during the month.',
          'Expansion MRR: additional recurring revenue from upgrades, extra seats, add-ons, or usage growth.',
          'Contraction MRR: recurring revenue lost when existing customers downgrade or reduce usage.',
          'Churned MRR: recurring revenue lost when customers cancel.',
          'Net new MRR: new MRR + expansion MRR - contraction MRR - churned MRR.',
        ],
      },
      {
        heading: 'Worked Example',
        body: [
          'Assume a SaaS company starts March with $20,000 in MRR. During March it adds $4,000 of new MRR, earns $1,200 in expansion MRR from account upgrades, loses $600 to downgrades, and loses $1,500 to cancellations. Net new MRR is $4,000 + $1,200 - $600 - $1,500, or $3,100. Ending MRR is $23,100.',
          'This breakdown is more useful than saying revenue grew by $3,100 because it shows the quality of the growth. A company adding $8,000 of new MRR but losing $4,900 to churn has a different operating problem than a company adding $3,000 of new MRR and expanding existing accounts by $100. Both can land near the same net result, but the next management action is different.',
        ],
      },
      {
        heading: 'How Aura Revenue Uses MRR',
        body: [
          'Aura Revenue uses starting MRR as the base of the forecast. Each projected month begins with the previous month ending MRR, adds growth based on the monthly growth assumption, subtracts churn based on the monthly churn assumption, and then annualizes ending MRR into ARR for reference.',
          'The calculator is intentionally educational. It does not claim to know your actual pipeline, renewal schedule, discounting, payment failures, or expansion mix. It gives founders and operators a clean way to test how MRR, growth, and churn interact over time. Try the SaaS MRR calculator with your own assumptions, then compare the result with the churn and forecast articles linked below.',
        ],
      },
    ],
  },
  {
    slug: 'mrr-vs-arr',
    title: 'MRR vs ARR: How SaaS Founders Should Use Both',
    description: 'Understand the difference between MRR and ARR, when each SaaS metric is useful, and common mistakes in recurring revenue reporting.',
    updated: '2026-04-28',
    related: ['what-is-mrr', 'saas-growth-model', 'net-revenue-retention'],
    sections: [
      {
        heading: 'Definitions',
        body: [
          'MRR is monthly recurring revenue. It shows the recurring subscription revenue a SaaS company expects in a normal month. ARR is annual recurring revenue. It expresses the same recurring revenue base on an annualized basis.',
          'The core conversion is straightforward: ARR = MRR x 12. A company with $50,000 in MRR has $600,000 in ARR if the monthly run rate continues. The formula is simple, but the interpretation requires discipline because annualizing a monthly run rate is not the same as guaranteeing twelve months of collections.',
        ],
      },
      {
        heading: 'When MRR Is More Useful',
        body: [
          'MRR is usually better for operating the business week to week and month to month. It responds quickly to new sales, downgrades, cancellations, and pricing changes. A founder reviewing acquisition channels, onboarding problems, or churn spikes needs monthly visibility because waiting for annual numbers hides the issue.',
          'MRR is also useful for short-cycle SaaS products with monthly plans, self-serve signups, lower contract values, or product-led growth. In these businesses, revenue movement can be meaningful inside a single month, and a monthly forecast gives operators a tighter feedback loop.',
        ],
      },
      {
        heading: 'When ARR Is More Useful',
        body: [
          'ARR is useful when communicating the scale of a recurring revenue business. Investors, lenders, acquirers, and annual planning processes often use ARR because it gives a bigger-picture view of the subscription base. ARR is also natural for enterprise SaaS companies that sell annual contracts.',
          'For example, if a customer signs a $24,000 annual subscription, the normalized MRR is $2,000 and the ARR contribution is $24,000. You should not count the full $24,000 as MRR in the signing month. Doing that would make the month look unusually strong and the following months look weak even though the subscription economics are stable.',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'The most common mistake is mixing bookings, billings, revenue, MRR, and ARR as if they are interchangeable. A signed contract, an invoice, a cash payment, and recognized revenue are different accounting and operating events. Aura Revenue focuses on recurring revenue run-rate modeling, not GAAP revenue recognition.',
          'Another mistake is annualizing temporary spikes. If a launch promotion produces $10,000 of one-time services revenue, that should not become $120,000 of ARR. Likewise, if an annual invoice is paid upfront, normalize it into monthly recurring revenue before using it in a forecast.',
          'Use MRR to understand the monthly motion. Use ARR to communicate annualized scale. Use both with clear definitions so your forecast does not drift into wishful thinking.',
        ],
      },
    ],
  },
  {
    slug: 'churn-rate',
    title: 'SaaS Churn Rate: Formula, Benchmarks, and Reduction Tactics',
    description: 'Learn how SaaS churn works, how to calculate churn rate, and why churn can dramatically change long-term revenue forecasts.',
    updated: '2026-04-28',
    related: ['what-is-mrr', 'net-revenue-retention', 'saas-benchmarks'],
    sources: [
      { label: 'ChartMogul SaaS retention research', href: 'https://chartmogul.com/reports/saas-retention-the-new-normal/' },
      { label: 'Recurly State of Subscriptions', href: 'https://www.recurly.com/resources/report/state-of-subscriptions-churn' },
    ],
    sections: [
      {
        heading: 'Customer Churn and Revenue Churn',
        body: [
          'Churn measures loss. Customer churn counts lost customers. Revenue churn counts lost recurring revenue. A SaaS business needs both because losing one $2,000 per month account is different from losing ten $20 per month accounts, even if customer churn tells the opposite story.',
          'Customer churn rate = customers lost during the period / customers at the start of the period. Revenue churn rate = churned MRR during the period / starting MRR. Many teams also track gross revenue retention and net revenue retention to include downgrades and expansion more precisely.',
        ],
      },
      {
        heading: 'Why Churn Compounds',
        body: [
          'Churn is not a one-time subtraction. It lowers the base that every future month compounds from. If a company starts with $10,000 MRR, grows 8% per month, and churns 2% per month, the net monthly movement is roughly positive 6% before rounding and timing details. If churn rises to 6%, the same acquisition effort produces only about 2% net movement.',
          'Over twelve months, that gap is large. Starting at $10,000 MRR with 8% growth and 2% churn produces about $20,121 MRR by month twelve in a simple monthly model. With 8% growth and 6% churn, month twelve is about $12,682. The business did the same gross growth work, but the leak absorbed most of the compounding.',
        ],
      },
      {
        heading: 'Tactics That Usually Improve Retention',
        body: [
          'Retention work starts before cancellation. The highest-leverage improvements often happen in onboarding, activation, customer success, and product packaging. A customer who reaches a meaningful first outcome in the first week is usually easier to retain than one who needs to rediscover value months later.',
        ],
        bullets: [
          'Measure churn by cohort, plan, acquisition source, company size, and use case instead of relying only on blended churn.',
          'Define the activation event that predicts retention, then redesign onboarding around reaching it quickly.',
          'Separate voluntary churn from involuntary churn caused by failed payments, expired cards, or billing errors.',
          'Review downgrade reasons and cancellation notes every month; they are product strategy inputs, not just support tickets.',
          'Use annual plans carefully. They can improve cash flow and reduce monthly cancellation noise, but they do not fix weak product value.',
        ],
      },
      {
        heading: 'How to Use Churn in Aura Revenue',
        body: [
          'Enter your best estimate of monthly revenue churn in the calculator. If you only know annual churn, convert it cautiously instead of dividing by twelve blindly. A simple directional conversion is monthly churn = 1 - (1 - annual churn)^(1/12).',
          'Run at least three scenarios: current churn, a realistic improvement, and a downside case. The purpose is not to predict the future perfectly. The purpose is to see whether your growth plan remains durable if churn moves against you.',
        ],
      },
    ],
  },
  {
    slug: 'net-revenue-retention',
    title: 'Net Revenue Retention: Why Expansion Revenue Changes the Model',
    description: 'Learn the NRR formula, how expansion revenue offsets churn, and why net revenue retention matters in SaaS forecasting.',
    updated: '2026-04-28',
    related: ['churn-rate', 'saas-growth-model', 'saas-benchmarks'],
    sources: [
      { label: 'High Alpha 2024 SaaS Benchmarks', href: 'https://www.highalpha.com/saas-benchmarks/2024' },
      { label: 'ChartMogul benchmarks methodology', href: 'https://help.chartmogul.com/hc/en-us/articles/12112768447004-Benchmarks' },
    ],
    sections: [
      {
        heading: 'What NRR Measures',
        body: [
          'Net revenue retention, or NRR, measures how much recurring revenue remains from an existing customer cohort after expansion, contraction, and churn. It ignores new customers so you can see whether the installed base is growing or shrinking on its own.',
          'The formula is: NRR = (starting MRR + expansion MRR - contraction MRR - churned MRR) / starting MRR. Multiply the result by 100 to express it as a percentage.',
        ],
      },
      {
        heading: 'Example Above 100 Percent',
        body: [
          'Suppose a customer cohort begins the year with $100,000 in MRR. During the year, customers upgrade for $18,000 of expansion MRR, downgrade by $5,000, and cancel $7,000. Ending retained revenue from that original cohort is $106,000. NRR is 106%.',
          'An NRR above 100% means existing customers are expanding enough to offset downgrades and cancellations. That does not mean the business is guaranteed to grow, because new customer acquisition, pricing, margins, and costs still matter. It does mean the revenue base is healthier than a business that must replace lost MRR before it can grow.',
        ],
      },
      {
        heading: 'Why NRR Changes Forecasting',
        body: [
          'A simple MRR model with one growth input and one churn input is easier to understand, but real SaaS growth often comes from a mix of new customers and existing account expansion. Strong NRR can make growth more capital efficient because some new revenue comes from customers you already acquired.',
          'Low NRR creates the opposite problem. The sales team may add impressive new bookings while the installed base quietly contracts. In that case, a top-line forecast can look healthy until renewal pressure catches up. Operators should compare gross new MRR with churned and contracted MRR every month.',
        ],
      },
      {
        heading: 'NRR and Valuation Context',
        body: [
          'Investors and acquirers pay attention to NRR because it says something about product value, account expansion, customer success, and revenue durability. Benchmark reports often segment NRR by company size, contract value, market, and stage, so a single universal target is not responsible guidance.',
          'Use benchmark data as directional context only. A $29 per month self-serve SaaS product and a $60,000 per year enterprise workflow platform can have very different retention patterns. Aura Revenue keeps the public calculator simple, but the methodology page explains how to interpret churn and growth assumptions when expansion revenue is part of the story.',
        ],
      },
    ],
  },
  {
    slug: 'saas-growth-model',
    title: 'How to Build a SaaS Revenue Forecast',
    description: 'Build a practical SaaS revenue forecast using starting MRR, growth, churn, expansion, pricing, and scenario planning.',
    updated: '2026-04-28',
    related: ['what-is-mrr', 'churn-rate', 'net-revenue-retention'],
    sections: [
      {
        heading: 'Start With the Components',
        body: [
          'A useful SaaS forecast begins with a few inputs that the team can explain. The basic components are starting MRR, new MRR, expansion MRR, contraction MRR, churned MRR, pricing assumptions, and forecast period. More advanced models add acquisition channels, sales capacity, payment failures, renewals, implementation fees, and customer segments.',
          'The danger is building a model that looks precise but hides weak assumptions. A forecast should make assumptions visible. If growth depends on doubling paid acquisition, the model should say so. If churn improves because onboarding gets better, the model should show how much improvement is required.',
        ],
      },
      {
        heading: 'Simple Monthly Model',
        body: [
          'A simple model starts each month with starting MRR. It adds new recurring revenue, adds expansion revenue, subtracts downgrades, subtracts churn, and produces ending MRR. Ending MRR then becomes the next month starting MRR. ARR is ending MRR x 12.',
          'Example: a company starts with $15,000 MRR, expects $2,000 new MRR per month, $500 expansion MRR, $250 contraction MRR, and $600 churned MRR. Ending MRR for the first month is $16,650. The next month starts from $16,650. The arithmetic is simple, but repeating it month by month shows whether growth is actually compounding.',
        ],
      },
      {
        heading: 'Scenario Planning',
        body: [
          'Build at least three scenarios. The conservative scenario should reflect slower acquisition and higher churn than you want. The base scenario should reflect what the current business can plausibly execute. The aggressive scenario should show what happens if the team improves conversion, pricing, expansion, and retention.',
          'Scenario planning is useful because SaaS forecasts are sensitive. A one-point change in monthly churn can materially change a multi-year projection. A small improvement in activation can increase expansion later. The goal is not to pick the most exciting curve. The goal is to identify the assumptions that deserve management attention.',
        ],
      },
      {
        heading: 'Using Aura Revenue',
        body: [
          'Aura Revenue intentionally uses four public inputs: starting MRR, monthly growth, monthly churn, and time horizon. That makes it fast for founders, creators, and small software teams to understand the relationship between growth and retention before building a more detailed spreadsheet.',
          'Use the calculator first to test the shape of the revenue curve. Then use the free SaaS revenue forecast template to build a month-by-month operating version with new MRR, expansion MRR, churned MRR, and ARR columns. The methodology page explains what the calculator includes and what it leaves out.',
        ],
      },
    ],
  },
  {
    slug: 'saas-benchmarks',
    title: 'SaaS Growth and Churn Benchmarks: What Is Realistic?',
    description: 'Learn how to interpret SaaS growth, churn, and retention benchmarks responsibly without treating averages as guarantees.',
    updated: '2026-04-28',
    related: ['churn-rate', 'net-revenue-retention', 'saas-growth-model'],
    sources: [
      { label: 'High Alpha 2024 SaaS Benchmarks Report', href: 'https://www.highalpha.com/saas-benchmarks/2024' },
      { label: 'SaaS Capital 2025 private B2B SaaS growth benchmarks', href: 'https://www.saas-capital.com/research/private-saas-company-growth-rate-benchmarks/' },
      { label: 'KeyBanc Capital Markets private SaaS survey announcement', href: 'https://investor.key.com/press-releases/news-details/2024/PRIVATE-SAAS-COMPANY-SURVEY-REVEALS-SHIFT-TOWARDS-FUTURE-GROWTH-WITH-A-CONTINUED-FOCUS-ON-OPERATIONAL-EFFICIENCY-AND-PROFITABILITY/default.aspx' },
      { label: 'ChartMogul SaaS retention research', href: 'https://chartmogul.com/reports/saas-retention-the-new-normal/' },
    ],
    sections: [
      {
        heading: 'Benchmarks Are Context, Not Targets',
        body: [
          'SaaS benchmarks vary by company stage, pricing model, average contract value, customer segment, market category, and funding strategy. A bootstrapped vertical SaaS company selling $300 per month plans should not blindly compare itself with a venture-backed enterprise platform selling six-figure annual contracts.',
          'The responsible way to use benchmarks is to ask better questions. Is churn high for our segment, or high because we acquired the wrong customers? Is growth slow because the market is saturated, or because onboarding and activation are weak? Is NRR low because customers do not expand, or because pricing does not scale with value?',
        ],
      },
      {
        heading: 'What Recent Sources Suggest',
        body: [
          'Recent SaaS benchmark sources continue to emphasize a shift from growth at any cost toward efficient growth, retention, and profitability. High Alpha and OpenView-style SaaS benchmark work has highlighted public SaaS revenue growth stabilizing far below the 2021 peak while net dollar retention remains a critical metric. SaaS Capital reports on private B2B SaaS growth using survey data from more than 1,000 companies, which is useful because private company patterns can differ from public market composites.',
          'ChartMogul retention research is useful for subscription operators because it segments retention behavior and shows why stage, ARPA, and customer profile matter. KeyBanc Capital Markets and Sapphire Ventures also publish private SaaS survey work focused on financial and operating performance. None of these sources should be treated as a promise for your business. They are reference points.',
        ],
      },
      {
        heading: 'How to Apply Ranges Carefully',
        body: [
          'If a benchmark report says a segment has a median growth rate or median NRR, do not paste that number into your forecast without checking whether your business resembles the sample. A company with annual contracts may show lower monthly logo churn than a month-to-month self-serve product. A usage-based product may expand faster in strong accounts but contract faster when customer usage drops.',
          'For internal planning, use benchmarks as guardrails. If your model assumes 12% monthly growth for five years, write down the acquisition engine that makes that possible. If your model assumes 1% monthly churn, check whether your current cohorts support it. A forecast is only as reliable as its assumptions.',
        ],
      },
      {
        heading: 'Benchmarks Inside Aura Revenue',
        body: [
          'Aura Revenue avoids claiming that one churn rate or growth rate is universally good. The calculator lets you test your own assumptions, then the Learn section explains how to interpret MRR, churn, NRR, and forecast mechanics. When benchmark claims appear on Aura Revenue, they should be source-linked and framed as directional context.',
          'The safest operating habit is to maintain your own benchmark history: current month, trailing three months, trailing twelve months, and cohorts by signup period. External benchmarks help you see the market. Internal benchmarks help you manage the business.',
        ],
      },
    ],
  },
  {
    slug: 'reduce-saas-churn',
    title: 'How to Reduce SaaS Churn Before It Breaks Your Forecast',
    description: 'Practical ways to reduce SaaS churn through better activation, customer fit, billing recovery, product usage signals, and retention operations.',
    updated: '2026-04-28',
    related: ['churn-rate', 'net-revenue-retention', 'saas-growth-model'],
    sections: [
      {
        heading: 'Churn Reduction Starts With Diagnosis',
        body: [
          'Reducing churn is not one tactic. It is a diagnosis process. A SaaS company first needs to understand why customers leave, which customers leave, when they leave, and whether the lost revenue is concentrated in specific segments. A blended churn rate can hide the real problem. Enterprise accounts may retain well while self-serve trials cancel quickly, or one acquisition channel may create most of the churn.',
          'Start by splitting churn into voluntary churn, involuntary churn, contraction, and non-renewal. Voluntary churn happens when a customer chooses to cancel. Involuntary churn happens when a payment fails or billing details expire. Contraction happens when a customer downgrades or reduces usage. Non-renewal is common in annual contracts and often reflects value, budget, champion, or procurement issues.',
        ],
      },
      {
        heading: 'Improve Activation Before Fighting Cancellations',
        body: [
          'Most churn reduction work should happen before the cancellation screen. The first question is whether customers reach the outcome they paid for. A project management product might define activation as creating a workspace, inviting two teammates, and completing the first project. A reporting product might define activation as connecting a data source and scheduling the first stakeholder report.',
          'Once activation is defined, measure time to activation and activation rate by cohort. Customers who do not activate are usually at higher churn risk because they never develop the usage habit or internal proof that the product is worth paying for. Improving onboarding, templates, lifecycle emails, in-app guidance, and customer success handoffs can reduce churn without changing the core product.',
        ],
      },
      {
        heading: 'Use Product Signals',
        body: [
          'SaaS retention is often visible in product usage before it appears in revenue. Declining logins, fewer active users, missing integrations, failed imports, reduced usage, or fewer completed workflows can indicate risk. The specific signals depend on the product, but every team should know which behaviors predict renewal and expansion.',
          'Create simple health bands before building a complicated scoring system. For example: healthy customers use the product weekly, have more than one active user, and have completed the key workflow in the past 30 days. At-risk customers have declining usage or only one internal champion. Critical customers have no recent usage and an upcoming renewal.',
        ],
        bullets: [
          'Review cancellation reasons monthly and tag them consistently.',
          'Track activation cohorts separately from all-customer churn.',
          'Create a billing recovery flow for failed cards and expired payment methods.',
          'Offer downgrade paths when price is the issue but the customer still has a real use case.',
          'Close the loop with product changes when churn reasons repeat.',
        ],
      },
      {
        heading: 'Connect Churn Work to Forecasting',
        body: [
          'A churn initiative should eventually show up in the forecast. If monthly revenue churn falls from 4% to 2.5%, the same acquisition plan produces a different MRR curve. Aura Revenue lets you test that sensitivity quickly: keep starting MRR and growth constant, then adjust churn in small increments to see how much retention changes the forecast.',
          'Do not assume churn improvements immediately. If onboarding changes affect new cohorts first, older cohorts may still churn at the previous rate for several months. A disciplined forecast separates current baseline churn, expected improvement, and timing. That prevents the retention plan from becoming an unsupported optimistic assumption.',
        ],
      },
    ],
  },
  {
    slug: 'saas-pricing-strategy',
    title: 'SaaS Pricing Strategy: How Price Changes Affect MRR',
    description: 'Learn how SaaS pricing strategy affects MRR, expansion revenue, churn risk, forecast assumptions, and recurring revenue quality.',
    updated: '2026-04-28',
    related: ['what-is-mrr', 'mrr-vs-arr', 'expansion-revenue'],
    sections: [
      {
        heading: 'Pricing Is a Forecast Input',
        body: [
          'Pricing strategy directly affects MRR because every new customer, upgrade, downgrade, and renewal flows through price. A $20 product and a $200 product can both have 100 customers, but they create very different revenue bases and support very different acquisition economics. Forecasting without pricing clarity usually leads to weak assumptions.',
          'The first decision is what your price scales with. Seat-based pricing scales with team adoption. Usage-based pricing scales with consumption. Tiered pricing scales with feature access or packaging. Flat pricing is simple but may fail to capture more value from larger customers. The right model depends on how customers experience value and how predictable they need their bill to be.',
        ],
      },
      {
        heading: 'Price Changes and New MRR',
        body: [
          'Raising price for new customers can increase new MRR without increasing customer count. For example, if a company adds 40 customers per month at $50, new MRR is $2,000. If the same conversion volume holds at $65, new MRR becomes $2,600. That extra $600 compounds if churn does not worsen.',
          'The risk is that conversion rate may fall. A responsible forecast should test both sides: higher average revenue per account and possible lower signup volume. If a price increase raises average subscription price by 30% but reduces conversion by 10%, new MRR can still improve. If conversion falls by 45%, the model may get worse.',
        ],
      },
      {
        heading: 'Price Changes and Existing Customers',
        body: [
          'Existing customer price changes require more care. They can create expansion MRR, but they can also create churn, support burden, and trust issues if the value story is weak. Many SaaS teams grandfather older customers, raise prices only at renewal, or tie price changes to new packaging and product value.',
          'When modeling an existing-customer price change, separate the base into affected and unaffected customers. Estimate expansion MRR from the increase, then estimate additional churn risk. A forecast that includes price expansion but ignores cancellation risk is incomplete.',
        ],
      },
      {
        heading: 'Practical Pricing Questions',
        body: [
          'Pricing strategy should answer practical questions before it enters the forecast. Which segment is underpriced? Which features are creating measurable value? Which customers would naturally expand? Which discounts are training customers to wait? Which plan has the highest churn?',
          'Use Aura Revenue for directional scenarios, then use the template to model pricing changes with more detail. A simple calculator can show the compounding effect of higher growth or lower churn. A spreadsheet should show the operational mechanism: plan mix, expected conversion, expansion, contraction, churn, and renewal timing.',
        ],
      },
    ],
  },
  {
    slug: 'expansion-revenue',
    title: 'Expansion Revenue: How Upsells and Add-ons Improve SaaS Forecasts',
    description: 'Understand expansion revenue, upsells, add-ons, seats, usage, and how existing customer growth improves SaaS forecast quality.',
    updated: '2026-04-28',
    related: ['net-revenue-retention', 'saas-pricing-strategy', 'saas-growth-model'],
    sections: [
      {
        heading: 'What Expansion Revenue Means',
        body: [
          'Expansion revenue is additional recurring revenue from existing customers. It can come from seat growth, higher usage, paid add-ons, feature upgrades, extra workspaces, premium support, or moving from a lower tier to a higher tier. Expansion MRR is important because it grows revenue without requiring a completely new customer acquisition event.',
          'Expansion revenue is not the same as services revenue or a one-time fee. If a customer pays once for onboarding, that should not be counted as expansion MRR. If the customer upgrades from $300 per month to $500 per month, the additional $200 is expansion MRR.',
        ],
      },
      {
        heading: 'Why Expansion Improves Forecast Quality',
        body: [
          'A SaaS business that grows only through new customers must keep replacing churn before it creates net growth. A business with healthy expansion can grow inside the installed base. That usually makes the forecast more durable because some growth comes from customers who already understand the product and have already passed procurement or payment setup.',
          'Expansion also reveals whether pricing aligns with value. If larger or more successful customers naturally pay more over time, the model can support net revenue retention above 100%. If customers rarely expand, the business may still be healthy, but the forecast depends more heavily on new customer acquisition.',
        ],
      },
      {
        heading: 'Common Expansion Motions',
        body: [
          'Seat expansion works when more users in the customer organization create more value. Usage expansion works when value scales with volume, such as processed records, messages, storage, or transactions. Add-on expansion works when customers adopt advanced capabilities after the core product becomes part of their workflow.',
          'The best expansion motions feel like a natural next step, not a penalty. Customers expand because the product is solving a larger problem for them. If expansion is driven only by confusing limits or surprise fees, it can increase short-term MRR while harming trust and retention.',
        ],
        bullets: [
          'Track expansion MRR separately from new MRR.',
          'Measure which features or milestones predict expansion.',
          'Avoid hiding contraction inside expansion totals; show both.',
          'Connect upsell timing to customer value milestones, not just contract dates.',
          'Use NRR to evaluate whether expansion offsets churn and downgrades.',
        ],
      },
      {
        heading: 'Modeling Expansion in a Forecast',
        body: [
          'The public Aura Revenue calculator uses a simple growth rate input. That growth rate can represent a combined view of new MRR and expansion MRR if you are building a quick scenario. For a more precise model, use the template and split growth into new MRR and expansion MRR columns.',
          'A good expansion forecast should explain what causes expansion. For example, a company might assume 20% of customers add seats after month three, or that usage expansion appears after customers connect a second data source. Those assumptions are stronger than simply typing a higher growth rate into a model without an operating reason.',
        ],
      },
    ],
  },
  {
    slug: 'saas-cac-payback',
    title: 'SaaS CAC Payback: Formula and Forecasting Example',
    description: 'Learn the CAC payback formula, how gross margin changes the calculation, and how founders can use payback periods in SaaS forecasts.',
    updated: '2026-04-28',
    related: ['saas-growth-model', 'saas-burn-multiple', 'rule-of-40-saas', 'what-is-mrr'],
    sections: [
      {
        heading: 'What CAC Payback Measures',
        body: [
          'CAC payback estimates how long it takes a SaaS company to recover the sales and marketing cost required to acquire a customer. The metric is useful because growth can look healthy on an MRR chart while the cash required to create that growth is too heavy for the business model.',
          'A short payback period means each acquired customer returns acquisition cost relatively quickly through gross profit. A long payback period means the company waits longer before the customer becomes economically useful. Neither number is automatically good or bad without context. Enterprise products can have longer sales cycles and larger contracts. Self-serve products may need faster payback because they have lower average revenue per account.',
        ],
      },
      {
        heading: 'CAC Payback Formula',
        body: [
          'A common formula is: CAC payback period in months = customer acquisition cost / monthly gross profit from that customer. If you calculate payback for a cohort, use total sales and marketing spend for the cohort divided by new customers acquired, then divide by monthly gross profit per account.',
          'Gross margin matters. If a customer pays $500 per month and gross margin is 80%, monthly gross profit is $400. If acquisition cost is $2,400, payback is six months. If gross margin is only 50%, monthly gross profit is $250 and payback rises to 9.6 months. A revenue-only payback calculation can make the model look stronger than the cash economics really are.',
        ],
        bullets: [
          'CAC = sales and marketing cost required to acquire customers.',
          'Monthly gross profit = monthly recurring revenue x gross margin.',
          'CAC payback months = CAC / monthly gross profit.',
          'Use cohort data when possible instead of mixing old and new acquisition channels.',
        ],
      },
      {
        heading: 'Forecasting Example',
        body: [
          'Assume a bootstrapped SaaS company spends $6,000 in one month on content, outbound tools, and founder-led sales support. It acquires 20 customers at an average starting plan of $75 per month. Blended CAC is $300 per customer. If gross margin is 85%, monthly gross profit per customer is $63.75. CAC payback is about 4.7 months.',
          'That example looks healthy, but the forecast still needs churn. If many of those customers churn before month five, the payback calculation overstates the value of the acquisition channel. If customers expand after activation, the payback can improve. This is why CAC payback should be reviewed next to churn, activation, expansion MRR, and cohort retention.',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'The first mistake is using revenue instead of gross profit. Hosting, support, payment processing, infrastructure, and customer success costs affect how much subscription revenue actually contributes to recovering acquisition cost. The second mistake is averaging every customer together when channels behave differently. Paid search, affiliates, founder-led outbound, partnerships, and content can produce different conversion quality.',
          'Another mistake is ignoring time. A company can have good payback on paper but still face cash pressure if annual prepayments, delayed invoices, or high upfront sales costs create a timing gap. For early-stage teams, CAC payback is a planning signal, not a substitute for a cash forecast.',
        ],
      },
      {
        heading: 'How to Use CAC Payback With Aura Revenue',
        body: [
          'Aura Revenue does not ask for CAC directly because the public calculator focuses on recurring revenue movement. Use it to test the revenue curve first, then use CAC payback to decide whether the acquisition assumptions behind that curve are economically realistic.',
          'If your forecast assumes higher monthly growth, write down the acquisition cost required to create that growth and the payback period you expect. Then compare that with your churn assumptions. Growth that pays back slowly and churns quickly is fragile. Growth that pays back within a reasonable period and retains well is easier to fund and manage.',
        ],
      },
    ],
  },
  {
    slug: 'gross-revenue-retention-vs-net-revenue-retention',
    title: 'Gross Revenue Retention vs Net Revenue Retention',
    description: 'Understand the difference between GRR and NRR, how to calculate each metric, and why SaaS operators need both retention views.',
    updated: '2026-04-28',
    related: ['net-revenue-retention', 'churn-rate', 'expansion-revenue', 'saas-growth-model'],
    sections: [
      {
        heading: 'The Plain-English Difference',
        body: [
          'Gross revenue retention, or GRR, shows how much recurring revenue you keep from an existing customer cohort before counting expansion. Net revenue retention, or NRR, shows how much you keep after counting expansion, contraction, and churn. The difference matters because expansion can make a customer base look healthy even when some customers are downgrading or leaving.',
          'GRR answers a defensive question: how much revenue did we keep without upsells? NRR answers a broader question: did the existing customer base grow or shrink after all account movement? A SaaS team should usually track both because each metric catches a different risk.',
        ],
      },
      {
        heading: 'Formulas',
        body: [
          'GRR = (starting MRR - contraction MRR - churned MRR) / starting MRR. NRR = (starting MRR + expansion MRR - contraction MRR - churned MRR) / starting MRR. Multiply either result by 100 to express it as a percentage.',
          'Suppose a cohort starts with $100,000 in MRR. During the period, it expands by $12,000, contracts by $4,000, and churns $6,000. GRR is 90% because the cohort retained $90,000 before expansion. NRR is 102% because expansion raised retained revenue to $102,000 after all movement.',
        ],
        bullets: [
          'GRR excludes expansion MRR.',
          'NRR includes expansion MRR.',
          'Both calculations should use the same starting cohort.',
          'New customers acquired after the start date should not be included.',
        ],
      },
      {
        heading: 'Why Both Metrics Matter',
        body: [
          'A company with strong NRR and weak GRR may be expanding successful accounts while losing or shrinking others. That can still produce growth, but it can hide customer-fit problems. A company with strong GRR and modest NRR may retain customers well but lack natural expansion paths. That can be healthy for a simple product, but it limits growth from the installed base.',
          'For planning, GRR helps you understand the leak in the base. NRR helps you understand whether expansion offsets that leak. If your forecast depends on high NRR, the team needs a credible expansion motion. If your forecast depends on high GRR, the team needs strong onboarding, support, product value, and renewal discipline.',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'The most common mistake is calculating NRR with new customer revenue included. That turns retention into a growth metric and hides whether the original customer base retained value. Another mistake is treating NRR above 100% as proof that churn is no longer a problem. A company can have high NRR because a few large accounts expanded while many smaller accounts churned.',
          'Segment the metrics when possible. Enterprise customers, small businesses, annual contracts, monthly subscriptions, and usage-based plans can produce different retention patterns. Blended NRR is useful for a top-level dashboard, but segment-level GRR and NRR help teams decide what to fix.',
        ],
      },
      {
        heading: 'Using GRR and NRR in a Forecast',
        body: [
          'In Aura Revenue, you can approximate retention quality by changing the churn input and growth input. For a more detailed spreadsheet, split churned MRR, contraction MRR, and expansion MRR into separate columns. That structure lets you calculate GRR and NRR each month from the same customer cohort.',
          'Use GRR to pressure-test the downside case. Use NRR to test whether expansion can carry part of the growth plan. Both numbers should be treated as educational planning inputs, not guarantees of future revenue.',
        ],
      },
    ],
  },
  {
    slug: 'saas-burn-multiple',
    title: 'SaaS Burn Multiple: What Founders Should Track',
    description: 'Learn what burn multiple means, how to calculate it, and how it connects revenue growth with cash efficiency in SaaS planning.',
    updated: '2026-04-28',
    related: ['saas-cac-payback', 'rule-of-40-saas', 'saas-growth-model', 'saas-benchmarks'],
    sections: [
      {
        heading: 'What Burn Multiple Means',
        body: [
          'Burn multiple compares net cash burned with net new recurring revenue. It is a capital efficiency metric. A SaaS company can grow quickly and still be inefficient if it burns too much cash for each dollar of net new ARR. Burn multiple helps founders see whether growth is becoming more or less expensive.',
          'The metric is most relevant for companies that are spending more cash than they generate. Bootstrapped companies can still use the concept, but they may focus more on operating cash flow, founder time, and payback periods because they are not raising outside capital to fund burn.',
        ],
      },
      {
        heading: 'Burn Multiple Formula',
        body: [
          'Burn multiple = net burn / net new ARR for the same period. If a company burns $300,000 in a quarter and adds $150,000 of net new ARR, burn multiple is 2.0. That means the company spent two dollars of net cash burn for each dollar of net new ARR.',
          'Net burn should reflect cash used by the business during the period. Net new ARR should reflect the increase in annual recurring revenue run rate after churn, contraction, and expansion. Be consistent with timing. Mixing annualized revenue movement from one period with cash burn from another period will make the metric unreliable.',
        ],
        bullets: [
          'Use net burn, not total expenses, when calculating burn multiple.',
          'Use net new ARR, not gross bookings, for the revenue side.',
          'Calculate the metric over a consistent period such as a quarter.',
          'Interpret the number with stage, market, and growth strategy in mind.',
        ],
      },
      {
        heading: 'Example',
        body: [
          'Imagine a SaaS company starts the quarter at $800,000 ARR run rate and ends at $980,000 ARR run rate. Net new ARR is $180,000. During the same quarter, the company burns $270,000 in cash. Burn multiple is 1.5. If the company had burned $540,000 for the same ARR increase, burn multiple would be 3.0.',
          'The second case is not automatically bad if the company is investing in a proven growth engine and has enough runway, but it demands explanation. Is the burn caused by temporary hiring, one-time costs, longer sales cycles, or inefficient acquisition? The metric should prompt a management conversation, not a simplistic pass-or-fail judgment.',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'A common mistake is using gross new ARR instead of net new ARR. Gross new ARR ignores churn and contraction, so it can make growth efficiency look better than it is. Another mistake is comparing burn multiple across companies without context. A company with strong retention and large enterprise contracts may operate differently from a self-serve product in a crowded category.',
          'Founders should also avoid optimizing burn multiple so aggressively that they starve the product or go-to-market motion. Efficiency matters, but underinvesting can slow learning, support, and retention. The right question is whether each dollar of burn is building durable recurring revenue.',
        ],
      },
      {
        heading: 'Connecting Burn Multiple to Forecasting',
        body: [
          'Aura Revenue models recurring revenue movement, not operating expenses. Use it to estimate net new MRR and ARR run rate under different growth and churn assumptions. Then compare that revenue movement with your expected cash burn in a separate model.',
          'If improving churn creates more net new ARR than increasing acquisition spend, the business may have an efficiency opportunity. If growth requires higher burn and payback periods are long, the forecast should include runway pressure. Burn multiple is most useful when it connects the revenue curve to the cost of creating it.',
        ],
      },
    ],
  },
  {
    slug: 'rule-of-40-saas',
    title: 'Rule of 40 for SaaS: Simple Explanation',
    description: 'Understand the SaaS Rule of 40, why it combines growth and profitability, and how early founders should use it carefully.',
    updated: '2026-04-28',
    related: ['saas-burn-multiple', 'saas-cac-payback', 'saas-benchmarks', 'saas-growth-model'],
    sections: [
      {
        heading: 'What the Rule of 40 Says',
        body: [
          'The Rule of 40 is a shorthand SaaS metric that adds revenue growth rate and profit margin. If the total is 40 or higher, the business is often described as balancing growth and profitability well. For example, 30% annual growth plus 12% profit margin equals 42. A company growing 60% with a -20% margin also equals 40.',
          'The rule is not a law and it is not a guarantee of valuation, funding, or business quality. It is a simple lens for thinking about tradeoffs. Faster growth can justify lower profitability for some companies. Slower growth usually requires stronger profitability or efficiency to look durable.',
        ],
      },
      {
        heading: 'Formula and Example',
        body: [
          'Rule of 40 score = annual recurring revenue growth rate + profit margin. Some teams use EBITDA margin, some use free cash flow margin, and some use operating margin. The chosen margin should be labeled clearly because different definitions can change the score.',
          'Suppose a SaaS company grows ARR from $1,000,000 to $1,280,000 in a year. Annual ARR growth is 28%. If the company has a 6% operating margin, the Rule of 40 score is 34. If margin improves to 14% with the same growth, the score becomes 42. If growth rises to 38% while margin stays 6%, the score becomes 44.',
        ],
        bullets: [
          'Use annual growth, not one strong month annualized without context.',
          'Label the profit or cash-flow margin used in the calculation.',
          'Do not treat the score as a substitute for retention, payback, or runway analysis.',
          'Use the metric more cautiously for very early-stage companies.',
        ],
      },
      {
        heading: 'Why Early-Stage Founders Should Be Careful',
        body: [
          'The Rule of 40 can be noisy for small companies. A business growing from $2,000 MRR to $4,000 MRR has 100% growth, but the absolute dollars may still be too small to support payroll or paid acquisition. A founder-led company may show strong profitability because founder labor is underpaid or not counted fully.',
          'Early teams should use the metric as a conversation starter. What growth rate is realistic? What margin is possible after paying for support, infrastructure, product development, and acquisition? Does retention support the growth rate? Does CAC payback allow the company to keep investing?',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'The biggest mistake is optimizing for the Rule of 40 score while ignoring customer quality. A company can cut spending to improve margin, but if product quality, support, and retention suffer, the score may improve temporarily while long-term revenue gets weaker. Another mistake is using a one-month growth spike as if it represents annual growth.',
          'Be consistent with the measurement period. If you use trailing twelve-month growth, pair it with trailing twelve-month margin. If you use forward-looking growth, label it as a forecast and show the assumptions. A clean definition is more trustworthy than a flattering score.',
        ],
      },
      {
        heading: 'Using the Rule With Aura Revenue',
        body: [
          'Aura Revenue can help you understand the growth side of the Rule of 40. Enter current MRR, growth, churn, and forecast period to see how ARR run rate changes. Then compare the resulting growth scenario with a separate view of expenses and margin.',
          'Do not use a calculator output as a promise that the Rule of 40 will be reached. The output depends entirely on the assumptions entered. Treat it as an educational scenario, then validate growth, churn, pricing, and cost assumptions with real operating data.',
        ],
      },
    ],
  },
  {
    slug: 'mrr-forecasting-bootstrapped-saas-founders',
    title: 'MRR Forecasting for Bootstrapped SaaS Founders',
    description: 'A practical guide to forecasting MRR, churn, runway pressure, and growth tradeoffs when a SaaS business is bootstrapped.',
    updated: '2026-04-28',
    related: ['what-is-mrr', 'saas-growth-model', 'saas-cac-payback', 'reduce-saas-churn'],
    sections: [
      {
        heading: 'Why Bootstrapped Forecasts Are Different',
        body: [
          'Bootstrapped SaaS founders usually cannot hide weak economics behind repeated funding rounds. Forecasting has to connect recurring revenue, cash timing, founder capacity, support load, acquisition cost, and churn. A revenue curve that looks exciting but requires cash the business does not have is not a useful plan.',
          'The advantage is discipline. A bootstrapped forecast can stay closer to customer reality because the business has to learn what customers will pay, how long they stay, and which acquisition channels can work without excessive spend. The goal is not to make the largest possible spreadsheet. The goal is to see the few assumptions that control survival and growth.',
        ],
      },
      {
        heading: 'Start With a Conservative Base Case',
        body: [
          'Begin with current MRR, not a hoped-for number. Use actual churn if you have it. If you do not have enough customers for stable churn data, use a cautious range and update it as cohorts mature. Growth should be tied to a real motion such as content, founder-led outbound, partnerships, product-led referrals, or paid acquisition with a clear budget limit.',
          'For a bootstrapped founder, the base case should answer: can the business keep operating if growth is slower than expected and churn is slightly worse than expected? This is different from a pitch-deck forecast. It is a decision tool for hiring, spending, pricing, and product scope.',
        ],
      },
      {
        heading: 'Practical Example',
        body: [
          'Assume a founder starts at $6,000 MRR, grows 5% per month, and loses 2% to churn. Net movement is roughly positive 3% before details such as expansion and failed payments. In Aura Revenue, that scenario shows the shape of the recurring revenue curve. The founder can then test a second case with 7% growth and 2% churn, and a downside case with 3% growth and 4% churn.',
          'The most useful output is not only month 12 MRR. It is the sensitivity. If a one-point churn increase removes months of progress, retention work may matter more than adding another acquisition tactic. If growth barely changes without paid spend, the founder needs to know whether CAC payback supports the experiment.',
        ],
      },
      {
        heading: 'Common Mistakes',
        body: [
          'Bootstrapped founders often undercount their own time. Founder-led sales, support, onboarding, and content can look free in a spreadsheet, but they create capacity limits. If the model assumes the founder can close, support, build, and write at the same time, the growth rate may not be operationally realistic.',
          'Another mistake is ignoring plan mix. Ten customers at $20 per month behave differently from two customers at $100 per month, even if MRR is the same. Support load, churn behavior, payment failures, upgrade potential, and acquisition channels can vary by customer segment. A practical forecast eventually needs plan-level detail.',
        ],
      },
      {
        heading: 'A Simple Monthly Forecast Routine',
        body: [
          'At the end of each month, record starting MRR, new MRR, expansion MRR, contraction MRR, churned MRR, ending MRR, cash collected, refunds, failed payments, and major customer notes. Update the next three months with what you learned. Keep the long-range forecast, but do not let it distract from the next operating decision.',
          'Use Aura Revenue for fast scenario checks and the spreadsheet template for detailed planning. The calculator is useful when you need to answer one question quickly. The template is better when hiring, pricing, or runway decisions depend on the detail.',
        ],
      },
    ],
  },
];

const articleAdditions: Record<string, ArticleSection[]> = {
  'what-is-mrr': [
    {
      heading: 'How to Audit Your Own MRR',
      body: [
        'Start with a customer-level subscription export rather than a bank balance. For each active customer, record the plan, billing interval, monthly normalized subscription amount, discount, add-ons, and current status. Annual contracts should be divided by twelve. Quarterly contracts should be divided by three. One-time onboarding fees, consulting work, refunds, and taxes should stay outside MRR.',
        'Then reconcile the total against your billing system and accounting reports. A small difference may come from timing, coupons, trials, credits, or failed payments. Document how you handle each case. The goal is not to create the highest number. The goal is to create a number the team can use every month without arguing about definitions.',
        'Once you have clean MRR, build a simple monthly bridge: beginning MRR, new MRR, expansion MRR, contraction MRR, churned MRR, and ending MRR. This bridge lets you explain the business, not just report the result.',
      ],
      bullets: [
        'Exclude one-time services and setup fees.',
        'Normalize annual contracts into monthly recurring revenue.',
        'Track discounts and credits so gross and net MRR do not get mixed.',
        'Keep trials out of MRR until the customer becomes paid.',
      ],
    },
    {
      heading: 'MRR Decisions Founders Make',
      body: [
        'MRR should shape operating decisions. If new MRR grows but churned MRR grows faster, the founder should inspect onboarding, product fit, pricing, and acquisition quality. If expansion MRR rises, the founder should learn which customer milestones trigger upgrades. If contraction MRR increases, packaging or usage limits may need attention.',
        'MRR also helps with hiring and budget timing. A company at $8,000 MRR and one at $80,000 MRR may both grow 10% in a month, but the second business adds much more absolute recurring revenue. Forecasting with both percentage movement and dollar movement keeps the team grounded.',
        'Use the Aura Revenue calculator after you calculate your baseline. Enter current MRR, test current churn, then run a second case with the retention improvement you believe is possible. The spread between the two curves shows the value of improving the operating system behind the metric.',
      ],
    },
    {
      heading: 'Monthly Review Checklist',
      body: [
        'During a monthly review, ask four questions about MRR. Did new MRR come from the customers you expected? Did expansion come from healthy usage or from forced plan movement? Did churn come from poor fit, weak activation, pricing, missing features, or failed payments? Did ending MRR match the story your pipeline and product usage suggested?',
        'This habit keeps MRR connected to management work. A founder can assign owners to the movement: marketing owns qualified acquisition, sales owns conversion quality, product owns activation and value, customer success owns retention patterns, and finance owns definitions. Without that ownership, MRR becomes a scoreboard with no operating plan behind it.',
        'Save the monthly bridge. After six months, the trend line will show whether growth quality is improving or whether the same problems repeat under different totals.',
      ],
    },
  ],
  'mrr-vs-arr': [
    {
      heading: 'How to Report MRR and ARR Together',
      body: [
        'Use MRR for monthly operating reviews and ARR for scale context. In a board update or founder dashboard, show both numbers with definitions. A useful format is current MRR, current ARR run rate, net new MRR for the month, gross revenue retention, and net revenue retention. This gives the reader the current base and the movement inside that base.',
        'Avoid mixing ARR from signed contracts with ARR run rate from active subscriptions unless you label both. Booked ARR can include contracts that start later. Billed ARR can reflect upfront cash. ARR run rate reflects the current recurring base. Each number can be useful, but each answers a different question.',
        'When you forecast, calculate MRR first and derive ARR from ending MRR. This keeps the model month-by-month and avoids hiding churn inside a large annual number.',
      ],
      bullets: [
        'Use MRR to inspect recent growth and churn.',
        'Use ARR run rate to communicate current recurring scale.',
        'Separate bookings, billings, cash, and recognized revenue.',
        'Label annualized figures so readers do not treat them as guaranteed collections.',
      ],
    },
    {
      heading: 'Monthly and Annual Plan Example',
      body: [
        'Suppose one customer pays $100 per month and another pays $1,200 per year. Both contribute $100 MRR and $1,200 ARR run rate if both subscriptions are active. The annual customer may improve cash flow because the company receives payment upfront, but the normalized recurring revenue contribution is the same.',
        'Now suppose the annual customer cancels at renewal after twelve months. The MRR bridge should show churned MRR when the subscription ends, not when the customer originally paid. If you counted the full annual payment as revenue in the first month, your forecast would overstate the launch month and understate the following months.',
        'Aura Revenue keeps the model normalized. Enter the monthly equivalent of your recurring base, not the cash you collected this month. That makes MRR and ARR easier to compare across plan types.',
      ],
    },
    {
      heading: 'Board and Team Communication',
      body: [
        'When you share SaaS performance with a team, write the metric definition beside the number. A useful update might say: Current MRR is $42,000, which is active recurring subscription revenue normalized monthly. ARR run rate is $504,000, calculated as current MRR multiplied by twelve. Net new MRR was $3,800 after new, expansion, contraction, and churned MRR.',
        'This format prevents the most common misunderstanding: treating ARR run rate as revenue already earned. It also gives operators the monthly movement they need to act. A founder can celebrate a larger ARR number while still seeing whether new MRR quality, expansion, or churn needs attention.',
        'Use the same definitions in dashboards, investor updates, and planning docs. Consistency builds trust faster than a bigger-looking number.',
      ],
    },
  ],
  'churn-rate': [
    {
      heading: 'Diagnosing Churn by Segment',
      body: [
        'A blended churn rate gives a quick read, but it rarely tells you what to fix. Split churn by customer size, plan, acquisition channel, use case, billing interval, signup cohort, and activation status. If most churn comes from one plan or one channel, the solution may be packaging or marketing qualification rather than a broad product rewrite.',
        'Also separate logo churn from revenue churn. Losing many small customers can look alarming in logo churn while barely moving revenue. Losing a few large accounts can make logo churn look fine while damaging MRR. SaaS teams need both views because each points to different work.',
        'For early-stage teams, cancellation notes are not enough. Pair qualitative reasons with product behavior. A customer who says the product was too expensive may really mean they never reached activation. A customer who says they switched tools may have had missing integrations for months.',
      ],
      bullets: [
        'Review churn by cohort, plan, and source every month.',
        'Track voluntary churn separately from failed-payment churn.',
        'Compare churned accounts with activated accounts.',
        'Ask whether the lost customer was the right customer in the first place.',
      ],
    },
    {
      heading: 'Forecasting With Churn Ranges',
      body: [
        'Do not forecast churn as a single permanent truth. Use ranges. A current case might use your trailing three-month revenue churn. A downside case might add one or two percentage points. An improvement case should only reduce churn if you can name the operating change behind it.',
        'Churn changes slowly when annual contracts, renewal dates, or long implementation cycles are involved. If you improve onboarding in April, the effect may show first in new-customer cohorts, not the full customer base. A good forecast phases in retention improvements instead of applying them to every customer immediately.',
        'Run the Aura Revenue calculator with current churn, downside churn, and target churn. If the difference is large, retention deserves executive attention because it controls the base that every future growth month uses.',
      ],
    },
    {
      heading: 'A Simple 12-Month Churn Review',
      body: [
        'For a practical churn review, export twelve months of customers and group them by signup month. For each cohort, record starting customers, active customers, starting MRR, current MRR, churned MRR, contraction MRR, and expansion MRR. This view shows whether customers acquired recently retain better than older customers.',
        'Then read the cancellations from the largest revenue losses. A handful of high-value cancellations can teach more than a long list of tiny accounts. Look for patterns: missing integrations, weak onboarding, wrong buyer, poor support handoff, price shock, or internal champion loss.',
        'Turn the review into an action list. One item should reduce avoidable churn this month. One should improve activation for new customers. One should improve the product or packaging decision that created repeated loss.',
      ],
    },
  ],
  'net-revenue-retention': [
    {
      heading: 'NRR Inputs You Need',
      body: [
        'To calculate NRR, start with a fixed customer cohort and ignore new customers added after the start date. Record the cohort starting MRR, expansion MRR, contraction MRR, and churned MRR over the measurement period. The cohort boundary matters because adding new customers would hide whether existing customers are expanding or shrinking.',
        'Use revenue numbers, not customer counts. NRR answers a revenue question: how much recurring revenue did the original customer base retain after upgrades, downgrades, and cancellations? If you use customer counts, you are calculating retention behavior, not net revenue retention.',
        'The cleanest dashboard shows NRR next to gross revenue retention. Gross revenue retention excludes expansion and shows how much revenue remains before upsells. NRR includes expansion. Together, they show whether growth inside accounts is covering churn or whether churn is being masked by upsells.',
      ],
      bullets: [
        'Use a fixed starting cohort.',
        'Keep new customers out of the NRR calculation.',
        'Separate expansion from contraction.',
        'Compare NRR with gross revenue retention.',
      ],
    },
    {
      heading: 'How Operators Use NRR',
      body: [
        'NRR helps operators decide where growth comes from. If NRR is above 100%, the installed base grows before new sales. That can support more durable growth because customer success, product adoption, and pricing expansion contribute to revenue. If NRR is below 100%, the company must replace lost recurring revenue before it grows.',
        'NRR also reveals packaging issues. A product with strong usage growth but flat NRR may not have pricing that scales with customer value. A product with high contraction may have plan limits that push customers down instead of up. A product with high churn and high expansion may depend too much on a small set of successful accounts.',
        'When you use Aura Revenue, model NRR effects by adjusting growth and churn assumptions, then move to the template for a more precise split between new MRR, expansion MRR, contraction MRR, and churned MRR.',
      ],
    },
    {
      heading: 'NRR Review Questions',
      body: [
        'A useful NRR review asks why the installed base expanded or contracted. Did expansion come from more seats, higher usage, premium features, or price changes? Did contraction come from downgrades, lower usage, budget pressure, or customers moving to a smaller plan? Did churn concentrate in a plan, cohort, industry, or account size?',
        'NRR also belongs in product strategy. If customers expand after adopting a specific workflow, that workflow may deserve better onboarding and stronger packaging. If customers downgrade after hitting a confusing limit, the pricing page and in-app prompts may need revision.',
        'Treat NRR as a customer value signal, not just a finance metric. Revenue retention improves when customers keep finding reasons to use more of the product.',
      ],
    },
  ],
  'saas-growth-model': [
    {
      heading: 'Build the Forecast From Operating Drivers',
      body: [
        'A forecast is stronger when each number ties to an operating driver. New MRR can come from website conversion, sales demos, partner referrals, or outbound pipeline. Expansion MRR can come from seat growth, usage, add-ons, or tier upgrades. Churned MRR can come from customer fit, onboarding gaps, budget cuts, or competitive loss.',
        'Instead of entering a growth rate because it looks good, write the mechanism beside it. For example: 60 trials per month, 12% paid conversion, $180 average starting plan, and 10% of accounts upgrading after month three. That forecast can be challenged and improved. A plain 8% monthly growth assumption cannot.',
        'Keep the first model simple, then add detail where decisions depend on it. If hiring a salesperson depends on sales capacity, add pipeline and quota assumptions. If cash timing matters, add annual prepayments and monthly expenses. If retention is the main risk, add cohorts.',
      ],
      bullets: [
        'Tie new MRR to acquisition volume and conversion.',
        'Tie expansion MRR to customer usage or plan movement.',
        'Tie churn to observed cohorts and cancellation patterns.',
        'Document every assumption so future updates are easier.',
      ],
    },
    {
      heading: 'Review Cadence',
      body: [
        'Update the model every month after the revenue close. Replace assumptions with actual starting MRR, new MRR, expansion MRR, contraction MRR, and churned MRR. Then adjust future assumptions only where the business has new evidence.',
        'Look for variance, not just totals. If ending MRR matches the forecast but new MRR is lower and churn is also lower, the business performed differently than expected. That matters because the next month may depend on a different operating lever.',
        'Aura Revenue is useful for quick scenario work between full spreadsheet updates. Use it when you want to answer a focused question: what happens if churn improves one point, if growth slows, or if the forecast period extends from 24 to 60 months?',
      ],
    },
    {
      heading: 'Model Hygiene Rules',
      body: [
        'Keep one tab or page for assumptions. List each input, owner, source, and last update. If monthly growth comes from paid acquisition, link it to spend, conversion rate, and average starting subscription. If churn improves, link it to cohort evidence or a retention project. If pricing changes, record the date and affected customer segment.',
        'Separate actuals from projections. Actual months should lock after close. Future months should remain editable and clearly marked. This prevents accidental rewriting of history when the team wants the forecast to look cleaner.',
        'Finally, keep the model readable. A founder should be able to explain the forecast in five minutes. If the model is too complex to explain, it will be too complex to manage.',
      ],
    },
  ],
  'saas-benchmarks': [
    {
      heading: 'Choosing the Right Peer Set',
      body: [
        'Benchmarks only help when the peer set resembles your business. Segment by annual contract value, customer size, billing model, sales motion, product category, geography, and company stage. A self-serve product with low monthly price points will not behave like an enterprise workflow platform with annual contracts and customer success coverage.',
        'Stage matters. A company moving from $5,000 to $20,000 MRR can post high percentage growth from a small base. A company at $2 million ARR may grow more slowly while adding much more absolute revenue. Comparing only percentages can create the wrong conclusion.',
        'Use external benchmarks to frame questions, then use internal cohorts to make decisions. If your churn is worse than a benchmark, inspect whether the difference comes from customer profile, pricing, onboarding, product maturity, or measurement definitions.',
      ],
      bullets: [
        'Compare companies with similar ACV and sales motion.',
        'Check whether the benchmark uses logo churn or revenue churn.',
        'Separate early-stage percentage growth from mature absolute growth.',
        'Treat benchmark ranges as context, not targets.',
      ],
    },
    {
      heading: 'How Benchmarks Can Mislead Forecasts',
      body: [
        'A benchmark median can make a forecast look objective even when the business has no path to reach it. If your model uses a benchmark growth rate, write down the acquisition plan. If your model uses a benchmark churn rate, compare it with your last three cohorts. If the gap is large, the forecast needs an explanation.',
        'Benchmarks also lag market changes. Pricing pressure, funding conditions, category maturity, and buyer budgets can change before public reports catch up. Recent reports are better than old reports, but your own close-rate, retention, and expansion data should carry more weight.',
        'Aura Revenue links benchmark discussions to source material where claims are made. The calculator itself does not embed a universal good or bad number because SaaS performance depends on context.',
      ],
    },
    {
      heading: 'Benchmark Questions to Ask',
      body: [
        'Before using any benchmark, ask who was measured, when the data was collected, how the metric was defined, and whether the sample matches your company. A retention benchmark from enterprise annual contracts may not apply to a self-serve monthly product. A growth benchmark from venture-backed companies may not apply to a bootstrapped company optimizing cash flow.',
        'Also check whether the report uses median, average, top quartile, or blended public-company data. Averages can be pulled upward by outliers. Top-quartile data can be useful for ambition but dangerous as a base forecast. Median values may still hide large differences by segment.',
        'Write the source beside any benchmark you use in a model. If the source is weak or old, treat the number as a discussion prompt rather than an assumption.',
      ],
    },
  ],
  'reduce-saas-churn': [
    {
      heading: 'Retention Work by Customer Stage',
      body: [
        'New customers need activation. Expanding customers need more value paths. Mature customers need proof that the product remains important. Treating every customer with the same retention playbook wastes effort because the risk changes as the relationship matures.',
        'In the first 30 days, focus on setup, first value, and habit formation. From month two through month six, focus on deeper workflow adoption, integrations, team usage, and measurable outcomes. Near renewal, focus on executive proof, value recap, and expansion opportunities that make sense for the customer.',
        'Churn reduction also requires product decisions. If cancellation reasons repeat, the team should not leave them inside support notes. Prioritize the product fixes that remove the most common causes of failed activation or lost value.',
      ],
      bullets: [
        'Define activation and track it by signup cohort.',
        'Use health signals before cancellation risk appears.',
        'Create a renewal value recap for larger accounts.',
        'Turn repeated cancellation reasons into product work.',
      ],
    },
    {
      heading: 'Measuring Retention Progress',
      body: [
        'Measure retention progress with leading and lagging indicators. Leading indicators include activation rate, time to first value, weekly active accounts, integration completion, and support issue patterns. Lagging indicators include churned MRR, contraction MRR, gross revenue retention, and NRR.',
        'Avoid declaring victory from one good month. SaaS churn can move because of renewal timing, annual contracts, or a few large accounts. Review rolling three-month and six-month trends. Cohort views help you see whether newer customers retain better than older customers.',
        'Use Aura Revenue to translate retention work into forecast impact. If reducing churn by one point changes the long-term forecast more than increasing acquisition spend, the team has a clearer business case for retention work.',
      ],
    },
    {
      heading: 'Retention Operating Rhythm',
      body: [
        'Set a monthly retention meeting with product, customer success, support, and the founder or GM. Review new churned MRR, contraction MRR, cancellation reasons, failed-payment recovery, and account health for the largest customers. The meeting should end with decisions, not commentary.',
        'Pick a small number of retention projects at a time. Examples include reducing time to first value, adding an onboarding checklist, fixing a common integration gap, improving cancellation save offers, or creating a customer health view. Each project should have a metric and an owner.',
        'Retention compounds slowly, but the forecast impact can be large. The key is to connect the monthly churn number to concrete work that changes customer behavior.',
      ],
    },
  ],
  'saas-pricing-strategy': [
    {
      heading: 'Testing Price Changes Safely',
      body: [
        'A pricing change should start with a controlled test. New customers are easier to test than existing customers because there is no trust reset. Try new packaging, new plan names, or a higher entry price on a segment where value is clear. Watch conversion, activation, support load, refund requests, and early churn.',
        'For existing customers, explain the value, timing, and options. Some teams grandfather old plans. Some raise prices at renewal. Some pair price changes with new features or usage tiers. The right choice depends on customer expectations and how much the product has changed since the original price.',
        'Model the upside and downside before shipping the change. A price increase can lift MRR and still harm the business if churn rises, expansion slows, or support volume increases.',
      ],
      bullets: [
        'Test new pricing with new customers first when possible.',
        'Watch conversion and churn together, not price alone.',
        'Model price expansion and cancellation risk in the same sheet.',
        'Document which customer segment should pay more and why.',
      ],
    },
    {
      heading: 'Pricing Metrics to Track',
      body: [
        'Track average revenue per account, plan mix, discount rate, expansion MRR, contraction MRR, trial-to-paid conversion, and churn by plan. These metrics reveal whether pricing supports the growth model. A low entry price may increase signups while attracting customers who churn quickly. A high entry price may reduce volume while improving support economics.',
        'If usage or seats drive value, track whether customers expand as they become more successful. If they do not, the pricing model may not capture value. If customers downgrade often, plan boundaries may be confusing or poorly matched to customer needs.',
        'Aura Revenue can model the high-level effect of better pricing through the growth and churn inputs. Use the template when you need plan-level detail.',
      ],
    },
    {
      heading: 'Pricing Change Forecast Example',
      body: [
        'Assume a company adds 50 new customers per month at $40. New MRR is $2,000. If the company raises the entry plan to $55 and conversion falls from 50 customers to 42, new MRR becomes $2,310. The price increase still improves new MRR in this simple example, but the team must watch activation, support load, and early churn.',
        'Now add churn risk. If the higher price attracts better-fit customers, churn may stay flat or improve. If the price creates expectations the product cannot meet, churn may rise and erase the gain. That is why pricing experiments need retention follow-up, not just launch-week conversion analysis.',
        'A pricing forecast should show both revenue upside and customer behavior risk. Without both, the model only tells half the story.',
      ],
    },
  ],
  'expansion-revenue': [
    {
      heading: 'Finding Expansion Signals',
      body: [
        'Expansion signals usually appear in usage before revenue changes. More seats, more projects, higher data volume, additional teams, repeated exports, more integrations, or more admin activity can all indicate a customer is getting more value. The right signal depends on the product.',
        'Interview expanded customers. Ask what changed inside their team before they upgraded. Did they add a department, connect another workflow, invite more users, or hit a usage limit? Those answers help you design a natural expansion path for future customers.',
        'Expansion should match customer success. If customers expand because they are confused by limits, they may churn later. If customers expand because the product solves a larger problem, expansion can improve NRR and forecast durability.',
      ],
      bullets: [
        'Track product behaviors that happen before upgrades.',
        'Separate healthy expansion from surprise overages.',
        'Map expansion offers to customer milestones.',
        'Review expanded accounts for patterns sales can repeat.',
      ],
    },
    {
      heading: 'Forecasting Expansion Without Overstating It',
      body: [
        'Expansion forecasts should use timing and eligibility. Not every customer can upgrade in month two. Some need a usage threshold, team size, or integration depth before expansion makes sense. A better model asks how many accounts are eligible, what percentage expands, when it happens, and how much MRR each expansion adds.',
        'Conservative expansion assumptions are useful because expansion can be lumpy. A few large account upgrades can make one quarter look stronger than the underlying trend. Cohorts smooth that view and show whether expansion becomes more common as customers mature.',
        'In Aura Revenue, expansion can be represented inside the growth rate for quick scenarios. In a spreadsheet, give expansion its own column so you can see whether growth comes from new customers or existing customer value.',
      ],
    },
    {
      heading: 'Expansion Review Checklist',
      body: [
        'Review expansion monthly by account size, plan, product usage, and customer age. Ask which accounts expanded, what trigger appeared before expansion, who owned the conversation, and whether the expansion created more durable usage. The best expansion motions teach the team where value grows inside customer accounts.',
        'Also review accounts that should have expanded but did not. They may have hit onboarding issues, internal rollout blockers, weak executive sponsorship, or unclear pricing. Missed expansion can reveal as much as successful upsells.',
        'Tie expansion back to the forecast. If expansion is a major part of future growth, the team needs a repeatable process, not a few lucky upgrades. Document eligibility rules, timing, expected conversion, and expected added MRR.',
      ],
    },
  ],
  'saas-cac-payback': [
    {
      heading: 'What to Include in Acquisition Cost',
      body: [
        'CAC is easiest to misuse when the cost side is too narrow. Paid media spend is only one part of acquisition cost. Depending on the business, sales compensation, marketing contractors, outbound software, content production, sponsorships, affiliate commissions, demo tools, and onboarding labor may all contribute to acquiring customers. A founder-led company should at least note founder time, even when it does not appear as payroll yet.',
        'For a simple monthly review, separate direct channel spend from team and tool costs. Direct channel spend helps compare campaigns. Fully loaded acquisition cost helps evaluate whether the business model works. If a channel looks profitable only because labor is ignored, the forecast may break when the company hires someone to repeat the work.',
      ],
      bullets: [
        'Keep paid media, sales labor, and marketing tools visible.',
        'Separate one-time experiments from ongoing acquisition costs.',
        'Review CAC by channel when volume is large enough.',
        'Do not treat founder time as unlimited just because it is unpaid.',
      ],
    },
    {
      heading: 'Payback and Customer Quality',
      body: [
        'A low CAC payback period is not enough if customer quality is weak. A channel can produce cheap customers who churn quickly, never activate, or require heavy support. Another channel may have higher CAC but produce customers with stronger retention, faster expansion, and better referral potential. Payback is most useful when paired with retention and expansion data.',
        'Track payback by cohort over time. Customers acquired in January may look similar at signup but behave differently after three or six months. If a cohort reaches payback and keeps expanding, the acquisition motion may deserve more investment. If a cohort fails to reach payback because churn arrives early, the team should inspect messaging, targeting, onboarding, and customer fit before spending more.',
        'This is where forecasting becomes practical. The revenue curve tells you what happens if growth continues. CAC payback tells you whether the business can afford the growth engine behind that curve.',
      ],
    },
    {
      heading: 'A Monthly Review Workflow',
      body: [
        'Each month, compare planned acquisition spend with actual spend, planned new customers with actual new customers, and expected starting plan value with actual starting plan value. Then calculate payback for the month and compare it with the prior three months. A single month can be noisy, but repeated movement usually tells you whether a channel is improving or getting worse.',
        'Add one qualitative note beside the number. For example: content customers activated faster, paid search customers asked for features outside the roadmap, or outbound customers had larger plans but longer sales cycles. Those notes help the team decide whether to scale, pause, or refine the acquisition motion.',
      ],
    },
  ],
  'gross-revenue-retention-vs-net-revenue-retention': [
    {
      heading: 'How to Build a Retention Bridge',
      body: [
        'A retention bridge starts with one cohort and explains how that cohort moved. Begin with starting MRR from customers active at the beginning of the period. Add expansion MRR from those same customers. Subtract contraction MRR and churned MRR from those same customers. The result is ending retained revenue for the cohort.',
        'The bridge should not include new customers acquired during the period. New customers belong in total MRR growth, not retention. Keeping the boundary clean makes GRR and NRR more trustworthy. If a dashboard mixes new customer revenue into retention, leadership may miss a weakening customer base until acquisition slows.',
      ],
      bullets: [
        'Choose a fixed starting customer cohort.',
        'Record expansion, contraction, and churn separately.',
        'Exclude new customers from retention metrics.',
        'Use the same cohort period when comparing GRR and NRR.',
      ],
    },
    {
      heading: 'Management Questions to Ask',
      body: [
        'GRR and NRR should lead to decisions. If GRR falls, ask whether cancellations are concentrated in onboarding, renewal, plan fit, product gaps, customer segment, or payment failure. If NRR rises while GRR falls, ask whether expansion from a few accounts is masking broader customer dissatisfaction. If GRR is strong but NRR is flat, ask whether packaging, usage limits, seat expansion, or add-ons create enough natural expansion.',
        'A useful retention review ends with owners. Product may own activation gaps. Customer success may own renewal risk. Marketing may own poor-fit acquisition. Finance or operations may own clean definitions. Without ownership, retention metrics become interesting numbers rather than operating tools.',
        'Use the calculator to understand sensitivity, then use a cohort spreadsheet to diagnose the cause. The calculator can show how lower churn changes the forecast, but the operating data explains how to lower churn responsibly.',
      ],
    },
    {
      heading: 'Dashboard Placement',
      body: [
        'Place GRR and NRR near the top of a SaaS dashboard, but do not show them alone. Put them beside starting MRR, net new MRR, churned MRR, contraction MRR, expansion MRR, and customer count. This prevents a strong headline retention number from hiding the movement that created it.',
        'For early teams, a monthly table is enough. Track the current month, trailing three months, and trailing twelve months when you have enough history. The goal is to create a stable operating view that can survive changes in pricing, packaging, acquisition channels, and customer mix.',
      ],
    },
  ],
  'saas-burn-multiple': [
    {
      heading: 'Burn Multiple and Runway',
      body: [
        'Burn multiple should be read beside runway. A company with twelve months of runway and a high burn multiple has less room to wait for efficiency improvements than a company with thirty months of runway. The same metric can require different decisions depending on cash balance, fundraising environment, growth quality, and renewal timing.',
        'If burn multiple worsens, inspect both sides of the formula. Net burn may have increased because of hiring, experiments, infrastructure, or one-time costs. Net new ARR may have slowed because churn rose, expansion fell, sales cycles lengthened, or pipeline quality weakened. The fix depends on which side changed and whether the change is temporary or structural.',
      ],
      bullets: [
        'Review burn multiple with cash runway.',
        'Separate temporary costs from recurring burn.',
        'Inspect churn and contraction when net new ARR slows.',
        'Avoid cutting work that protects retention and product quality.',
      ],
    },
    {
      heading: 'How Bootstrapped Teams Can Use the Concept',
      body: [
        'A bootstrapped team may not report burn multiple to investors, but the underlying question still matters: how much cash and founder capacity does it take to add durable recurring revenue? If the business spends heavily on tools, contractors, ads, or support to add a small amount of MRR, the growth engine may be too expensive.',
        'For small teams, a simpler review can work. Record monthly net cash change, net new MRR, churned MRR, and major growth expenses. If cash use rises while net new MRR weakens, pause and diagnose before scaling spend. If net new MRR improves while cash use stays controlled, the business may have found a more efficient motion.',
        'The key is not to worship one metric. Burn multiple, CAC payback, churn, and MRR growth should tell a consistent story about whether the company is turning effort and cash into durable revenue.',
      ],
    },
    {
      heading: 'When the Metric Breaks Down',
      body: [
        'Burn multiple can break down when net new ARR is very small, negative, or distorted by one unusually large contract. If net new ARR is close to zero, the multiple can look extreme and may not be useful as a standalone score. In those cases, inspect the underlying revenue bridge and cash movement directly.',
        'The metric can also look temporarily worse during upfront investments that have delayed payoff, such as hiring sales capacity, rebuilding onboarding, or launching a new market. Label those investments clearly and check whether leading indicators improve. If leading indicators do not improve, the worse burn multiple is a warning rather than a temporary artifact.',
      ],
    },
  ],
  'rule-of-40-saas': [
    {
      heading: 'Choosing the Right Margin',
      body: [
        'The Rule of 40 changes depending on which margin you use. EBITDA margin, operating margin, and free cash flow margin can tell different stories. EBITDA may exclude some non-cash costs. Operating margin may show the cost of running the business more directly. Free cash flow margin can reveal cash timing, collections, and capital needs. The best choice depends on the audience and the company stage.',
        'For public-company comparison, analysts often use standardized definitions. For internal planning, consistency matters more than picking the most flattering margin. If you use operating margin this quarter and free cash flow margin next quarter, the trend may be misleading. Label the definition every time.',
      ],
      bullets: [
        'Pick one margin definition for internal tracking.',
        'Do not mix forecast growth with historical margin without labeling it.',
        'Separate one-time costs from ongoing margin when explaining changes.',
        'Use retention and payback metrics to interpret the score.',
      ],
    },
    {
      heading: 'Rule of 40 as a Planning Conversation',
      body: [
        'The best use of the Rule of 40 is not to chase a headline score. It is to ask whether the company has a coherent balance between growth and efficiency. If growth is high and margin is deeply negative, what evidence shows the growth is durable? If margin is strong and growth is low, is the company underinvesting or serving a mature niche responsibly?',
        'For small SaaS businesses, the score can help compare scenarios. A founder might model 20% annual growth with 20% margin, then compare it with 35% growth and 5% margin. The better choice depends on cash needs, market timing, retention quality, product roadmap, and founder goals.',
        'Aura Revenue can support that discussion by showing how MRR assumptions turn into ARR run rate. The margin side still needs a separate expense and cash model.',
      ],
    },
    {
      heading: 'What to Track Alongside It',
      body: [
        'Track the Rule of 40 beside retention, CAC payback, burn multiple, gross margin, and runway. A high score with weak retention may not be durable. A lower score with excellent retention and improving payback may be healthier than it looks. The surrounding metrics explain whether the growth and margin balance is built on strong customer economics.',
        'Also review absolute revenue scale. A very small company can produce unusual percentage growth that makes the score look impressive. Larger companies usually need more discipline because each percentage point represents more dollars, more customers, and more operational complexity.',
      ],
    },
  ],
  'mrr-forecasting-bootstrapped-saas-founders': [
    {
      heading: 'Forecast Founder Capacity',
      body: [
        'A bootstrapped forecast should include capacity even if the calculator does not model it directly. Founder-led sales, onboarding, support, content, product development, and operations all compete for time. A model that assumes faster growth may also assume more demos, more onboarding calls, more support tickets, and more product requests.',
        'Write capacity notes beside the growth assumption. If growth depends on publishing four high-quality guides per month, doing ten demos per week, and shipping onboarding improvements, ask whether that work fits the same calendar. If it does not, the forecast needs either a lower growth assumption, a narrower strategy, automation, or help from contractors or employees.',
      ],
      bullets: [
        'List the work required to create new MRR.',
        'Estimate support and onboarding load from new customers.',
        'Keep founder time visible even when it is not a cash expense.',
        'Adjust the forecast when capacity becomes the bottleneck.',
      ],
    },
    {
      heading: 'Deciding What to Improve First',
      body: [
        'When resources are limited, the forecast can help choose the next improvement. If churn sensitivity is high, activation and retention may deserve priority before adding acquisition spend. If growth is too slow but churn is stable, distribution and conversion may matter more. If customers retain but never expand, packaging or pricing may be the constraint.',
        'Use one change at a time when possible. Test a clearer onboarding path, a pricing adjustment, a new acquisition channel, or a retention email sequence, then watch the metric it should affect. Forecasting becomes more accurate when assumptions are tied to specific experiments and updated with actual results.',
        'A bootstrapped forecast should stay honest. It can be ambitious, but it should never hide the operational work required to reach the curve.',
      ],
    },
    {
      heading: 'Use Ranges Instead of One Perfect Line',
      body: [
        'A bootstrapped founder should keep at least three forecast lines: survival, base, and upside. The survival case assumes slower growth, higher churn, and no heroic capacity increase. The base case reflects what the current business can plausibly execute. The upside case shows what happens if a specific improvement works, such as better activation, a stronger channel, or a pricing change.',
        'Ranges make decisions calmer. If the business survives the conservative case, the founder can invest with more confidence. If the business only works in the upside case, the next action should be proving the assumption quickly rather than treating the optimistic curve as the plan.',
      ],
    },
  ],
};

export const learnArticles: LearnArticle[] = baseLearnArticles.map((article) => ({
  ...article,
  sections: [
    ...article.sections,
    ...(articleAdditions[article.slug] ?? []),
    {
      heading: 'Use This Guide With the Calculator',
      body: [
        'After you read this guide, open the Aura Revenue calculator and change one assumption at a time. Keep starting MRR fixed, then adjust growth, churn, or the forecast period to see which input changes the outcome most. That exercise turns the concept into a planning habit.',
        'For a deeper model, copy the SaaS revenue forecast template and split the monthly movement into new MRR, expansion MRR, contraction MRR, churned MRR, ending MRR, and ARR run rate. The calculator is best for fast scenario thinking. The template is better when you need operating detail.',
      ],
    },
  ],
}));

export function getArticle(slug: string) {
  return learnArticles.find((article) => article.slug === slug);
}
