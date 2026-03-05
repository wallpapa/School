-- ============================================================================
-- School Academic Performance Data
-- Researched: March 2026
-- Sources: Official school websites, WhichSchoolAdvisor, Bangkok Post, Nord Anglia
-- ============================================================================

-- IMPORTANT NOTES:
-- 1. Concordian (ID 17) offers IB, NOT AP as originally assumed
-- 2. ICS (ID 14) offers AP, NOT IB as originally assumed
-- 3. Dulwich College Bangkok (ID 21) opens August 2026 — NO results yet
-- 4. Wellington College Bangkok (ID 10) first IGCSE in 2024, first A-Level in 2026
-- 5. St Andrews (ID 8) offers IGCSE + IB (not A-Level)

-- ============================================================================
-- 1. KIS International School (ID 5) — Full IB
-- ============================================================================

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  5, '2023-2024', 'ib',
  NULL, NULL, NULL, 35.0,
  'Over 1/3 of graduating class scored 40+',
  '{"5_year_average": 34.5, "world_average": 30, "note": "Consistently above world average for 5+ years"}',
  NULL, NULL, NULL, NULL,
  '["University of Toronto", "University of Manchester", "National University of Singapore", "Oxford University", "Cambridge University", "Harvard University", "Stanford University"]',
  NULL,
  NULL, NULL,
  'https://www.kis.ac.th/learn/academic-results', 'KIS Official Website', true
);

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  5, '2024-2025', 'ib',
  NULL, NULL, NULL, NULL,
  NULL,
  '{"note": "2025 results not yet published as of March 2026. 5-year average is 34.5."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://www.kis.ac.th/learn/academic-results', 'KIS Official Website', false
);


-- ============================================================================
-- 2. Wellington College Bangkok (ID 10) — IGCSE + A-Level
-- ============================================================================

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  10, '2023-2024', 'igcse',
  NULL, NULL, NULL, NULL,
  NULL,
  '{"note": "First-ever IGCSE exams sat in summer 2024. School described results as huge success but detailed breakdown not published. A-Level results not available until 2026 (first cohort)."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://www.wellingtoncollege.ac.th/', 'Wellington College Bangkok Official Website', true
);


-- ============================================================================
-- 3. Regent''s International School (ID 11) — IGCSE + IB
-- ============================================================================

-- IGCSE Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  11, '2023-2024', 'igcse',
  47.0, NULL, NULL, NULL,
  NULL,
  '{"a_star_a_pct": 47, "note": "47% of grades at A*-A distinction"}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://regents.ac.th/academics/academic-results/igcse/', 'Regent''s Official Website', true
);

-- IB Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  11, '2023-2024', 'ib',
  NULL, NULL, 100.0, 37.1,
  NULL,
  '{"pass_rate": 100, "avg_score": 37.1, "note": "100% pass rate, one of the best IB results in Thailand and South East Asia"}',
  NULL, NULL, NULL, NULL,
  '["Oxford University", "Cambridge University", "LSE", "Imperial College London", "Stanford University", "Cornell University", "UCLA"]',
  NULL,
  NULL, NULL,
  'https://regents.ac.th/academics/academic-results/ibdp/', 'Regent''s Official Website / Success Abroad', true
);


-- ============================================================================
-- 4. Brighton College Bangkok (ID 12) — IGCSE + A-Level
-- ============================================================================

-- 2024 A-Level Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  12, '2023-2024', 'a_level',
  80.0, 50.0, 100.0, NULL,
  'Tui: 4 A* grades (Imperial College London Biological Sciences); Thames: 3 A* + 1 A (Imperial College London Computer Science); Tittle: 3 A* (LSE Actuarial Sciences); Poppy: 3 A* (Durham Law)',
  '{"a_star_a_pct": 80, "a_star_pct": 50, "a_star_b_pct": 75, "pass_rate": 100}',
  NULL, NULL, NULL, NULL,
  '["Imperial College London", "King''s College London", "University of Warwick", "University of Durham", "Emory University", "LSE"]',
  '["British International School of the Year - Independent Schools of the Year Awards 2024"]',
  NULL, NULL,
  'https://www.bangkokpost.com/thailand/pr/2864431/brighton-college-bangkok-celebrates-outstanding-a-level-and-igcse-results', 'Bangkok Post / Brighton College', true
);

-- 2024 IGCSE Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  12, '2023-2024', 'igcse',
  NULL, NULL, NULL, NULL,
  'Freya: 10 A*/9 grades; Pim: 10 A*/9 grades',
  '{"note": "Some of the best IGCSE results in school history. Detailed percentage breakdown not publicly disclosed."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://www.bangkokpost.com/thailand/pr/2864431/brighton-college-bangkok-celebrates-outstanding-a-level-and-igcse-results', 'Bangkok Post / Brighton College', true
);

-- 2025 A-Level Results (record-breaking)
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  12, '2024-2025', 'a_level',
  67.0, NULL, NULL, NULL,
  'Kotaro: 4 A* grades (Cambridge University Computer Science); More than two-thirds A*/A in Further Maths, Physics, Business Studies',
  '{"a_star_a_pct_key_subjects": 67, "note": "Largest ever cohort. Record-breaking results. More than two-thirds A*/A in key subjects."}',
  NULL, NULL, NULL, NULL,
  '["Cambridge University", "University College London", "King''s College London", "Chulalongkorn University", "Northeastern University", "Thammasat University"]',
  '["British International School of the Year - Independent Schools of the Year Awards 2024"]',
  NULL, NULL,
  'https://www.bangkokpost.com/thailand/pr/3106230/brighton-college-bangkok-celebrates-recordbreaking-exam-success-at-a-level-and-igcse', 'Bangkok Post / Brighton College', true
);

-- 2025 IGCSE Results (record-breaking)
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  12, '2024-2025', 'igcse',
  NULL, NULL, NULL, NULL,
  'Proud: A*9 in all 10 subjects',
  '{"note": "Highest number of top IGCSE grades in school history."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://www.bangkokpost.com/thailand/pr/3106230/brighton-college-bangkok-celebrates-recordbreaking-exam-success-at-a-level-and-igcse', 'Bangkok Post / Brighton College', true
);

-- Historical reference: 2022 results (for context)
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  12, '2021-2022', 'igcse',
  NULL, 48.0, NULL, NULL,
  'Sanya, Preme, Khanin: A* in all 10 subjects; 88% A*/A in Maths and Sciences',
  '{"a_star_pct": 48, "a_star_b_pct": 90, "maths_science_a_star_a_pct": 88, "note": "Record results year"}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://brightoncollege.ac.th/results', 'Brighton College Bangkok Official', true
);


-- ============================================================================
-- 5. ICS International Community School (ID 14) — AP (NOT IB)
-- ============================================================================

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  14, '2023-2024', 'ap',
  NULL, NULL, 99.0, NULL,
  NULL,
  '{"exam_system": "AP", "num_ap_courses": 24, "pass_rate_historical": 99, "sat_avg_90th_percentile": 1310, "sat_avg_overall": 1300, "note": "Largest AP school in Thailand with 24 courses. 99% passing record. Highest reported SAT average among Bangkok international schools."}',
  NULL, NULL, NULL, NULL,
  '["Top-tier universities in USA, UK, Thailand, Korea"]',
  NULL,
  NULL, NULL,
  'https://www.ics.ac.th/high-school', 'ICS Official Website', true
);


-- ============================================================================
-- 6. Concordian International School (ID 17) — IB (NOT AP)
-- ============================================================================

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  17, '2023-2024', 'ib',
  NULL, NULL, NULL, 34.5,
  NULL,
  '{"avg_score_5yr": 34.5, "world_average": 30, "2019_cohort_size": 39, "2019_avg": 34, "note": "5-year average of 34.5 points, well above world average of 30. Thailand only trilingual IB school (English-Chinese-Thai). Specific 2024 results not publicly disclosed."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://whichschooladvisor.com/thailand/school-review/concordian-international-school', 'WhichSchoolAdvisor', false
);


-- ============================================================================
-- 7. Dulwich College Bangkok (ID 21) — NOT YET OPEN
-- ============================================================================

INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  21, '2024-2025', 'igcse',
  NULL, NULL, NULL, NULL,
  NULL,
  '{"note": "Dulwich College Bangkok opens August 2026 (Phase 1: ages 3-11). No exam results available. Will offer IGCSE + IB/A-Level dual pathway. DCI network 2025 IB average: 37.35 (100% pass rate). DCI network 2025 IGCSE: 47% A* and above."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://bangkok.dulwich.org/', 'Dulwich College Bangkok Official', true
);


-- ============================================================================
-- 8. St. Andrews International School (ID 8) — IGCSE + IB (NOT A-Level)
-- ============================================================================

-- 2024 IB Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  8, '2023-2024', 'ib',
  NULL, NULL, NULL, 32.0,
  NULL,
  '{"avg_score": 32, "world_average": 30, "note": "Above international average. Part of Nord Anglia Education network."}',
  NULL, NULL, NULL, NULL,
  '["King''s College London", "University of Chicago"]',
  '["BSO Outstanding in all areas (May 2024, valid to 2029)"]',
  NULL, NULL,
  'https://www.nordangliaeducation.com/sta-bangkok/academic-excellence/our-success', 'Nord Anglia / St Andrews Official', true
);

-- 2024 IGCSE Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  8, '2023-2024', 'igcse',
  36.0, NULL, NULL, NULL,
  NULL,
  '{"a_star_a_pct": 36, "five_a_star_c_pct": 80, "num_subjects_offered": 34, "note": "36% A*/A grades. 80%+ achieved 5 A*-C grades. Widest choice of subjects in Thailand (34 IGCSE options). Above world averages in business studies, art, computer science, DT, French, geography, history."}',
  NULL, NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'https://whichschooladvisor.com/thailand/school-review/st-andrews-international-school-bangkok-srivikorn', 'WhichSchoolAdvisor / ISQM Report', false
);

-- 2025 IB Results
INSERT INTO school_academic_performance (
  school_id, academic_year, exam_system,
  exam_a_star_a_pct, exam_a_star_pct, exam_pass_rate, exam_avg_score,
  exam_high_scorers, exam_details,
  uni_total_graduates, uni_first_choice_pct, uni_top10_global_pct, uni_top50_global_pct,
  uni_placements, awards,
  medical_admissions, engineering_admissions,
  source_url, source_name, is_verified
) VALUES (
  8, '2024-2025', 'ib',
  NULL, NULL, 95.0, 33.0,
  'Amee (Valedictorian): perfect 45/45 IB score (fewer than 1% worldwide); 13 students scored 40+ points (top 5% globally)',
  '{"avg_score": 33, "pass_rate": 95, "world_avg": 30.5, "global_pass_rate": 81, "students_40_plus": 13, "highest_score": 45, "note": "Highest non-COVID result ever. Highest pass rate ever (95% vs 81% global)."}',
  NULL, NULL, NULL, NULL,
  '["University of Sydney (BA/MD)", "Queen Mary University of London Malta (MBBS Medicine)"]',
  '["BSO Outstanding in all areas (May 2024, valid to 2029)"]',
  'Julianna: Medicine (MBBS) Queen Mary University of London Malta; Amee: BA/MD University of Sydney', NULL,
  'https://www.nordangliaeducation.com/sta-bangkok/news/2025/07/17/class-of-2025-ib-results', 'Nord Anglia / St Andrews Official', true
);


-- ============================================================================
-- SUMMARY OF DATA QUALITY NOTES
-- ============================================================================
--
-- VERIFIED (is_verified = true): Data from official school websites or press releases
-- UNVERIFIED (is_verified = false): Data from third-party review sites
--
-- Key corrections from original request:
--   - ID 17 (Concordian): Uses IB, not AP
--   - ID 14 (ICS): Uses AP, not IB
--   - ID 8 (St Andrews): Uses IGCSE + IB, not A-Level
--   - ID 21 (Dulwich Bangkok): Opens Aug 2026, no results
--   - ID 10 (Wellington Bangkok): First IGCSE 2024, first A-Level 2026
--
-- Data gaps:
--   - KIS (ID 5): Pass rate, highest score, total graduates not published
--   - Wellington (ID 10): Detailed IGCSE results not published
--   - Regent's (ID 11): Specific year for 37.1 avg unclear (likely 2024)
--   - Brighton (ID 12): Total candidate numbers not disclosed
--   - ICS (ID 14): Specific AP score distributions not published
--   - Concordian (ID 17): 2024 specific results not publicly available
--   - Dulwich (ID 21): School not yet open
--   - St Andrews (ID 8): 2024 IGCSE may be from slightly earlier cohort
