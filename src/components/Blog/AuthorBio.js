import Image from "next/image";
import Link from "next/link";

// getAuthor() has always returned bio/image/credential/socials - until now
// nothing on the article page used them, so every article ended with no
// statement of who wrote it or why they'd know. For a site whose whole
// positioning is "honest, data-driven, no brand pressure", that byline
// context is the E-E-A-T signal and the reader-to-subscriber path.
const AuthorBio = ({ author }) => {
  if (!author) return null;

  return (
    <aside className="mt-10 rounded-lg bg-bgSoft p-5 sm:p-6">
      <div className="flex items-start gap-4">
        {author.image && (
          <Image
            src={author.image}
            alt=""
            width={64}
            height={64}
            sizes="64px"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 bg-light"
          />
        )}
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-gray">Written by</p>
          <Link
            href={author.path}
            rel="author"
            className="mt-0.5 inline-block text-lg font-semibold text-dark hover:underline decoration-accent decoration-2 underline-offset-2"
          >
            {author.name}
          </Link>
          <p className="mt-2 text-sm text-gray leading-relaxed">{author.bio}</p>
          {author.credential && (
            <p className="mt-2 text-xs text-gray leading-relaxed">{author.credential}</p>
          )}
          {author.socials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {author.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-dark underline decoration-accent decoration-2 underline-offset-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AuthorBio;
