type SignalLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function SignalLink({
  href,
  children,
  variant = 'secondary',
  onClick,
}: SignalLinkProps) {
  const isPrimary = variant === 'primary'

  return (
    <a
      className={[
        'inline-flex min-h-11 items-center justify-center border px-5 font-mono text-xs uppercase tracking-normal transition',
        isPrimary
          ? 'border-signal bg-signal text-ink hover:bg-paper'
          : 'border-line bg-ink-soft text-paper hover:border-signal hover:text-signal',
      ].join(' ')}
      data-magnetic
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
