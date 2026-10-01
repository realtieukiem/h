import { useEffect, useState } from 'react';
import type { PageId } from '../routes';
import { useSite } from '../SiteContext';

export function Navbar() {
  const { page, data, t, asset, href } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const items: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'extras', label: t.nav.extras },
    { id: 'privacy', label: t.nav.privacy },
  ];

  const avatar = data.site.profile.avatar;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="brand" href={href('home')}>
          <span className="brand__mark">
            <img src={asset(avatar.src)} width={avatar.width} height={avatar.height} alt="" />
          </span>
          <span className="brand__name">{data.site.brand}</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="navbar__bars" aria-hidden="true" />
        </button>

        <nav id="primary-nav" className={`navbar__nav${open ? ' is-open' : ''}`} aria-label={t.nav.primary}>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  aria-current={item.id === page ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
