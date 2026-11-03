import { formatIN } from "@/src/utils";

// Dependency-free month-over-month bar comparison (no charting library in
// this stack, and this is simple enough not to need one).
const MoMBars = ({ label, points }) => {
  if (!points || points.length === 0) return null;
  const max = Math.max(...points.map((p) => p.total));

  return (
    <div className="py-3">
      <p className="text-sm font-semibold text-dark mb-2">{label}</p>
      <div className="flex flex-col gap-2">
        {points.map((p) => (
          <div key={p.month} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-gray">{p.label}</span>
            <div className="flex-1 h-6 rounded bg-borderSoft/60 overflow-hidden">
              <div
                className="h-full rounded bg-accent flex items-center justify-end pr-2"
                style={{ width: `${Math.max(6, (p.total / max) * 100)}%` }}
              >
                <span className="text-[11px] font-bold text-dark whitespace-nowrap">
                  {formatIN(p.total)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoMBars;
