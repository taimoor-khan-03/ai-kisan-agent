import { cleanDiseaseLabel } from "@/lib/clean-disease-label";

/**
 * Local advisory dataset (no database). `disease` should align with cleaned model labels
 * from `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification` (PlantVillage-style).
 */
export type MedicineSeedRecord = {
  disease: string;
  medicine: string;
  dosage: string;
  estimatedCostPKR: number;
  urdu: string;
};

/** Default row when no confident match is found. */
export const MEDICINE_FALLBACK: MedicineSeedRecord = {
  disease: "unknown or unmatched condition",
  medicine: "Consult your local agriculture officer or certified agronomist",
  dosage: "As per expert recommendation after field inspection",
  estimatedCostPKR: 0,
  urdu:
    "یہ بیماری ہمارے مقامی ڈیٹا سیٹ سے مماثل نہیں ملی۔ مقامی زرعی مرکز یا ماہر سے مشورہ کریں۔",
};

/**
 * Curated rows for common PlantVillage classes (cleaned forms like `tomato early blight`).
 */
export const MEDICINE_SEED: MedicineSeedRecord[] = [
  {
    disease: "tomato early blight",
    medicine: "Azoxystrobin + Difenoconazole SC (rotate with Chlorothalonil)",
    dosage: "Per product label; typically 7–10 day interval while symptoms persist",
    estimatedCostPKR: 1850,
    urdu: "متاثرہ پتیاں ہٹائیں، ہوا کا بہاؤ بہتر بنائیں، اور لیبل کے مطابق فنگی سائڈ کا استعمال کریں۔",
  },
  {
    disease: "tomato late blight",
    medicine: "Metalaxyl-M + Chlorothalonil or Cymoxanil-based spray",
    dosage: "Preventive before rain; curative per label — shorten interval in humid weather",
    estimatedCostPKR: 2200,
    urdu: "نمی اور بارش میں فوری سپرے کریں؛ متاثرہ پودے الگ کریں اور لیبل کی ہدایات پر عمل کریں۔",
  },
  {
    disease: "tomato leaf mold",
    medicine: "Chlorothalonil or Azoxystrobin (greenhouse-appropriate formulation)",
    dosage: "Improve ventilation; spray interval per label (often 7–14 days)",
    estimatedCostPKR: 1650,
    urdu: "گرین ہاؤس میں ہوا کا اچھا اخراج یقینی بنائیں؛ فنگی سائڈ لیبل کے مطابق استعمال کریں۔",
  },
  {
    disease: "tomato septoria leaf spot",
    medicine: "Mancozeb + systemic partner per resistance management plan",
    dosage: "Start at first spots; 7–10 day schedule; remove infected debris",
    estimatedCostPKR: 1500,
    urdu: "نیچے کی پتیاں ہٹائیں، ملچ رکھیں، اور لیبل کے مطابق سپرے شیڈول پر عمل کریں۔",
  },
  {
    disease: "tomato bacterial spot",
    medicine: "Copper hydroxide + antibiotic where legally permitted (check local rules)",
    dosage: "Copper at label rate; avoid overhead irrigation; rotate chemistries",
    estimatedCostPKR: 1300,
    urdu: "بیکٹیریل اسپاٹ کے لیے تانبے پر مبنی سپرے اور خشک پودوں پر پانی دینے سے گریز کریں۔",
  },
  {
    disease: "tomato mosaic virus",
    medicine: "No cure — vector control + certified seed + sanitation",
    dosage: "Remove infected plants; disinfect tools; use resistant varieties next season",
    estimatedCostPKR: 400,
    urdu: "وائرس کا علاج نہیں؛ متاثرہ پودے ہٹائیں، اوزار صاف کریں، اگلی فصل میں مزاحم اقسام لگائیں۔",
  },
  {
    disease: "tomato yellow leaf curl virus",
    medicine: "Imidacloprid / whitefly IPM program + resistant tomato varieties",
    dosage: "Follow insecticide label; combine with yellow sticky traps and reflective mulch",
    estimatedCostPKR: 1750,
    urdu: "وائٹ فلائی کنٹرول ضروری ہے؛ مزاحم قسم اور لیبل کے مطابق کیڑے مار سپرے کریں۔",
  },
  {
    disease: "tomato target spot",
    medicine: "Chlorothalonil or Azoxystrobin-based fungicide rotation",
    dosage: "7–14 day interval; improve canopy airflow",
    estimatedCostPKR: 1600,
    urdu: "فنگس کے خلاف سپرے اور پودوں کے درمیان ہوا کا بہاؤ بہتر کریں۔",
  },
  {
    disease: "tomato spider mites two spotted spider mite",
    medicine: "Abamectin or Spiromesifen (rotate modes of action)",
    dosage: "Underside coverage critical; repeat per label; release predators if available",
    estimatedCostPKR: 1400,
    urdu: "پتوں کی نچلی سطح پر سپرے کریں؛ مکھیوں کا دورانیہ لیبل کے مطابق رکھیں۔",
  },
  {
    disease: "tomato healthy",
    medicine: "No treatment required",
    dosage: "Continue balanced fertilizer and consistent irrigation",
    estimatedCostPKR: 0,
    urdu: "ٹماٹر صحت مند لگتے ہیں؛ غذائی انتظام اور آبپاشی جاری رکھیں۔",
  },
  {
    disease: "potato early blight",
    medicine: "Azoxystrobin / Chlorothalonil rotation",
    dosage: "Begin at row closure; 7–10 day intervals in humid periods",
    estimatedCostPKR: 2100,
    urdu: "ابتدائی داغ کے لیے فنگی سائڈ روٹیشن اور نمی کے دنوں میں وقفہ کم کریں۔",
  },
  {
    disease: "potato late blight",
    medicine: "Metalaxyl + Chlorothalonil or Fluopicolide programs",
    dosage: "High alert during cool wet weather; shorten intervals per advisory",
    estimatedCostPKR: 2800,
    urdu: "دیر پزیر سڑن کے لیے فوری سپرے اور موسم کے مطابق شیڈول تیز کریں۔",
  },
  {
    disease: "potato healthy",
    medicine: "No treatment required",
    dosage: "Maintain hilling and scouting schedule",
    estimatedCostPKR: 0,
    urdu: "آلو صحت مند ہیں؛ نگرانی اور مٹی چڑھانا جاری رکھیں۔",
  },
  {
    disease: "pepper bell bacterial spot",
    medicine: "Copper-based protectant + streptomycin where registered",
    dosage: "Apply before rain events; follow PHI on label",
    estimatedCostPKR: 1550,
    urdu: "مرچ میں بیکٹیریل داغ کے لیے تانبے کا سپرے اور پانی کا انتظام درست کریں۔",
  },
  {
    disease: "pepper bell healthy",
    medicine: "No treatment required",
    dosage: "Maintain calcium and even soil moisture to prevent blossom end rot",
    estimatedCostPKR: 0,
    urdu: "شملہ مرچ صحت مند ہے؛ کیلشیم اور یکساں نمی برقرار رکھیں۔",
  },
  {
    disease: "grape black rot",
    medicine: "Mancozeb + Myclobutanil or Captan programs",
    dosage: "Critical timing at bloom and fruit set; remove mummies",
    estimatedCostPKR: 3200,
    urdu: "انگور کی کالی سڑن کے لیے پھول اور پھل کے مراحل پر سپرے اور خشک گچھے ہٹائیں۔",
  },
  {
    disease: "grape esca black measles",
    medicine: "No reliable chemical cure — remove severely affected wood",
    dosage: "Prune during dry weather; disinfect tools; consider tolerant cultivars",
    estimatedCostPKR: 600,
    urdu: "ایسا/بلیک میلز کا مکمل علاج نہیں؛ شدید شاخیں کاٹیں اور اوزار جراثیم سے پاک کریں۔",
  },
  {
    disease: "grape leaf blight isariopsis leaf spot",
    medicine: "Chlorothalonil or Azoxystrobin",
    dosage: "Pre-bloom through veraison per label",
    estimatedCostPKR: 2900,
    urdu: "پتوں کے داغ کے لیے فنگی سائڈ اور ہوا کا اچھا بہاؤ۔",
  },
  {
    disease: "grape healthy",
    medicine: "No treatment required",
    dosage: "Maintain canopy management and powdery mildew scouting",
    estimatedCostPKR: 0,
    urdu: "انگور صحت مند ہیں؛ چھتری کا انتظام اور نگرانی جاری رکھیں۔",
  },
  {
    disease: "apple apple scab",
    medicine: "Myclobutanil + Captan or SDHI rotation",
    dosage: "Green tip through petal fall; extend cover in wet springs",
    estimatedCostPKR: 3500,
    urdu: "سیب کی خسیس کے لیے موسم بہار میں سپرے شیڈول سختی سے نافذ کریں۔",
  },
  {
    disease: "apple black rot",
    medicine: "Captan / TEB + sanitation (mummied fruit removal)",
    dosage: "Cover sprays from bloom; remove cankers where feasible",
    estimatedCostPKR: 3100,
    urdu: "سڑے ہوئے پھل ہٹائیں اور فنگی سپرے پروگرام جاری رکھیں۔",
  },
  {
    disease: "apple cedar apple rust",
    medicine: "Myclobutanil or Propiconazole timed at pink/petal fall",
    dosage: "Alternate chemistry; remove nearby alternate hosts if possible",
    estimatedCostPKR: 2800,
    urdu: "سےڈر ایپل رسٹ کے لیے وقت پر سپرے اور قریبی متبادل میزبان کم کریں۔",
  },
  {
    disease: "apple healthy",
    medicine: "No treatment required",
    dosage: "Continue IPM monitoring",
    estimatedCostPKR: 0,
    urdu: "سیب صحت مند ہیں؛ مکمل IPM نگرانی جاری رکھیں۔",
  },
  {
    disease: "cherry powdery mildew",
    medicine: "Sulfur (cool weather) or Potassium bicarbonate / systemic per label",
    dosage: "Apply at first sign; ensure thorough coverage",
    estimatedCostPKR: 2400,
    urdu: "چیری پر پاؤڈری ملڈیو کے لیے گندھک یا دیگر لیبل والی دوائیں۔",
  },
  {
    disease: "cherry healthy",
    medicine: "No treatment required",
    dosage: "Monitor for fruit fly and brown rot near harvest",
    estimatedCostPKR: 0,
    urdu: "چیری صحت مند ہے؛ پھل توڑنے سے پہلے نگرانی کریں۔",
  },
  {
    disease: "peach bacterial spot",
    medicine: "Copper + oxytetracycline where registered (rotation)",
    dosage: "Dormant copper; in-season programs per local extension",
    estimatedCostPKR: 2600,
    urdu: "آڑو پر بیکٹیریل داغ کے لیے تانبے کا پروگرام اور لیبل کی پابندی۔",
  },
  {
    disease: "peach healthy",
    medicine: "No treatment required",
    dosage: "Prune for open canopy; reduce wetting periods",
    estimatedCostPKR: 0,
    urdu: "آڑو صحت مند ہے؛ چھتری کھلی رکھیں۔",
  },
  {
    disease: "corn cercospora leaf spot gray leaf spot",
    medicine: "Strobilurin + triazole premix (resistance-aware)",
    dosage: "VT–R2 timing in high-risk fields; manage residue",
    estimatedCostPKR: 4200,
    urdu: "مکئی کے پتوں کے داغ کے لیے خطرے کے مطابق فنگی سائڈ۔",
  },
  {
    disease: "corn common rust",
    medicine: "Tebuconazole or Propiconazole if economic threshold met",
    dosage: "Often late-season; scout hybrid tolerance first",
    estimatedCostPKR: 3800,
    urdu: "مکئی پر زنگ کے لیے نگرانی کریں؛ ضرورت پر فنگی سائڈ۔",
  },
  {
    disease: "corn northern leaf blight",
    medicine: "Azoxystrobin + Prothioconazole or Chlorothalonil",
    dosage: "Apply if lesions moving up plant before tassel",
    estimatedCostPKR: 4000,
    urdu: "شمالی پتہ جھلساؤ کے لیے وقت پر سپرے اور مزاحم ہائبرڈ اگلی بار۔",
  },
  {
    disease: "corn healthy",
    medicine: "No treatment required",
    dosage: "Soil test and balanced N application",
    estimatedCostPKR: 0,
    urdu: "مکئی صحت مند ہے؛ کھاد کا توازن رکھیں۔",
  },
  {
    disease: "squash powdery mildew",
    medicine: "Potassium bicarbonate or systemic fungicide per label",
    dosage: "Early intervention; protect new growth",
    estimatedCostPKR: 1200,
    urdu: "کدو کی فصل پر پاؤڈری ملڈیو کے لیے جلد سپرے کریں۔",
  },
  {
    disease: "strawberry leaf scorch",
    medicine: "Captan + systemic partner rotation",
    dosage: "Bloom/pre-harvest restrictions strictly observed",
    estimatedCostPKR: 1900,
    urdu: "اسٹرابیری پتہ جھلساؤ کے لیے فنگی سائڈ روٹیشن اور PHI کی پابندی۔",
  },
  {
    disease: "strawberry healthy",
    medicine: "No treatment required",
    dosage: "Mulch with straw; manage botrytis humidity",
    estimatedCostPKR: 0,
    urdu: "اسٹرابیری صحت مند ہے؛ نمی کم رکھیں۔",
  },
  {
    disease: "soybean healthy",
    medicine: "No treatment required",
    dosage: "Scout for aphids and stink bugs through pod fill",
    estimatedCostPKR: 0,
    urdu: "سویابین صحت مند ہے؛ پھلی بھرنے تک نگرانی۔",
  },
  {
    disease: "raspberry healthy",
    medicine: "No treatment required",
    dosage: "Prune floricanes after harvest; manage cane borers",
    estimatedCostPKR: 0,
    urdu: "رس بھری صحت مند ہے؛ کٹائی کے بعد پروننگ۔",
  },
];

/**
 * Map a cleaned model label to the closest seed record.
 */
export function findMedicineForCleanedLabel(cleanedPrediction: string): MedicineSeedRecord {
  const target = cleanedPrediction.replace(/\s+/g, " ").trim();
  if (!target) return MEDICINE_FALLBACK;

  const normalizedTarget = cleanDiseaseLabel(target);

  for (const row of MEDICINE_SEED) {
    if (cleanDiseaseLabel(row.disease) === normalizedTarget) {
      return row;
    }
  }

  for (const row of MEDICINE_SEED) {
    const nd = cleanDiseaseLabel(row.disease);
    if (normalizedTarget.includes(nd) || nd.includes(normalizedTarget)) {
      return row;
    }
  }

  const targetTokens = new Set(
    normalizedTarget.split(" ").filter((t) => t.length > 2),
  );
  let best: MedicineSeedRecord | null = null;
  let bestScore = 0;

  for (const row of MEDICINE_SEED) {
    const nd = cleanDiseaseLabel(row.disease);
    const rowTokens = nd.split(" ").filter((t) => t.length > 2);
    let overlap = 0;
    for (const t of rowTokens) {
      if (targetTokens.has(t)) overlap++;
    }
    const score = overlap / Math.max(1, rowTokens.length);
    if (score > bestScore) {
      bestScore = score;
      best = row;
    }
  }

  if (best && bestScore >= 0.35) {
    return best;
  }

  return MEDICINE_FALLBACK;
}
