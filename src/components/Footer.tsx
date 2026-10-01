import { Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-space-900/60">
      <div className="container-vectra py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="3" fill="#5ec8d8" />
                <ellipse cx="14" cy="14" rx="11" ry="4.5" stroke="#a8d5e8" strokeOpacity="0.35" strokeWidth="1" transform="rotate(-20 14 14)" />
                <circle cx="24" cy="9" r="1.2" fill="#a8d5e8" />
              </svg>
              <span className="font-display text-base font-semibold tracking-wider text-star-white">
                VECTRA
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed text-star-white/40">
              An interactive physics and space-science platform. Making the universe
              more intuitive, one simulation at a time.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn
              title="Platform"
              links={[
                { label: 'Explore', href: '#explore' },
                { label: 'Simulations', href: '#simulations' },
                { label: 'Learn', href: '#learn' },
              ]}
            />
            <FooterColumn
              title="Project"
              links={[
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#about' },
              ]}
            />
            <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
              <h3 className="font-mono text-eyebrow uppercase tracking-widest-2 text-star-white/30">
                Connect
              </h3>
              <div className="flex gap-3">
                <a
                  href="#about"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-star-white/40 transition-colors hover:border-surface-border-hover hover:text-accent-cyan"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="#about"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-star-white/40 transition-colors hover:border-surface-border-hover hover:text-accent-cyan"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-star-white/25">
            © {new Date().getFullYear()} VECTRA. An educational project.
          </p>
          <p className="font-mono text-xs text-star-white/25">
            Built for curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-eyebrow uppercase tracking-widest-2 text-star-white/30">
        {title}
      </h3>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="font-body text-sm text-star-white/50 transition-colors hover:text-star-white"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
