export default function PlanBadge({ plan }) {
  return (
    <span className="px-4 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full tracking-wide">
      {plan.toUpperCase()} PLAN
    </span>
  );
}