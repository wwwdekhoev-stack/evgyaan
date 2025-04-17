import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
    "Two Wheeler",
    "Four Wheeler",
    "Commercial Wheeler",
    "Dekho EV",
    "Follow and subscribe",
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
