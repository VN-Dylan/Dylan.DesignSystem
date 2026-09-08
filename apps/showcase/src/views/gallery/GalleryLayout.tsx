import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button, Dropdown } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { themeSchemaNames } from '@vn-dylan/tokens'
import { useThemeStore } from '@/store/themeStore'
import { Logo } from '@/components/template/Logo'
import { galleryCategories, galleryComponentCount } from '@/views/gallery/galleryConfig'

const REPO_URL = 'https://github.com/VN-Dylan/Dylan.DesignSystem'

/** Runtime theme controls shared by the top bar (desktop) and the menu sheet. */
function ThemeToolbar() {
  const { mode, schema, direction, toggleMode, setSchema, toggleDirection } = useThemeStore()
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="default"
        shape="circle"
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        icon={<Icon as={mode === 'dark' ? TbIcons.TbSun : TbIcons.TbMoon} size={16} />}
        onClick={toggleMode}
      />
      <Button
        size="sm"
        variant="default"
        aria-label="Toggle text direction"
        onClick={toggleDirection}
      >
        {direction.toUpperCase()}
      </Button>
      <Dropdown
        placement="bottom-end"
        activeKey={schema}
        renderTitle={
          <Button
            size="sm"
            variant="default"
            icon={<Icon as={TbIcons.TbPalette} size={16} />}
            iconAlignment="start"
          >
            <span className="capitalize">{schema}</span>
          </Button>
        }
      >
        {themeSchemaNames.map((name) => (
          <Dropdown.Item key={name} eventKey={name} onClick={() => setSchema(name)}>
            <span className="capitalize">{name}</span>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}

function CategoryRail({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Component categories" className="space-y-1">
      <NavLink
        to="/gallery"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
            isActive
              ? 'bg-primary-subtle font-medium text-primary'
              : 'text-content-muted hover:bg-surface-sunken hover:text-content'
          }`
        }
      >
        <Icon as={TbIcons.TbSparkles} size={18} />
        Foundations
      </NavLink>
      {galleryCategories.map((category) => (
        <NavLink
          key={category.slug}
          to={`/gallery/${category.slug}`}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition ${
              isActive
                ? 'bg-primary-subtle font-medium text-primary'
                : 'text-content-muted hover:bg-surface-sunken hover:text-content'
            }`
          }
        >
          <span className="flex items-center gap-2">
            <Icon as={category.icon} size={18} />
            {category.title}
          </span>
          <span className="font-mono text-xs text-content-faint">{category.components.length}</span>
        </NavLink>
      ))}
    </nav>
  )
}

/**
 * Dedicated full-screen shell for the component gallery: a sticky top bar with
 * live theme controls, a persistent category rail (a collapsible sheet below
 * `lg`) and the routed category page.
 */
export function GalleryLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg text-content">
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="plain"
              shape="circle"
              className="lg:hidden"
              aria-label="Toggle category menu"
              aria-expanded={menuOpen}
              icon={<Icon as={menuOpen ? TbIcons.TbX : TbIcons.TbMenu2} size={18} />}
              onClick={() => setMenuOpen((open) => !open)}
            />
            <Logo />
            <span className="hidden font-mono text-xs text-content-faint sm:inline">
              {galleryComponentCount} components
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToolbar />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md p-2 text-content-muted transition hover:bg-surface-sunken hover:text-content sm:inline-flex"
              aria-label="Open the repository on GitHub"
            >
              <Icon as={TbIcons.TbBrandGithub} size={18} />
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24">
            <CategoryRail />
          </div>
        </aside>

        {menuOpen && (
          <div className="fixed inset-x-0 top-[57px] z-10 border-b border-border bg-surface p-4 lg:hidden">
            <CategoryRail onNavigate={() => setMenuOpen(false)} />
          </div>
        )}

        <main className="min-w-0 flex-1 pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
