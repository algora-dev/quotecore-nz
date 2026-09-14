import HeroMotion from "./HeroMotion";
import "./quote-core-refined-hero.css";

/** Server component: all copy exists in the first HTML response. */
export default function QuoteCoreRefinedHero({ id = "quotecore-workflow-hero" }: { id?: string }) {
  return (
    <section id={id} className="qch-hero" data-qch-hero data-qch-preparing="" tabIndex={0} aria-label="QuoteCore+ workflow introduction">
<noscript><style>{`.qch-hero[data-qch-preparing] .qch-scene--workflow { opacity: 1; }`}</style></noscript>
<div className="qch-access-controls"><button type="button" data-qch-toggle>Pause animation</button><button type="button" data-qch-skip>Show full workflow</button><button type="button" data-qch-replay>Replay animation</button></div>
<div className="qch-stage"><div className="qch-scene qch-scene--opening" data-qch-scene="opening" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Does this<br /><span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">look familiar?</span></span></p></div>
</div>
<div className="qch-scene qch-scene--story" data-qch-scene="plans" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Print the plans.</p></div>
<ul className="qch-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Measure by hand.</span></li>
<li className="qch-item qch-reveal" data-qch-row="1"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text"><span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">Write it all down.</span></span></span></li>
</ul>
</div>
<div className="qch-scene qch-scene--story" data-qch-scene="site" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Drive out.</p></div>
<ul className="qch-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Measure the roof.</span></li>
<li className="qch-item qch-reveal" data-qch-row="1"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text"><span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">Drive back.</span></span> Start pricing.</span></li>
</ul>
</div>
<div className="qch-scene qch-scene--story" data-qch-scene="satellite" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Measure from satellite.</p></div>
<ul className="qch-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Apply your <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">square area rate.</span></span></span></li>
</ul>
</div>
<div className="qch-scene qch-scene--story" data-qch-scene="pricing" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Transfer the measurements.</p></div>
<ul className="qch-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">To a <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">spreadsheet or app.</span></span></span></li>
<li className="qch-item qch-reveal" data-qch-row="1"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Work out the price.</span></li>
</ul>
</div>
<div className="qch-scene qch-scene--story" data-qch-scene="documents" aria-hidden="true">
<div className="qch-title-slot"><p className="qch-title qch-reveal" data-qch-title>Move the numbers again.</p></div>
<ul className="qch-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Build the quote.</span></li>
<li className="qch-item qch-reveal" data-qch-row="1"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Then the <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">order</span></span>. Then the <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">invoice</span></span>.</span></li>
</ul>
</div>
<div className="qch-scene qch-scene--workflow" data-qch-scene="workflow">
<div className="qch-title-slot"><h1 className="qch-title qch-reveal" data-qch-title>We built QuoteCore+<br />around the way you already work.</h1></div>
<ul className="qch-list qch-workflow-list">
<li className="qch-item qch-reveal" data-qch-row="0"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text"><span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">Measure digitally</span></span> or add your measurements.</span></li>
<li className="qch-item qch-reveal" data-qch-row="1"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Your pricing is calculated <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">automatically.</span></span><small>(using your saved rates and rules)</small></span></li>
<li className="qch-item qch-reveal" data-qch-row="2"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text"><span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">Generate and send</span></span> the quote.</span></li>
<li className="qch-item qch-reveal" data-qch-row="3"><span className="qch-bullet" aria-hidden="true"></span><span className="qch-text">Easily send an <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">order or invoice</span></span> from the same job.</span></li>
</ul>
<p className="qch-reuse qch-reveal" data-qch-reuse>Everything saved. <span className="qch-em"><span className="qch-glow" aria-hidden="true"></span><span className="qch-em-ink">Ready to reuse.</span></span></p>
</div></div>
<p className="qch-sr">QuoteCore+ connects measurement, pricing and quoting. Start from plans, satellite imagery or measurements you already have. The free tools provide a way to try the workflow; saving and reusing jobs, rates and rules uses the full app.</p>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var r=document.currentScript&&document.currentScript.parentElement;if(!r)return;setTimeout(function(){if(r.hasAttribute('data-qch-preparing')){r.removeAttribute('data-qch-preparing');r.setAttribute('data-qch-static','');}},2500);})();` }} />
      <HeroMotion targetId={id} />
    </section>
  );
}
