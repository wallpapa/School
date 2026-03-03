import { supabase } from "@/lib/supabase";
import { School, CURRICULUM_LABELS, TIER_LABELS, TierLevel } from "@/types/school";

async function getTopSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .eq("is_active", true)
    .eq("tier", "tier_1")
    .order("ef_score", { ascending: false, nullsFirst: false })
    .limit(10);

  if (error) throw error;
  return data as School[];
}

function formatFee(n: number | null) {
  if (!n) return "-";
  return new Intl.NumberFormat("th-TH").format(n);
}

export const metadata = {
  title: "Compare Schools | School Finder TH",
  description: "Compare top tier schools in Thailand side by side.",
};

export default async function ComparePage() {
  const schools = await getTopSchools();

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">
        Compare Top Schools
      </h1>
      <p className="mb-8 text-sm text-muted">
        Side-by-side comparison of Tier 1 schools ranked by EF Score.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left text-xs text-muted">
              <th className="sticky left-0 bg-card px-4 py-3 font-medium">School</th>
              <th className="px-4 py-3 font-medium">Curriculum</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">EF Score</th>
              <th className="px-4 py-3 font-medium">Fee Min</th>
              <th className="px-4 py-3 font-medium">Fee Max</th>
              <th className="px-4 py-3 font-medium">District</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-accent-light/30">
                <td className="sticky left-0 bg-card px-4 py-3 font-medium">
                  <a href={`/school/${s.slug}`} className="text-accent hover:underline">
                    {s.flag} {s.short_name}
                  </a>
                </td>
                <td className="px-4 py-3">{CURRICULUM_LABELS[s.curriculum]}</td>
                <td className="px-4 py-3">
                  {s.tier ? TIER_LABELS[s.tier as TierLevel] : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-bold ${
                      (s.ef_score || 0) >= 8
                        ? "text-green-600"
                        : (s.ef_score || 0) >= 6
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {s.ef_score ?? "-"}
                  </span>
                </td>
                <td className="px-4 py-3">{formatFee(s.fee_min)}</td>
                <td className="px-4 py-3">{formatFee(s.fee_max)}</td>
                <td className="px-4 py-3">{s.district || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
