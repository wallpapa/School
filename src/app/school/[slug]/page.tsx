import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  School,
  ExamResult,
  UniversityDestination,
  CATEGORY_LABELS,
  CURRICULUM_LABELS,
  TIER_LABELS,
  TierLevel,
} from "@/types/school";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSchool(slug: string) {
  const { data: school, error } = await supabase
    .from("schools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !school) return null;

  const [exams, unis] = await Promise.all([
    supabase
      .from("exam_results")
      .select("*")
      .eq("school_id", school.id)
      .order("year", { ascending: false }),
    supabase
      .from("university_destinations")
      .select("*")
      .eq("school_id", school.id)
      .order("is_top_50", { ascending: false }),
  ]);

  return {
    school: school as School,
    exams: (exams.data || []) as ExamResult[],
    universities: (unis.data || []) as UniversityDestination[],
  };
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b border-border py-2.5 text-sm last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (!score) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-xs text-muted">{label}</span>
      <div className="flex-1">
        <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-2 rounded-full bg-accent"
            style={{ width: `${score * 10}%` }}
          />
        </div>
      </div>
      <span className="w-8 text-right text-xs font-medium">{score}/10</span>
    </div>
  );
}

function formatFee(n: number) {
  return new Intl.NumberFormat("th-TH").format(n);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = await getSchool(slug);
  if (!result) return { title: "School Not Found" };
  return {
    title: `${result.school.name} | School Finder TH`,
    description: result.school.description || `Learn about ${result.school.name}`,
  };
}

export default async function SchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getSchool(slug);

  if (!result) notFound();

  const { school, exams, universities } = result;

  return (
    <>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; Back to schools
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{school.flag}</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{school.name}</h1>
            {school.name_th && (
              <p className="text-muted">{school.name_th}</p>
            )}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {school.tier && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                school.tier === "tier_1"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  : school.tier === "tier_2"
                    ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {TIER_LABELS[school.tier as TierLevel]}
            </span>
          )}
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            {CURRICULUM_LABELS[school.curriculum]}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {CATEGORY_LABELS[school.category]}
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          {school.description && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-3 text-lg font-semibold">About</h2>
              <p className="text-sm leading-relaxed text-muted">
                {school.description}
              </p>
              {school.description_th && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {school.description_th}
                </p>
              )}
            </section>
          )}

          {/* Pros */}
          {school.pros && school.pros.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-3 text-lg font-semibold">Highlights</h2>
              <ul className="space-y-2">
                {school.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-green-500">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Parent Fit */}
          {(school.parent_fit_authoritative ||
            school.parent_fit_authoritarian ||
            school.parent_fit_permissive) && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Parent Fit Scores</h2>
              <div className="space-y-3">
                <ScoreBar
                  label="Authoritative"
                  score={school.parent_fit_authoritative}
                />
                <ScoreBar
                  label="Authoritarian"
                  score={school.parent_fit_authoritarian}
                />
                <ScoreBar
                  label="Permissive"
                  score={school.parent_fit_permissive}
                />
                <ScoreBar
                  label="Uninvolved"
                  score={school.parent_fit_neglectful}
                />
              </div>
            </section>
          )}

          {/* Exam Results */}
          {exams.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Exam Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted">
                      <th className="pb-2 font-medium">Exam</th>
                      <th className="pb-2 font-medium">Year</th>
                      <th className="pb-2 font-medium">Avg Score</th>
                      <th className="pb-2 font-medium">Top Grade %</th>
                      <th className="pb-2 font-medium">Pass Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr
                        key={exam.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-2 font-medium">
                          {exam.exam.replace(/_/g, " ")}
                        </td>
                        <td className="py-2">{exam.year}</td>
                        <td className="py-2">{exam.average_score ?? "-"}</td>
                        <td className="py-2">
                          {exam.percentage_top_grade
                            ? `${exam.percentage_top_grade}%`
                            : "-"}
                        </td>
                        <td className="py-2">
                          {exam.pass_rate ? `${exam.pass_rate}%` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* University Destinations */}
          {universities.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">
                University Destinations
              </h2>
              <div className="flex flex-wrap gap-2">
                {universities.map((uni) => (
                  <span
                    key={uni.id}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      uni.is_top_50
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {uni.university_name}
                    {uni.is_top_50 && " (Top 50)"}
                    {uni.count > 1 && ` x${uni.count}`}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* EF Score */}
          {school.ef_score && (
            <section className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-xs text-muted">EF Score</p>
              <p
                className={`text-4xl font-bold ${
                  school.ef_score >= 8
                    ? "text-green-600 dark:text-green-400"
                    : school.ef_score >= 6
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                }`}
              >
                {school.ef_score}
              </p>
              <p className="text-xs text-muted">out of 10</p>
              {school.ef_note && (
                <p className="mt-2 text-xs text-muted">{school.ef_note}</p>
              )}
            </section>
          )}

          {/* Key Info */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold">Details</h2>
            <InfoRow label="Location" value={`${school.district || "-"}, ${school.city || "Bangkok"}`} />
            <InfoRow
              label="Annual Fee"
              value={
                school.fee_min && school.fee_max
                  ? `${formatFee(school.fee_min)} - ${formatFee(school.fee_max)} THB`
                  : school.fee_min
                    ? `from ${formatFee(school.fee_min)} THB`
                    : null
              }
            />
            <InfoRow label="Homework" value={school.has_homework ? "Yes" : "No"} />
            <InfoRow label="Testing" value={school.has_testing ? "Yes" : "No"} />
            <InfoRow label="Shadow Teacher" value={school.has_shadow_teacher ? "Yes" : "No"} />
            <InfoRow label="EP Program" value={school.has_ep_program ? "Yes" : "No"} />
            <InfoRow label="Boarding" value={school.has_boarding ? "Yes" : "No"} />
            <InfoRow label="Inclusive" value={school.is_inclusive ? "Yes" : "No"} />
          </section>

          {/* Tags */}
          {school.tags && school.tags.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-3 text-sm font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-1.5">
                {school.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 text-sm font-semibold">Links</h2>
            <div className="flex flex-col gap-2">
              {school.website && (
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  Website &rarr;
                </a>
              )}
              {school.facebook && (
                <a
                  href={school.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  Facebook &rarr;
                </a>
              )}
              {school.maps_query && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.maps_query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  Google Maps &rarr;
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
