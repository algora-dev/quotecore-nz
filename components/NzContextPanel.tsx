type NzContextItem = {
  title: string;
  description: string;
};

export default function NzContextPanel({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: NzContextItem[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BD4A1A]">New Zealand workflow</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">{intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
