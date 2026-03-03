import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { School } from "@/types/school";
import SchoolCard from "@/components/SchoolCard";
import Filters from "@/components/Filters";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    curriculum?: string;
    tier?: string;
  }>;
}

async function getSchools(params: {
  q?: string;
  category?: string;
  curriculum?: string;
  tier?: string;
}): Promise<School[]> {
  let query = supabase
    .from("schools")
    .select("*")
    .eq("is_active", true)
    .order("tier", { ascending: true })
    .order("ef_score", { ascending: false, nullsFirst: false });

  if (params.q) {
    query = query.or(
      `name.ilike.%${params.q}%,short_name.ilike.%${params.q}%,name_th.ilike.%${params.q}%,district.ilike.%${params.q}%`
    );
  }
  if (params.category) {
    query = query.eq("category", params.category);
  }
  if (params.curriculum) {
    query = query.eq("curriculum", params.curriculum);
  }
  if (params.tier) {
    query = query.eq("tier", params.tier);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as School[];
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const schools = await getSchools(params);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Find the Best School in Thailand
        </h1>
        <p className="mt-1 text-sm text-muted">
          Compare {schools.length} schools across curricula, tiers, and fees.
        </p>
      </div>

      <Suspense fallback={null}>
        <Filters />
      </Suspense>

      {schools.length === 0 ? (
        <div className="py-20 text-center text-muted">
          <p className="text-lg">No schools found</p>
          <p className="mt-1 text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </>
  );
}
