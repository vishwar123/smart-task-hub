import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  accent?: string;
}

const StatsCard = ({ title, value, icon: Icon, accent }: StatsCardProps) => (
  <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4 transition-shadow hover:shadow-md">
    <div className={`rounded-lg p-3 ${accent || "bg-primary/10 text-primary"}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
    </div>
  </div>
);

export default StatsCard;
