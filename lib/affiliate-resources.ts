export const AMAZON_ASSOCIATE_TAG = 'aurarevenue-20';

export const AMAZON_DISCLOSURE = 'As an Amazon Associate, Aura Revenue earns from qualifying purchases.';

export const AFFILIATE_SECTION_DISCLOSURE =
  'This page may contain affiliate links. Aura Revenue may earn from qualifying purchases at no extra cost to you.';

export type AffiliateProduct = {
  id: string;
  name: string;
  category: 'Books' | 'Planning tools' | 'Office gear';
  bestFor: string;
  whyItHelps: string;
  consider: string;
  targetPages: string[];
  recommended: boolean;
  amazonAsin?: string;
};

function amazonSearchUrl(query: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_ASSOCIATE_TAG}`;
}

function amazonProductUrl(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: 'automatic-customer',
    name: 'The Automatic Customer by John Warrillow',
    category: 'Books',
    bestFor: 'Founders learning subscription revenue models',
    whyItHelps:
      'This book is useful for understanding why recurring revenue businesses behave differently from one-time sales businesses. It gives founders a broader subscription-model lens before they start modeling MRR and retention.',
    consider: 'It is broader than SaaS, so pair it with SaaS-specific metrics content.',
    targetPages: ['best-saas-finance-books', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B01MY26IQ8',
  },
  {
    id: 'subscribed',
    name: 'Subscribed by Tien Tzuo',
    category: 'Books',
    bestFor: 'Operators studying subscription business strategy',
    whyItHelps:
      'Subscribed explains the operating shift from product sales to recurring customer relationships. It fits founders who want context for retention, expansion, and long-term customer value.',
    consider: 'It is strategy-heavy and less tactical than a spreadsheet or metrics workbook.',
    targetPages: ['best-saas-finance-books'],
    recommended: true,
    amazonAsin: '0525536469',
  },
  {
    id: 'saas-playbook',
    name: 'The SaaS Playbook by Rob Walling',
    category: 'Books',
    bestFor: 'Bootstrapped SaaS founders',
    whyItHelps:
      'This is one of the most founder-relevant choices for indie SaaS operators because it focuses on practical growth, positioning, and operating decisions. It pairs well with Aura Revenue forecasting tools for scenario planning.',
    consider: 'Best fit for early-stage and bootstrapped teams, not enterprise finance teams.',
    targetPages: ['best-saas-finance-books', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B0C87KHT1L',
  },
  {
    id: 'lean-analytics',
    name: 'Lean Analytics by Alistair Croll and Benjamin Yoskovitz',
    category: 'Books',
    bestFor: 'Founders choosing the right metric for their stage',
    whyItHelps:
      'Lean Analytics helps founders connect business model, stage, and metrics. It is especially useful for avoiding vanity metrics and focusing on the numbers that change decisions.',
    consider: 'It covers multiple business models, so SaaS readers should focus on the recurring-revenue sections.',
    targetPages: ['best-saas-finance-books', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '1449335675',
  },
  {
    id: 'traction',
    name: 'Traction by Gabriel Weinberg and Justin Mares',
    category: 'Books',
    bestFor: 'Founders comparing acquisition channels',
    whyItHelps:
      'Traction is useful when CAC payback or growth assumptions need an operating source. It helps founders think through channels instead of typing aggressive growth rates into a forecast without a plan.',
    consider: 'It is acquisition-focused, so it should be paired with retention and churn analysis.',
    targetPages: ['best-saas-finance-books'],
    recommended: true,
    amazonAsin: '1591848369',
  },
  {
    id: 'monetizing-innovation',
    name: 'Monetizing Innovation by Madhavan Ramanujam and Georg Tacke',
    category: 'Books',
    bestFor: 'Founders making pricing and packaging decisions',
    whyItHelps:
      'Pricing changes can reshape MRR, expansion revenue, and churn. This book helps founders think about willingness to pay and packaging before building pricing assumptions into a forecast.',
    consider: 'It is not SaaS-only, so translate the ideas into subscription packaging carefully.',
    targetPages: ['best-saas-finance-books', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '1119240867',
  },
  {
    id: 'obviously-awesome',
    name: 'Obviously Awesome by April Dunford',
    category: 'Books',
    bestFor: 'Founders improving positioning before scaling growth',
    whyItHelps:
      'Positioning affects conversion, sales cycles, churn, and pricing power. This book is useful when a forecast depends on better acquisition or stronger customer fit.',
    consider: 'It is a positioning book, not a finance book, so use it as a strategy complement.',
    targetPages: ['best-saas-finance-books', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '1999023005',
  },
  {
    id: 'financial-intelligence-entrepreneurs',
    name: 'Financial Intelligence for Entrepreneurs by Karen Berman and Joe Knight',
    category: 'Books',
    bestFor: 'Founders learning finance fundamentals',
    whyItHelps:
      'This book helps non-finance founders understand financial statements, cash flow, and operating metrics. It is useful context before interpreting SaaS forecasts or investor-facing numbers.',
    consider: 'It is broader business finance, not a SaaS metrics manual.',
    targetPages: ['best-saas-finance-books'],
    recommended: true,
    amazonAsin: '1422119157',
  },
  {
    id: 'venture-deals',
    name: 'Venture Deals by Brad Feld and Jason Mendelson',
    category: 'Books',
    bestFor: 'Founders preparing for fundraising conversations',
    whyItHelps:
      'Venture Deals helps founders understand financing language and investor incentives. It is useful when SaaS forecasts are being prepared for fundraising or board conversations.',
    consider: 'It is financing-focused and may be less relevant for founders who plan to stay fully bootstrapped.',
    targetPages: ['best-saas-finance-books'],
    recommended: true,
    amazonAsin: '1119594820',
  },
  {
    id: 'mom-test',
    name: 'The Mom Test by Rob Fitzpatrick',
    category: 'Books',
    bestFor: 'Founders validating customer demand',
    whyItHelps:
      'Forecasts are only useful if the market assumptions are grounded. This book helps founders ask better customer discovery questions before overestimating demand or conversion.',
    consider: 'It is about customer research rather than metrics calculation.',
    targetPages: ['saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '1492180742',
  },
  {
    id: 'moleskine-notebook',
    name: 'Moleskine Classic Notebook',
    category: 'Planning tools',
    bestFor: 'Founders who keep simple planning notes',
    whyItHelps:
      'A durable notebook is useful for weekly forecast assumptions, customer notes, and decision logs. It works well for founders who want a low-friction place to capture operating thinking.',
    consider: 'It is not structured; founders who want prompts may prefer a planner.',
    targetPages: ['startup-planning-tools', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '8883701127',
  },
  {
    id: 'leuchtturm-notebook',
    name: 'Leuchtturm1917 Medium A5 Notebook',
    category: 'Planning tools',
    bestFor: 'Founders who use bullet journaling or indexed notes',
    whyItHelps:
      'Numbered pages and indexing make it easier to track assumptions, experiments, and monthly reviews over time. It is a strong fit for founders who revisit decisions.',
    consider: 'It is still a blank notebook, so it requires a planning routine.',
    targetPages: ['startup-planning-tools'],
    recommended: true,
    amazonAsin: 'B002TSIMW4',
  },
  {
    id: 'rocketbook-core',
    name: 'Rocketbook Core Reusable Smart Notebook',
    category: 'Planning tools',
    bestFor: 'Founders who want handwritten notes saved digitally',
    whyItHelps:
      'Rocketbook can reduce paper clutter while keeping the speed of handwritten planning. It is useful for founder notes that need to move into a digital archive.',
    consider: 'It depends on using compatible pens and a scanning workflow.',
    targetPages: ['startup-planning-tools'],
    recommended: true,
    amazonAsin: 'B07WFVWZG5',
  },
  {
    id: 'post-it-easel-pad',
    name: 'Post-it Super Sticky Easel Pad',
    category: 'Planning tools',
    bestFor: 'Workshop-style planning and quarterly reviews',
    whyItHelps:
      'Large sticky sheets are useful for mapping funnels, cohort problems, pricing tests, and quarterly priorities. They help remote or solo founders externalize messy planning.',
    consider: 'It needs wall space and is less useful for purely digital workflows.',
    targetPages: ['startup-planning-tools', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B00006IA9F',
  },
  {
    id: 'quartet-whiteboard',
    name: 'Quartet Infinity Magnetic Glass Whiteboard',
    category: 'Planning tools',
    bestFor: 'Persistent KPI and forecast visibility',
    whyItHelps:
      'A wall whiteboard can keep monthly MRR targets, churn problems, and experiment priorities visible. It is useful for founders who think better with a persistent visual workspace.',
    consider: 'Glass boards cost more than basic whiteboards and require mounting space.',
    targetPages: ['startup-planning-tools', 'founder-office-setup'],
    recommended: true,
    amazonAsin: 'B00H2XMP8I',
  },
  {
    id: 'casio-ms80b',
    name: 'Casio MS-80B Desktop Calculator',
    category: 'Planning tools',
    bestFor: 'Quick desk math during planning sessions',
    whyItHelps:
      'A simple desktop calculator is useful for quick checks while reviewing MRR, percentages, and budget assumptions. It keeps small calculations out of overloaded spreadsheets.',
    consider: 'It is basic; finance-heavy users may want a financial calculator instead.',
    targetPages: ['startup-planning-tools'],
    recommended: true,
    amazonAsin: 'B003822IRA',
  },
  {
    id: 'hp-12c',
    name: 'HP 12C Financial Calculator',
    category: 'Planning tools',
    bestFor: 'Founders who want a dedicated financial calculator',
    whyItHelps:
      'The HP 12C is a long-running financial calculator option for time value and finance calculations. It is overkill for basic MRR math but useful for founders who like dedicated finance tools.',
    consider: 'It has a learning curve and may be unnecessary if spreadsheets handle your finance work.',
    targetPages: ['startup-planning-tools'],
    recommended: true,
    amazonAsin: 'B00BT2T8UQ',
  },
  {
    id: 'full-focus-planner',
    name: 'Full Focus Planner',
    category: 'Planning tools',
    bestFor: 'Founders who want structured quarterly goals',
    whyItHelps:
      'A structured planner can help founders connect quarterly goals to weekly execution. It fits SaaS operators who need discipline around forecasts, experiments, and retention work.',
    consider: 'It is most useful if you consistently review goals and priorities.',
    targetPages: ['startup-planning-tools', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: '1732189692',
  },
  {
    id: 'pilot-frixion',
    name: 'Pilot FriXion Erasable Pens',
    category: 'Planning tools',
    bestFor: 'Reusable notebooks and editable planning notes',
    whyItHelps:
      'Erasable pens are useful when assumptions change frequently. They pair especially well with reusable notebooks and working forecast notes.',
    consider: 'Ink behavior can vary by paper and temperature.',
    targetPages: ['startup-planning-tools'],
    recommended: true,
    amazonAsin: 'B004DOMK2U',
  },
  {
    id: 'dell-u2723qe',
    name: 'Dell UltraSharp U2723QE 27-inch 4K Monitor',
    category: 'Office gear',
    bestFor: 'Founders working in dashboards and spreadsheets',
    whyItHelps:
      'A sharp 4K monitor gives more room for spreadsheets, analytics, documentation, and product work. It is a strong upgrade for operators who spend hours comparing metrics.',
    consider: 'It costs more than basic monitors and requires enough desk space.',
    targetPages: ['founder-office-setup', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B0CS844XW2',
  },
  {
    id: 'lg-ultrawide',
    name: 'LG UltraWide Monitor',
    category: 'Office gear',
    bestFor: 'Founders who keep many work surfaces open',
    whyItHelps:
      'An ultrawide display can make it easier to view a spreadsheet, dashboard, and notes side by side. It is useful for planning sessions and product operations work.',
    consider: 'Some users prefer two smaller monitors for window management.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B0B924GWLJ',
  },
  {
    id: 'logitech-mx-keys-s',
    name: 'Logitech MX Keys S Wireless Keyboard',
    category: 'Office gear',
    bestFor: 'Long writing, spreadsheet, and documentation sessions',
    whyItHelps:
      'A comfortable keyboard matters when founders spend long sessions writing docs, reviewing metrics, and working in spreadsheets. This is a practical productivity upgrade.',
    consider: 'Keyboard feel is personal; some users may prefer mechanical switches.',
    targetPages: ['founder-office-setup', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B0BKW3LB2B',
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Office gear',
    bestFor: 'Spreadsheet-heavy and multi-app workflows',
    whyItHelps:
      'A precise mouse with horizontal scrolling can make spreadsheet and dashboard work less tedious. It is useful for founders who move between docs, analytics, and finance models all day.',
    consider: 'It is larger than compact travel mice.',
    targetPages: ['founder-office-setup', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B09HM94VDS',
  },
  {
    id: 'rain-design-mstand',
    name: 'Rain Design mStand Laptop Stand',
    category: 'Office gear',
    bestFor: 'Desk setups using an external keyboard and monitor',
    whyItHelps:
      'A laptop stand lifts the screen closer to eye level and clears desk space. It is a simple upgrade for founders who work from a laptop every day.',
    consider: 'It works best with an external keyboard and mouse.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B000OOYECC',
  },
  {
    id: 'roost-stand',
    name: 'Roost Laptop Stand',
    category: 'Office gear',
    bestFor: 'Portable ergonomic setups',
    whyItHelps:
      'A portable stand helps founders maintain a better screen height while moving between home, office, and travel. It is useful for remote SaaS operators.',
    consider: 'It is more expensive than many basic laptop stands.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B01C9KG8IG',
  },
  {
    id: 'anker-usb-c-hub',
    name: 'Anker 555 USB-C Hub',
    category: 'Office gear',
    bestFor: 'Laptop workstations with monitors and accessories',
    whyItHelps:
      'A USB-C hub reduces friction when connecting displays, keyboards, storage, webcams, and microphones. It is useful for founders who use a laptop as the center of the workspace.',
    consider: 'Check port compatibility with your laptop and monitor before buying.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B087QZVQJX',
  },
  {
    id: 'benq-screenbar',
    name: 'BenQ ScreenBar Monitor Light',
    category: 'Office gear',
    bestFor: 'Evening work without harsh desk glare',
    whyItHelps:
      'A monitor light can improve desk visibility without taking up much space. It is useful for founders who work early mornings, evenings, or in dim rooms.',
    consider: 'Confirm it fits your monitor shape and webcam placement.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B08WT889V3',
  },
  {
    id: 'logitech-brio',
    name: 'Logitech Brio 4K Webcam',
    category: 'Office gear',
    bestFor: 'Founder sales calls, demos, and investor meetings',
    whyItHelps:
      'Clear video helps remote sales, demos, customer interviews, and team communication feel more professional. It is a practical upgrade if a laptop webcam looks weak.',
    consider: 'Lighting and internet quality still matter more than resolution alone.',
    targetPages: ['founder-office-setup', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B01N5UOYC4',
  },
  {
    id: 'blue-yeti',
    name: 'Blue Yeti USB Microphone',
    category: 'Office gear',
    bestFor: 'Calls, webinars, and recorded product walkthroughs',
    whyItHelps:
      'Better audio can improve demos, onboarding videos, customer interviews, and founder content. A USB microphone is a straightforward upgrade from laptop audio.',
    consider: 'It can pick up room noise if the workspace is untreated.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B00N1YPXW2',
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'Office gear',
    bestFor: 'Focused work and noisy environments',
    whyItHelps:
      'Noise-canceling headphones can help founders protect deep work blocks for modeling, writing, and product decisions. They are especially useful in shared or home environments.',
    consider: 'They are a premium purchase and fit preferences vary.',
    targetPages: ['founder-office-setup', 'saas-founder-toolkit'],
    recommended: true,
    amazonAsin: 'B09NM4R3NX',
  },
  {
    id: 'elgato-key-light-air',
    name: 'Elgato Key Light Air',
    category: 'Office gear',
    bestFor: 'Consistent lighting for video calls',
    whyItHelps:
      'Good lighting can make sales calls, customer interviews, and demos feel more polished. It is useful for founders who are often on camera.',
    consider: 'A desk lamp may be enough if video quality is not a priority.',
    targetPages: ['founder-office-setup'],
    recommended: true,
    amazonAsin: 'B082QHRZFW',
  },
];

export function getAffiliateUrl(product: AffiliateProduct) {
  if (product.amazonAsin) return amazonProductUrl(product.amazonAsin);
  return amazonSearchUrl(product.name);
}

export function getProductsForPage(slug: string) {
  return affiliateProducts.filter((product) => product.recommended && product.targetPages.includes(slug));
}

export type ResourcePage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  quickPickIds: string[];
  buyingGuide: string[];
  faq: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

export const resourcePages: ResourcePage[] = [
  {
    slug: 'best-saas-finance-books',
    title: 'Best SaaS Finance Books for Founders',
    description: 'Curated SaaS finance, subscription business, pricing, metrics, and startup finance books for founders.',
    intro:
      'This guide is for SaaS founders and operators who want stronger thinking around MRR, ARR, churn, pricing, customer acquisition, and startup finance. The books below are selected because they support better operating decisions, not because every founder needs a bigger bookshelf.',
    quickPickIds: ['saas-playbook', 'lean-analytics', 'monetizing-innovation', 'automatic-customer'],
    buyingGuide: [
      'Choose books that match the decision you are trying to improve. If the problem is retention, start with subscription and metrics books. If the problem is conversion or pricing, choose positioning and monetization books before adding another spreadsheet.',
      'Avoid treating any book as a substitute for your own customer and financial data. The best use is to improve how you frame assumptions, then test those assumptions with real MRR, churn, CAC payback, and retention numbers.',
      'For early-stage founders, prioritize practical books you will apply immediately. Dense finance references can be useful later, but they rarely fix unclear positioning, weak activation, or missing retention discipline.',
    ],
    faq: [
      { question: 'Are these books financial advice?', answer: 'No. They are educational resources. Use them to improve your understanding, then consult qualified professionals for financial, tax, legal, accounting, or investment decisions.' },
      { question: 'Should a pre-revenue founder buy SaaS finance books?', answer: 'A few can help, but pre-revenue founders should avoid overbuilding forecasts before validating demand, pricing, and customer pain.' },
      { question: 'What should I read first?', answer: 'If you are building a bootstrapped SaaS, start with a practical SaaS operating book and a metrics book, then add pricing or finance books when those decisions become urgent.' },
    ],
    relatedLinks: [
      { label: 'SaaS MRR calculator', href: '/calculator' },
      { label: 'What is MRR?', href: '/learn/what-is-mrr' },
      { label: 'CAC payback guide', href: '/learn/saas-cac-payback' },
      { label: 'Rule of 40 guide', href: '/learn/rule-of-40-saas' },
    ],
  },
  {
    slug: 'startup-planning-tools',
    title: 'Startup Planning Tools for SaaS Founders',
    description: 'Physical planning tools for SaaS founders who want clearer forecasting, goal setting, and operating reviews.',
    intro:
      'This guide covers simple physical planning tools that can support SaaS forecasting, weekly review, customer discovery, and quarterly planning. The goal is not to buy more stationery. The goal is to make assumptions, goals, and tradeoffs easier to see.',
    quickPickIds: ['moleskine-notebook', 'post-it-easel-pad', 'quartet-whiteboard', 'full-focus-planner'],
    buyingGuide: [
      'Start with the planning behavior you want. A notebook is enough for decision logs. A wall board is better for persistent targets. Sticky easel sheets are useful for strategy sessions and messy problem mapping.',
      'Keep the tool lightweight. SaaS founders already have plenty of software. Physical planning tools should reduce friction, not create another system to maintain.',
      'Use planning tools beside actual metrics. A quarterly planning sheet is stronger when it references current MRR, churn, CAC payback, NRR, and burn multiple rather than vague growth goals.',
    ],
    faq: [
      { question: 'Do SaaS founders need physical planning tools?', answer: 'Not always. They are useful when they make tradeoffs visible, improve focus, or help a team discuss assumptions more clearly.' },
      { question: 'What is the best planning tool for forecasting?', answer: 'A spreadsheet is still the main forecasting tool. Physical tools are better for notes, scenario framing, decision logs, and team planning.' },
      { question: 'Should I use a planner or a notebook?', answer: 'Use a planner if you want structure. Use a notebook if you want flexibility for customer notes, decision logs, and metric reviews.' },
    ],
    relatedLinks: [
      { label: 'Forecasting template', href: '/templates/saas-revenue-forecast' },
      { label: 'SaaS calculator toolkit', href: '/tools' },
      { label: 'Forecasting methodology', href: '/methodology' },
      { label: 'Burn multiple guide', href: '/learn/saas-burn-multiple' },
    ],
  },
  {
    slug: 'founder-office-setup',
    title: 'Best Home Office Setup Tools for SaaS Founders',
    description: 'Productivity-focused home office gear for SaaS founders, operators, and creators building subscription products.',
    intro:
      'This guide focuses on office gear that supports founder work: spreadsheets, dashboards, customer calls, demos, writing, and focused planning. It avoids random gadgets and prioritizes tools that make long operating sessions easier.',
    quickPickIds: ['dell-u2723qe', 'logitech-mx-keys-s', 'logitech-mx-master-3s', 'logitech-brio', 'sony-wh1000xm5'],
    buyingGuide: [
      'Prioritize the bottleneck in your workday. If spreadsheets feel cramped, upgrade display space. If calls sound weak, improve audio. If focus is the issue, noise control may matter more than another monitor.',
      'Check compatibility before buying. Monitors, hubs, webcams, and laptop stands depend on ports, desk size, operating system, and existing equipment.',
      'Avoid turning office setup into procrastination. The right gear supports customer calls, product work, and metric review. It does not replace positioning, retention work, or forecast discipline.',
    ],
    faq: [
      { question: 'What office upgrade helps SaaS founders most?', answer: 'For many founders, a better monitor or audio setup has the highest day-to-day impact because it improves spreadsheets, dashboards, calls, and demos.' },
      { question: 'Should I buy premium gear early?', answer: 'Only when it removes real friction. Early founders should protect cash and prioritize upgrades that directly improve work quality or communication.' },
      { question: 'Do these products affect revenue?', answer: 'Not directly. They can support productivity and communication, but revenue still depends on customer value, retention, pricing, and execution.' },
    ],
    relatedLinks: [
      { label: 'SaaS MRR calculator', href: '/calculator' },
      { label: 'SaaS finance guides', href: '/learn' },
      { label: 'Rule of 40 calculator', href: '/tools/rule-of-40-calculator' },
      { label: 'CAC payback calculator', href: '/tools/cac-payback-calculator' },
    ],
  },
  {
    slug: 'saas-founder-toolkit',
    title: 'SaaS Founder Toolkit',
    description: 'A curated toolkit of books, planning tools, and office gear for SaaS founders and startup operators.',
    intro:
      'The SaaS Founder Toolkit collects a small set of useful resources for learning, planning, and operating a recurring-revenue business. It is intentionally focused: books for better thinking, planning tools for better execution, and office gear for better work sessions.',
    quickPickIds: ['saas-playbook', 'lean-analytics', 'moleskine-notebook', 'dell-u2723qe', 'logitech-mx-master-3s'],
    buyingGuide: [
      'Build the toolkit around the work you actually do every week: customer research, forecast review, pricing decisions, retention analysis, writing, calls, and product planning.',
      'A good founder toolkit should improve clarity. If a purchase adds complexity or distracts from customers and metrics, skip it.',
      'Use the tools with Aura Revenue calculators and guides so recommendations stay tied to practical SaaS finance decisions instead of becoming generic productivity shopping.',
    ],
    faq: [
      { question: 'Is this a required founder shopping list?', answer: 'No. It is a curated resource list. Use only what solves a real bottleneck in your learning, planning, or work setup.' },
      { question: 'Why include office gear on a SaaS finance site?', answer: 'SaaS founders spend significant time in spreadsheets, dashboards, calls, and written planning. Office tools are included only when they support that work.' },
      { question: 'How should I prioritize the toolkit?', answer: 'Start with learning resources and simple planning tools. Upgrade office gear when your current setup slows down recurring work.' },
    ],
    relatedLinks: [
      { label: 'SaaS MRR calculator', href: '/calculator' },
      { label: 'SaaS calculator toolkit', href: '/tools' },
      { label: 'SaaS KPI glossary', href: '/learn/saas-kpi-glossary' },
      { label: 'Forecasting template', href: '/templates/saas-revenue-forecast' },
    ],
  },
];

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}

export function getProductById(id: string) {
  return affiliateProducts.find((product) => product.id === id);
}
