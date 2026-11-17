// The sources a story rests on.
//
// A news site that says "a report said" without naming the outlet gives a
// reader no way to check anything, and it is the first thing a sponsor's
// diligence or a news surface's review looks for. The list is rendered
// from frontmatter rather than typed into each article's body so it always
// looks the same and can never be half-written.
const ArticleSources = ({ sources }) => {
  if (!Array.isArray(sources) || sources.length === 0) return null;

  const items = sources
    .map((s) => (typeof s === "string" ? { name: s } : s))
    .filter((s) => s && s.name);

  if (items.length === 0) return null;

  return (
    <section className="mt-10 border-t border-borderSoft pt-5">
      <h2 className="text-xs font-bold uppercase tracking-wide text-dark">
        Sources
      </h2>
      <ul className="mt-2 flex flex-col gap-1 text-sm text-gray">
        {items.map((source, i) => (
          <li key={`${source.name}-${i}`}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-dark underline decoration-accent decoration-2 underline-offset-2"
              >
                {source.name}
              </a>
            ) : (
              source.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticleSources;
