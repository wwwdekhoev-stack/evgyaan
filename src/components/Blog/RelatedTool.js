import Link from "next/link";

// Tags that flag an article as being about charging infrastructure / the
// economics of running a charger, rather than a vehicle itself.
const CHARGING_SIGNALS = [
  "charg", // covers charging / charger / chargers / charging infra
  "battery swap",
];

// Tags that flag an article as a numbers-led monthly data report rather than
// a vehicle buying-decision story (launch, comparison, review, price).
const DATA_REPORT_SIGNALS = [
  "registrations",
  "vahan",
  "state-wise",
  "market share",
  "production capacity",
];

function hasAny(joined, signals) {
  return signals.some((s) => joined.includes(s));
}

// Picks at most one related tool for an article, per the internal-linking
// rules: charging/infra -> ROI calculator, car/scooter buying-decision ->
// buying guide, everything else (policy, bus/truck, pure sales-data) -> none.
export function getRelatedTool(tags = []) {
  const joined = tags.join(" ").toLowerCase();

  if (hasAny(joined, CHARGING_SIGNALS)) {
    return {
      href: "/ev-roi-calculator",
      title: "Thinking about installing a charger?",
      body:
        "Run your own numbers on the EV Charger ROI Calculator — payback period, monthly profit and investment needed, in under a minute.",
      cta: "Calculate your charger ROI",
    };
  }

  const isVehicleCategory =
    joined.includes("two wheel") ||
    joined.includes("two-wheel") ||
    joined.includes("electric scooter") ||
    joined.includes("electric car") ||
    joined.includes("electric suv") ||
    joined.includes("ev launch");

  if (isVehicleCategory && !hasAny(joined, DATA_REPORT_SIGNALS)) {
    return {
      href: "/ev-buying-guide",
      title: "Not sure which EV is right for you?",
      body:
        "Get the free EV Buying Decision Guide — real range vs claimed range, and a clear buy-or-wait answer based on your own situation.",
      cta: "Get the free buying guide",
    };
  }

  return null;
}

const RelatedTool = ({ tags }) => {
  const tool = getRelatedTool(tags);
  if (!tool) return null;

  return (
    <div className="my-8 rounded-lg border border-accent/40 bg-accent/10 p-5 sm:p-6 not-prose">
      <p className="text-sm font-bold uppercase tracking-wide text-dark/70">
        {tool.title}
      </p>
      <p className="mt-1.5 text-sm text-gray leading-relaxed">{tool.body}</p>
      <Link
        href={tool.href}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-dark hover:underline decoration-accent decoration-2 underline-offset-2"
      >
        {tool.cta} &rarr;
      </Link>
    </div>
  );
};

export default RelatedTool;
