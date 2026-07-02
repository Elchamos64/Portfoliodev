interface TerminalWindowProps {
  /** Text shown in the title bar, e.g. "~/oscar-ramos — zsh" */
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div className={`border border-border bg-surface font-mono shadow-sm ${className ?? ''}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-3 w-3 border border-border bg-surface-2" />
        <span className="h-3 w-3 border border-border bg-surface-2" />
        <span className="h-3 w-3 border border-border bg-surface-2" />
        <span className="ml-2 text-xs text-muted truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}
