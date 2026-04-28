type AdPlaceholderProps = {
  position: 'home-after-intro' | 'article-mid' | 'article-before-related' | 'article-bottom';
};

const labels: Record<AdPlaceholderProps['position'], string> = {
  'home-after-intro': 'Future sponsor area',
  'article-mid': 'Future article ad area',
  'article-before-related': 'Future related-content ad area',
  'article-bottom': 'Future bottom ad area',
};

export function AdPlaceholder({ position }: AdPlaceholderProps) {
  return (
    <aside
      aria-label={labels[position]}
      data-ad-position={position}
      data-ad-enabled="false"
      className="my-10 rounded-lg border border-dashed border-white/10 bg-white/[0.025] px-4 py-5 text-center text-xs uppercase tracking-[0.16em] text-slate-600"
    >
      {labels[position]} reserved
    </aside>
  );
}
