import Link from 'next/link';

export function AuthorReviewBlock() {
  return (
    <aside
      aria-label="Article trust and review information"
      className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300"
    >
      <dl className="grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">Written by</dt>
          <dd>Aura Revenue Editorial</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Reviewed for clarity</dt>
          <dd>April 2026</dd>
        </div>
      </dl>
      <p className="mt-3 border-t border-white/10 pt-3 text-slate-400">
        Educational content only. Not financial, tax, legal, accounting, or investment advice. See the{' '}
        <Link className="text-teal-300 hover:text-teal-200" href="/editorial-policy">
          Editorial Policy
        </Link>{' '}
        and{' '}
        <Link className="text-teal-300 hover:text-teal-200" href="/terms">
          Terms
        </Link>
        .
      </p>
    </aside>
  );
}
