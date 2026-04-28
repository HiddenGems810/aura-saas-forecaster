export type MetricToolInput = {
  id: string;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
};

export type MetricToolResult = {
  label: string;
  value: string;
  detail: string;
  tone?: 'default' | 'positive' | 'warning';
};

export type MetricToolCalculation = {
  results: MetricToolResult[];
  interpretationTitle: string;
  interpretation: string;
  assumptionChecks: string[];
  formulaRows: [string, string][];
  exportRows: [string, string][];
};

export type MetricTool = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  category: string;
  inputs: MetricToolInput[];
  formulaPreview: string;
  howToUse: string[];
  commonMistakes: string[];
  relatedLinks: { label: string; href: string }[];
  faq: { question: string; answer: string }[];
  calculate: (values: Record<string, number>) => MetricToolCalculation;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

function currency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function percent(value: number) {
  return `${numberFormatter.format(Number.isFinite(value) ? value : 0)}%`;
}

function months(value: number) {
  return `${numberFormatter.format(Number.isFinite(value) ? value : 0)} months`;
}

function multiple(value: number) {
  return `${numberFormatter.format(Number.isFinite(value) ? value : 0)}x`;
}

function safeDivide(numerator: number, denominator: number) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 0;
  return numerator / denominator;
}

export const metricTools: MetricTool[] = [
  {
    slug: 'arr-run-rate-calculator',
    title: 'ARR Run Rate Calculator',
    shortTitle: 'ARR Run Rate',
    description: 'Convert current MRR into ARR run rate and understand what annualized recurring revenue does and does not mean.',
    intro:
      'Use this ARR run rate calculator to annualize current monthly recurring revenue. It is useful for quick SaaS planning, but it should not be treated as a promise of future collections.',
    category: 'Recurring revenue',
    formulaPreview: 'ARR run rate = Current MRR x 12',
    inputs: [
      { id: 'currentMrr', label: 'Current MRR', help: 'Monthly recurring revenue from active subscription customers.', min: 0, max: 500000, step: 500, defaultValue: 10000, prefix: '$' },
    ],
    howToUse: [
      'Enter the current monthly recurring revenue you want to annualize.',
      'Review the ARR run rate and monthly/quarterly equivalents.',
      'Use the result as a planning reference, not a guaranteed revenue forecast.',
    ],
    commonMistakes: [
      'Including one-time setup fees or services revenue in MRR.',
      'Treating ARR run rate as contracted revenue without checking churn and renewal risk.',
      'Annualizing a temporary launch spike instead of a durable recurring base.',
    ],
    relatedLinks: [
      { label: 'MRR vs ARR guide', href: '/learn/mrr-vs-arr' },
      { label: 'What is MRR?', href: '/learn/what-is-mrr' },
      { label: 'Forecasting calculator', href: '/calculator' },
      { label: 'Methodology', href: '/methodology' },
    ],
    faq: [
      { question: 'What is ARR run rate?', answer: 'ARR run rate is current MRR multiplied by twelve. It annualizes the current recurring revenue base.' },
      { question: 'Is ARR run rate the same as booked ARR?', answer: 'No. ARR run rate annualizes current MRR. Booked ARR depends on signed recurring contracts and may require different accounting treatment.' },
      { question: 'Should I include services revenue?', answer: 'Usually no. ARR run rate should focus on recurring subscription revenue, not one-time services, setup fees, or implementation projects.' },
    ],
    calculate: ({ currentMrr }) => {
      const arr = currentMrr * 12;
      return {
        results: [
          { label: 'ARR run rate', value: currency(arr), detail: 'Current MRR annualized', tone: 'positive' },
          { label: 'Current MRR', value: currency(currentMrr), detail: 'Monthly recurring baseline' },
          { label: 'Quarterly run rate', value: currency(currentMrr * 3), detail: 'Three months at current MRR' },
        ],
        interpretationTitle: 'Annualized recurring revenue baseline',
        interpretation:
          'This converts the current monthly recurring revenue base into an annualized run rate. The output is useful for scale context, but actual annual revenue can change if churn, expansion, pricing, collections, or new sales move differently than expected.',
        assumptionChecks: [
          currentMrr === 0 ? 'A zero MRR input is useful for structure, but ARR run rate begins once recurring revenue exists.' : 'The calculation assumes the current recurring base remains active for run-rate context.',
          'Exclude one-time fees unless they truly recur as subscription revenue.',
        ],
        formulaRows: [
          ['ARR run rate', 'Current MRR x 12'],
          ['Quarterly run rate', 'Current MRR x 3'],
        ],
        exportRows: [
          ['Current MRR', currency(currentMrr)],
          ['ARR run rate', currency(arr)],
          ['Quarterly run rate', currency(currentMrr * 3)],
        ],
      };
    },
  },
  {
    slug: 'saas-churn-calculator',
    title: 'SaaS Churn Calculator',
    shortTitle: 'SaaS Churn',
    description: 'Calculate revenue churn rate, retained MRR, and lost ARR run rate from starting MRR and churned MRR.',
    intro:
      'Use this SaaS churn calculator to estimate revenue churn from lost recurring revenue. It helps founders see how much recurring revenue remains after cancellations or downgrades.',
    category: 'Retention',
    formulaPreview: 'Revenue churn rate = Churned MRR / Starting MRR',
    inputs: [
      { id: 'startingMrr', label: 'Starting MRR', help: 'Recurring revenue at the beginning of the period.', min: 0, max: 500000, step: 500, defaultValue: 25000, prefix: '$' },
      { id: 'churnedMrr', label: 'Churned MRR', help: 'Recurring revenue lost from cancellations or downgrades.', min: 0, max: 100000, step: 250, defaultValue: 1250, prefix: '$' },
    ],
    howToUse: [
      'Enter starting MRR for the period you are measuring.',
      'Enter the MRR lost to cancellations or downgrades.',
      'Review revenue churn, retained MRR, and the annualized impact of lost MRR.',
    ],
    commonMistakes: [
      'Mixing customer churn with revenue churn without labeling the metric.',
      'Using ending MRR as the denominator instead of starting MRR.',
      'Ignoring downgrade/contraction revenue when measuring revenue churn.',
    ],
    relatedLinks: [
      { label: 'Churn rate guide', href: '/learn/churn-rate' },
      { label: 'GRR vs NRR guide', href: '/learn/gross-revenue-retention-vs-net-revenue-retention' },
      { label: 'NRR calculator', href: '/tools/net-revenue-retention-calculator' },
      { label: 'Forecasting calculator', href: '/calculator' },
    ],
    faq: [
      { question: 'What is revenue churn?', answer: 'Revenue churn measures recurring revenue lost during a period as a percentage of starting recurring revenue.' },
      { question: 'Should downgrades count as churned MRR?', answer: 'For a simple revenue churn view, downgrades can be included as lost recurring revenue. More detailed reporting may separate contraction MRR from full cancellations.' },
      { question: 'Why does churn affect forecasts so much?', answer: 'Churn lowers the revenue base that future growth compounds from, so small monthly changes can create large long-term differences.' },
    ],
    calculate: ({ startingMrr, churnedMrr }) => {
      const cappedChurned = Math.min(churnedMrr, startingMrr);
      const churnRate = safeDivide(cappedChurned, startingMrr) * 100;
      const retainedMrr = Math.max(0, startingMrr - cappedChurned);
      return {
        results: [
          { label: 'Revenue churn rate', value: percent(churnRate), detail: 'Churned MRR / starting MRR', tone: churnRate > 8 ? 'warning' : 'default' },
          { label: 'Retained MRR', value: currency(retainedMrr), detail: 'MRR left after churn', tone: 'positive' },
          { label: 'Lost ARR run rate', value: currency(cappedChurned * 12), detail: 'Annualized lost MRR' },
        ],
        interpretationTitle: churnRate > 8 ? 'High churn pressure' : 'Measured revenue loss',
        interpretation:
          churnRate > 8
            ? 'This scenario shows high revenue churn. Sustained churn at this level can make growth harder because new recurring revenue must replace losses before the business can expand.'
            : 'This scenario shows the percentage of recurring revenue lost from the starting base. Use it with acquisition and expansion metrics to understand whether the business is growing efficiently.',
        assumptionChecks: [
          churnedMrr > startingMrr ? 'Churned MRR was capped at starting MRR because churn cannot exceed the starting recurring base in this simple model.' : 'The calculation assumes churned MRR belongs to the same period as starting MRR.',
          'Separate voluntary churn, involuntary churn, and downgrades when you need a deeper retention analysis.',
        ],
        formulaRows: [
          ['Revenue churn rate', 'Churned MRR / Starting MRR x 100'],
          ['Retained MRR', 'Starting MRR - Churned MRR'],
          ['Lost ARR run rate', 'Churned MRR x 12'],
        ],
        exportRows: [
          ['Starting MRR', currency(startingMrr)],
          ['Churned MRR', currency(cappedChurned)],
          ['Revenue churn rate', percent(churnRate)],
          ['Retained MRR', currency(retainedMrr)],
        ],
      };
    },
  },
  {
    slug: 'cac-payback-calculator',
    title: 'CAC Payback Calculator',
    shortTitle: 'CAC Payback',
    description: 'Estimate SaaS CAC payback period using customer acquisition cost, monthly recurring revenue, and gross margin.',
    intro:
      'Use this CAC payback calculator to estimate how many months of gross profit it takes to recover customer acquisition cost. It is a simplified planning metric for SaaS acquisition efficiency.',
    category: 'Acquisition efficiency',
    formulaPreview: 'CAC payback = CAC / (Monthly revenue x gross margin)',
    inputs: [
      { id: 'cac', label: 'CAC per customer', help: 'Average sales and marketing cost to acquire one customer.', min: 0, max: 50000, step: 100, defaultValue: 1200, prefix: '$' },
      { id: 'monthlyRevenue', label: 'Monthly revenue per customer', help: 'Average monthly recurring revenue from the customer.', min: 0, max: 10000, step: 25, defaultValue: 150, prefix: '$' },
      { id: 'grossMargin', label: 'Gross margin', help: 'Gross margin percentage after hosting, support, and delivery costs.', min: 0, max: 100, step: 1, defaultValue: 80, suffix: '%' },
    ],
    howToUse: [
      'Enter average CAC for the customer segment you are evaluating.',
      'Enter monthly recurring revenue and gross margin for that segment.',
      'Compare payback months against churn risk and available cash runway.',
    ],
    commonMistakes: [
      'Using blended CAC when channels or customer segments behave very differently.',
      'Ignoring gross margin and calculating payback from revenue instead of gross profit.',
      'Comparing CAC payback without considering churn, expansion, or contract length.',
    ],
    relatedLinks: [
      { label: 'CAC payback guide', href: '/learn/saas-cac-payback' },
      { label: 'Burn multiple calculator', href: '/tools/saas-burn-multiple-calculator' },
      { label: 'Rule of 40 calculator', href: '/tools/rule-of-40-calculator' },
      { label: 'Forecasting template', href: '/templates/saas-revenue-forecast' },
    ],
    faq: [
      { question: 'What is CAC payback?', answer: 'CAC payback estimates how long it takes for gross profit from a customer to recover acquisition cost.' },
      { question: 'Why include gross margin?', answer: 'Gross margin keeps the calculation closer to contribution economics by accounting for delivery costs.' },
      { question: 'Is shorter always better?', answer: 'Shorter payback usually reduces cash pressure, but context matters. Contract size, retention, expansion, and market strategy all affect interpretation.' },
    ],
    calculate: ({ cac, monthlyRevenue, grossMargin }) => {
      const monthlyGrossProfit = monthlyRevenue * (grossMargin / 100);
      const paybackMonths = safeDivide(cac, monthlyGrossProfit);
      return {
        results: [
          { label: 'CAC payback', value: months(paybackMonths), detail: 'CAC / monthly gross profit', tone: paybackMonths > 18 ? 'warning' : 'positive' },
          { label: 'Monthly gross profit', value: currency(monthlyGrossProfit), detail: 'Revenue x gross margin' },
          { label: 'Annual gross profit', value: currency(monthlyGrossProfit * 12), detail: 'Monthly gross profit x 12' },
        ],
        interpretationTitle: paybackMonths > 18 ? 'Longer payback period' : 'Acquisition cost recovery estimate',
        interpretation:
          paybackMonths > 18
            ? 'This scenario has a longer payback period, which can create cash pressure if customers churn before acquisition cost is recovered. Compare it with retention, expansion, and runway assumptions.'
            : 'This scenario estimates how many months of gross profit are needed to recover CAC. Use it as one input in acquisition planning alongside churn, expansion, and cash constraints.',
        assumptionChecks: [
          monthlyRevenue === 0 || grossMargin === 0 ? 'Payback cannot be meaningful when monthly revenue or gross margin is zero.' : 'The calculation assumes monthly revenue and gross margin remain steady during the payback period.',
          'Use segment-specific CAC where possible instead of a broad blended average.',
        ],
        formulaRows: [
          ['Monthly gross profit', 'Monthly revenue per customer x gross margin'],
          ['CAC payback', 'CAC / monthly gross profit'],
          ['Annual gross profit', 'Monthly gross profit x 12'],
        ],
        exportRows: [
          ['CAC per customer', currency(cac)],
          ['Monthly revenue per customer', currency(monthlyRevenue)],
          ['Gross margin', percent(grossMargin)],
          ['CAC payback', months(paybackMonths)],
        ],
      };
    },
  },
  {
    slug: 'rule-of-40-calculator',
    title: 'Rule of 40 Calculator',
    shortTitle: 'Rule of 40',
    description: 'Calculate SaaS Rule of 40 score from revenue growth rate and profit margin.',
    intro:
      'Use this Rule of 40 calculator to combine SaaS growth and profitability into one simple score. It is a directional benchmark, not a complete measure of company quality.',
    category: 'Efficiency benchmark',
    formulaPreview: 'Rule of 40 score = Revenue growth rate + Profit margin',
    inputs: [
      { id: 'growthRate', label: 'Revenue growth rate', help: 'Annual recurring revenue or revenue growth rate.', min: -50, max: 200, step: 1, defaultValue: 35, suffix: '%' },
      { id: 'profitMargin', label: 'Profit margin', help: 'Operating margin, EBITDA margin, or free cash flow margin depending on your analysis.', min: -100, max: 100, step: 1, defaultValue: 8, suffix: '%' },
    ],
    howToUse: [
      'Enter a growth rate for the period you are evaluating.',
      'Enter the margin definition you want to use and keep it consistent.',
      'Review whether the combined score is above or below 40.',
    ],
    commonMistakes: [
      'Mixing margin definitions across periods or companies.',
      'Using the benchmark without checking company stage, market, and retention quality.',
      'Treating a high score as proof that the business is healthy in every area.',
    ],
    relatedLinks: [
      { label: 'Rule of 40 guide', href: '/learn/rule-of-40-saas' },
      { label: 'Burn multiple calculator', href: '/tools/saas-burn-multiple-calculator' },
      { label: 'CAC payback calculator', href: '/tools/cac-payback-calculator' },
      { label: 'SaaS forecasting guide', href: '/learn/saas-growth-model' },
    ],
    faq: [
      { question: 'What is the Rule of 40?', answer: 'The Rule of 40 combines revenue growth rate and profit margin. A score of 40 or higher is often used as a directional SaaS efficiency benchmark.' },
      { question: 'Which profit margin should I use?', answer: 'Teams often use operating margin, EBITDA margin, or free cash flow margin. The key is to label the margin and keep it consistent.' },
      { question: 'Does Rule of 40 apply to early startups?', answer: 'It can be educational, but very early companies may have volatile growth and margins, so the score needs context.' },
    ],
    calculate: ({ growthRate, profitMargin }) => {
      const score = growthRate + profitMargin;
      return {
        results: [
          { label: 'Rule of 40 score', value: percent(score), detail: 'Growth + margin', tone: score >= 40 ? 'positive' : 'warning' },
          { label: 'Growth rate', value: percent(growthRate), detail: 'Revenue growth input' },
          { label: 'Profit margin', value: percent(profitMargin), detail: 'Margin input' },
        ],
        interpretationTitle: score >= 40 ? 'At or above the Rule of 40' : 'Below the Rule of 40',
        interpretation:
          score >= 40
            ? 'This scenario is at or above the common Rule of 40 threshold. That can be a useful efficiency signal, but it should still be reviewed with retention, gross margin, cash burn, and customer acquisition quality.'
            : 'This scenario is below the common Rule of 40 threshold. That does not automatically mean the business is weak, but it highlights a tradeoff between growth and profitability that deserves review.',
        assumptionChecks: [
          'Use the same margin definition each time you compare Rule of 40 scores.',
          growthRate > 100 ? 'Very high growth rates can be difficult to sustain, especially as the revenue base grows.' : 'The score should be interpreted with company stage and market context.',
        ],
        formulaRows: [
          ['Rule of 40 score', 'Revenue growth rate + Profit margin'],
        ],
        exportRows: [
          ['Revenue growth rate', percent(growthRate)],
          ['Profit margin', percent(profitMargin)],
          ['Rule of 40 score', percent(score)],
        ],
      };
    },
  },
  {
    slug: 'net-revenue-retention-calculator',
    title: 'Net Revenue Retention Calculator',
    shortTitle: 'NRR Calculator',
    description: 'Calculate SaaS net revenue retention and gross revenue retention from expansion, contraction, and churned MRR.',
    intro:
      'Use this NRR calculator to understand whether an existing customer cohort expands or contracts after upgrades, downgrades, and churn. It also shows GRR for a stricter retention view.',
    category: 'Retention',
    formulaPreview: 'NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR',
    inputs: [
      { id: 'startingMrr', label: 'Starting cohort MRR', help: 'MRR from the existing customer cohort at the start of the period.', min: 0, max: 500000, step: 500, defaultValue: 100000, prefix: '$' },
      { id: 'expansionMrr', label: 'Expansion MRR', help: 'Added recurring revenue from upgrades, seats, usage, or add-ons.', min: 0, max: 200000, step: 500, defaultValue: 12000, prefix: '$' },
      { id: 'contractionMrr', label: 'Contraction MRR', help: 'Recurring revenue lost from downgrades or reduced usage.', min: 0, max: 200000, step: 500, defaultValue: 4000, prefix: '$' },
      { id: 'churnedMrr', label: 'Churned MRR', help: 'Recurring revenue lost from customers who canceled.', min: 0, max: 200000, step: 500, defaultValue: 6000, prefix: '$' },
    ],
    howToUse: [
      'Enter starting MRR for the customer cohort you are measuring.',
      'Add expansion, contraction, and churn from the same cohort and period.',
      'Compare NRR and GRR to understand expansion strength and downside retention.',
    ],
    commonMistakes: [
      'Including new customer MRR in NRR.',
      'Mixing cohorts or time periods in the same calculation.',
      'Looking only at NRR while ignoring weak gross revenue retention.',
    ],
    relatedLinks: [
      { label: 'GRR vs NRR guide', href: '/learn/gross-revenue-retention-vs-net-revenue-retention' },
      { label: 'Net revenue retention guide', href: '/learn/net-revenue-retention' },
      { label: 'Churn calculator', href: '/tools/saas-churn-calculator' },
      { label: 'Forecasting template', href: '/templates/saas-revenue-forecast' },
    ],
    faq: [
      { question: 'What is NRR?', answer: 'NRR measures retained recurring revenue from an existing cohort after expansion, contraction, and churn.' },
      { question: 'What is GRR?', answer: 'GRR measures retained recurring revenue before expansion. It shows downside retention from churn and contraction.' },
      { question: 'Should new customer revenue be included?', answer: 'No. NRR focuses on an existing customer cohort, so new customer MRR should be excluded.' },
    ],
    calculate: ({ startingMrr, expansionMrr, contractionMrr, churnedMrr }) => {
      const retainedBeforeExpansion = Math.max(0, startingMrr - contractionMrr - churnedMrr);
      const endingCohortMrr = retainedBeforeExpansion + expansionMrr;
      const nrr = safeDivide(endingCohortMrr, startingMrr) * 100;
      const grr = safeDivide(retainedBeforeExpansion, startingMrr) * 100;
      return {
        results: [
          { label: 'Net revenue retention', value: percent(nrr), detail: 'Includes expansion', tone: nrr >= 100 ? 'positive' : 'warning' },
          { label: 'Gross revenue retention', value: percent(grr), detail: 'Excludes expansion' },
          { label: 'Ending cohort MRR', value: currency(endingCohortMrr), detail: 'Retained revenue after movement' },
        ],
        interpretationTitle: nrr >= 100 ? 'Expansion offsets losses' : 'Cohort contraction',
        interpretation:
          nrr >= 100
            ? 'This cohort expands after churn and contraction because expansion MRR offsets lost recurring revenue. Review GRR too, because strong expansion can hide cancellation pressure.'
            : 'This cohort contracts after churn, contraction, and expansion. Improving onboarding, customer success, packaging, or expansion motion may be needed before the installed base becomes self-expanding.',
        assumptionChecks: [
          'The calculation assumes all inputs belong to the same starting cohort and measurement period.',
          grr < 85 ? 'Lower GRR can indicate retention risk even when NRR looks acceptable from expansion.' : 'GRR gives a stricter view because it ignores expansion revenue.',
        ],
        formulaRows: [
          ['NRR', '(Starting MRR + Expansion MRR - Contraction MRR - Churned MRR) / Starting MRR x 100'],
          ['GRR', '(Starting MRR - Contraction MRR - Churned MRR) / Starting MRR x 100'],
          ['Ending cohort MRR', 'Starting MRR + Expansion MRR - Contraction MRR - Churned MRR'],
        ],
        exportRows: [
          ['Starting cohort MRR', currency(startingMrr)],
          ['Expansion MRR', currency(expansionMrr)],
          ['Contraction MRR', currency(contractionMrr)],
          ['Churned MRR', currency(churnedMrr)],
          ['NRR', percent(nrr)],
          ['GRR', percent(grr)],
        ],
      };
    },
  },
  {
    slug: 'saas-burn-multiple-calculator',
    title: 'SaaS Burn Multiple Calculator',
    shortTitle: 'Burn Multiple',
    description: 'Calculate burn multiple from net burn and net new ARR to understand SaaS growth efficiency.',
    intro:
      'Use this burn multiple calculator to estimate how much cash burn is required to create one dollar of net new ARR. It is a simple efficiency lens for SaaS growth planning.',
    category: 'Capital efficiency',
    formulaPreview: 'Burn multiple = Net burn / Net new ARR',
    inputs: [
      { id: 'netBurn', label: 'Net burn', help: 'Cash used during the period after revenue and expenses.', min: 0, max: 5000000, step: 10000, defaultValue: 300000, prefix: '$' },
      { id: 'netNewArr', label: 'Net new ARR', help: 'ARR added during the same period after churn and contraction.', min: 0, max: 5000000, step: 10000, defaultValue: 200000, prefix: '$' },
    ],
    howToUse: [
      'Enter net burn for the period you want to evaluate.',
      'Enter net new ARR from the same period.',
      'Review the burn multiple and compare it with retention, margin, and payback context.',
    ],
    commonMistakes: [
      'Using gross new ARR instead of net new ARR.',
      'Mixing monthly burn with annual net new ARR without normalizing the period.',
      'Treating burn multiple as a complete replacement for runway, retention, and unit economics.',
    ],
    relatedLinks: [
      { label: 'Burn multiple guide', href: '/learn/saas-burn-multiple' },
      { label: 'CAC payback calculator', href: '/tools/cac-payback-calculator' },
      { label: 'Rule of 40 calculator', href: '/tools/rule-of-40-calculator' },
      { label: 'Forecasting calculator', href: '/calculator' },
    ],
    faq: [
      { question: 'What is burn multiple?', answer: 'Burn multiple compares net cash burn to net new ARR. It estimates how much burn is required to add one dollar of ARR.' },
      { question: 'What period should I use?', answer: 'Use the same period for net burn and net new ARR. For example, compare quarterly burn with quarterly net new ARR.' },
      { question: 'Can burn multiple be negative?', answer: 'In this simplified calculator, burn is entered as a positive cash-use number. A cash-generating company would need a separate interpretation.' },
    ],
    calculate: ({ netBurn, netNewArr }) => {
      const burnMultiple = safeDivide(netBurn, netNewArr);
      return {
        results: [
          { label: 'Burn multiple', value: multiple(burnMultiple), detail: 'Net burn / net new ARR', tone: burnMultiple > 2 ? 'warning' : 'positive' },
          { label: 'Net burn', value: currency(netBurn), detail: 'Cash used in period' },
          { label: 'Net new ARR', value: currency(netNewArr), detail: 'ARR added in period' },
        ],
        interpretationTitle: burnMultiple > 2 ? 'Higher burn per ARR dollar' : 'More efficient ARR creation',
        interpretation:
          burnMultiple > 2
            ? 'This scenario shows higher cash burn for each dollar of net new ARR. Review acquisition efficiency, retention, pricing, gross margin, and operating expense assumptions before scaling spend.'
            : 'This scenario suggests a more efficient relationship between cash burn and net new ARR. It should still be reviewed alongside runway, retention quality, gross margin, and payback period.',
        assumptionChecks: [
          netNewArr === 0 ? 'Burn multiple cannot be meaningful when net new ARR is zero.' : 'The calculation assumes net burn and net new ARR are measured over the same period.',
          'Use net new ARR after churn and contraction instead of gross bookings.',
        ],
        formulaRows: [
          ['Burn multiple', 'Net burn / Net new ARR'],
        ],
        exportRows: [
          ['Net burn', currency(netBurn)],
          ['Net new ARR', currency(netNewArr)],
          ['Burn multiple', multiple(burnMultiple)],
        ],
      };
    },
  },
];

export function getMetricTool(slug: string) {
  return metricTools.find((tool) => tool.slug === slug);
}
