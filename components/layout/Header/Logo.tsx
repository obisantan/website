import { siteConfig } from '@/config/site';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          color: "var(--color-surface)",
        }}
      >
        {siteConfig.initials}
      </div>
      <div>
        <div className="text-lg font-semibold">{siteConfig.name}</div>
        <div className="text-xs text-[color:var(--color-accent)]">
          {siteConfig.role}
        </div>
      </div>
    </div>
  );
}
