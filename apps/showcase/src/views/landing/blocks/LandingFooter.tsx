import { Icon, TbIcons } from '@vn-dylan/icons'
import { Reveal } from '@/views/landing/blocks/Reveal'

const links = [
  {
    label: 'Repository',
    href: 'https://github.com/VN-Dylan/Dylan.DesignSystem',
  },
  {
    label: 'Storybook',
    href: 'https://github.com/VN-Dylan/Dylan.DesignSystem#storybook',
    note: 'pnpm storybook',
  },
  {
    label: 'DESIGN.md',
    href: 'https://github.com/VN-Dylan/Dylan.DesignSystem/blob/main/DESIGN.md',
  },
]

/** Chrome-free landing footer with reference links. */
export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8 text-sm text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Internal reference build. Built for evaluation and implementation handoff.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-content-muted transition hover:text-content"
              >
                <span>{link.label}</span>
                {link.note && (
                  <span className="font-mono text-xs text-content-faint">{link.note}</span>
                )}
                <Icon as={TbIcons.TbExternalLink} size={14} />
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  )
}
