import { Settings, ExternalLink, Database, Mail } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";

export default function SettingsPage() {
  return (
    <>
      <AdminPageHeader
        title="Settings"
        description="Environment and operational reference."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Environment" icon={Database}>
          <Row label="NEXT_PUBLIC_SITE_URL" value={process.env.NEXT_PUBLIC_SITE_URL} />
          <Row
            label="NEXT_PUBLIC_SUPABASE_URL"
            value={process.env.NEXT_PUBLIC_SUPABASE_URL}
            mask
          />
          <Row
            label="SUPABASE_SERVICE_ROLE_KEY"
            value={process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing"}
          />
          <Row
            label="ADMIN_EMAILS"
            value={process.env.ADMIN_EMAILS ?? "(none)"}
          />
        </Card>

        <Card title="Email" icon={Mail}>
          <Row
            label="RESEND_API_KEY"
            value={process.env.RESEND_API_KEY ? "configured" : "missing"}
          />
          <Row
            label="CONTACT_EMAIL_FROM"
            value={process.env.CONTACT_EMAIL_FROM ?? "(default)"}
          />
          <Row
            label="CONTACT_EMAIL_TO"
            value={process.env.CONTACT_EMAIL_TO ?? "(none)"}
          />
        </Card>

        <Card title="Operational" icon={Settings} className="lg:col-span-2">
          <p className="text-sm text-zinc-400">
            Editing site content is done via the admin pages in the sidebar.
            Storage buckets and database schema are provisioned via the Supabase
            migrations under{" "}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-200">
              supabase/migrations/
            </code>
            .
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://supabase.com/dashboard/project/_/sql/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-blue hover:text-white transition-colors"
              >
                Open Supabase SQL editor <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://resend.com/api-keys"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-blue hover:text-white transition-colors"
              >
                Manage Resend API keys <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}

function Card({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-md p-6 " +
        (className ?? "")
      }
    >
      <header className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-accent-blue" />
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  mask = false,
}: {
  label: string;
  value: string | undefined;
  mask?: boolean;
}) {
  const display = !value ? "—" : mask ? value.slice(0, 30) + "…" : value;
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.04] last:border-0">
      <code className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
        {label}
      </code>
      <code className="font-mono text-xs text-zinc-200 truncate max-w-[60%]">
        {display}
      </code>
    </div>
  );
}
