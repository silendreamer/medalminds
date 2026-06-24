import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="breadcrumb-item">
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          {index < items.length - 1 && (
            <ChevronRight aria-hidden="true" className="breadcrumb-chevron" size={13} />
          )}
        </span>
      ))}
    </nav>
  );
}
