const ITEMS = [
  'Figma links', 'Pitch decks', 'Portfolios', 'Google Docs',
  'Notion pages', 'Contracts', 'Proposals', 'PDFs',
  'Loom videos', 'Webflow sites', 'Canva designs', 'Invoices',
  'Framer prototypes', 'Google Drive files', 'Dropbox links',
  'Job offers', 'NDA documents', 'Legal docs', 'Investor updates',
  'Research reports', 'Case studies', 'Brand guidelines', 'Spreadsheets',
]

function Item({ label }: { label: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mx-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] opacity-70" />
      <span className="text-sm text-zinc-300 whitespace-nowrap">{label}</span>
    </div>
  )
}

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <section className="py-16 overflow-hidden border-y border-zinc-900">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600 mb-8">
        Gate anything with a URL
      </p>
      <div className="relative">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
        {/* Track */}
        <div className="flex animate-marquee">
          {doubled.map((item, i) => <Item key={i} label={item} />)}
        </div>
      </div>
    </section>
  )
}
