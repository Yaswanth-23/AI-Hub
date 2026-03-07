import { useAuth } from "../context/AuthContext";
import { createCheckout } from "../services/billingService";
import { useState } from "react";

const plans = [
  {
    name: "starter",
    label: "Starter",
    price: "$9",
    priceId: import.meta.env.VITE_STRIPE_STARTER,
  },
  {
    name: "pro",
    label: "Pro",
    price: "$29",
    priceId: import.meta.env.VITE_STRIPE_PRO,
    popular: true,
  },
  {
    name: "enterprise",
    label: "Enterprise",
    price: "$99",
    priceId: import.meta.env.VITE_STRIPE_ENTERPRISE,
  },
];

const features = [
  {
    name: "Monthly Tokens",
    values: ["5k", "Unlimited", "Unlimited"],
  },
  {
    name: "AI Priority",
    values: ["Basic", "Priority", "Dedicated"],
  },
  {
    name: "Team Access",
    values: ["—", "Up to 3 users", "Unlimited"],
  },
  {
    name: "Analytics Dashboard",
    values: ["—", "Basic", "Advanced"],
  },
  {
    name: "Support",
    values: ["Community", "Priority Email", "Dedicated Manager"],
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleSubscribe = async (priceId, planName) => {
    try {
      setLoadingPlan(planName);
      await createCheckout(priceId);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen text-white px-6 md:px-10 py-14 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="text-white/40 text-sm mt-2">
          Upgrade your workspace to unlock more power
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.name;

          return (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 flex flex-col justify-between ${
                plan.popular
                  ? "border-purple-500 bg-white/5"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">
                    {plan.label}
                  </h2>

                  {plan.popular && (
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded-md">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-sm text-white/40"> /month</span>
                </p>
              </div>

              <button
                disabled={isCurrent || loadingPlan === plan.name}
                onClick={() =>
                  handleSubscribe(plan.priceId, plan.name)
                }
                className={`w-full py-2 rounded-lg transition ${
                  isCurrent
                    ? "bg-white/10 cursor-not-allowed text-white/40"
                    : plan.popular
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {isCurrent
                  ? "Current Plan"
                  : loadingPlan === plan.name
                  ? "Redirecting..."
                  : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Full Feature Comparison
        </h2>

        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="text-left px-6 py-4">Feature</th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`px-6 py-4 text-center ${
                      plan.popular ? "text-purple-400" : ""
                    }`}
                  >
                    {plan.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={index % 2 === 0 ? "bg-white/[0.02]" : ""}
                >
                  <td className="px-6 py-4 text-white/70">
                    {feature.name}
                  </td>

                  {feature.values.map((value, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 text-center text-white/80"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}