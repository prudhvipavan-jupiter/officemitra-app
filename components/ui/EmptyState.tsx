import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon className="h-7 w-7 text-navy-600" strokeWidth={1.5} />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-navy-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
