import type { ReactNode } from 'react';
import { useSite } from '../SiteContext';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  const { t } = useSite();
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t.external}</span>
    </a>
  );
}
