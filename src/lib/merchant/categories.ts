/**
 * Google product taxonomy leképezés a saját kategóriáinkra.
 *
 * Az ID-k a hivatalos taxonómiából valók (numerikus ID nyelvfüggetlen):
 * https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
 *
 * A `google_product_category` a feedben opcionális (a Google magától is
 * besorol), de a saját besorolás pontosabb, és a Shopping kampányok
 * kategória-szintű bontását is ez adja. Egyedi eltérést a termék JSON
 * `googleProductCategory` mezőjével lehet felülírni.
 */

interface TaxonomyEntry {
  id: number;
  /** Csak dokumentáció - a feedbe az ID megy. */
  path: string;
}

const TAXONOMY = {
  laserHairRemoval: {
    id: 7199,
    path: 'Health & Beauty > Personal Care > Shaving & Grooming > Hair Removal > Laser & IPL Hair Removal Devices',
  },
  skinCareTools: {
    id: 2958,
    path: 'Health & Beauty > Personal Care > Cosmetics > Cosmetic Tools > Skin Care Tools',
  },
  cosmeticTools: {
    id: 2619,
    path: 'Health & Beauty > Personal Care > Cosmetics > Cosmetic Tools',
  },
  skinCare: {
    id: 567,
    path: 'Health & Beauty > Personal Care > Cosmetics > Skin Care',
  },
  tattooingMachines: {
    id: 4379,
    path: 'Business & Industrial > Piercing & Tattooing > Tattooing Supplies > Tattooing Machines',
  },
  tattooingNeedles: {
    id: 4072,
    path: 'Business & Industrial > Piercing & Tattooing > Tattooing Supplies > Tattooing Needles',
  },
} as const satisfies Record<string, TaxonomyEntry>;

/** categorySlug → Google taxonomy ID. Ismeretlen kategória → nincs mező. */
export const GOOGLE_PRODUCT_CATEGORY: Readonly<Record<string, number>> = {
  diodalezerek: TAXONOMY.laserHairRemoval.id,
  'nd-yag-lezerek': TAXONOMY.skinCareTools.id,
  hydrafacial: TAXONOMY.skinCareTools.id,
  coldplasma: TAXONOMY.skinCareTools.id,
  'anti-aging': TAXONOMY.skinCareTools.id,
  'arckezelo-rendszerek': TAXONOMY.skinCareTools.id,
  mezoterapia: TAXONOMY.skinCareTools.id,
  // Testkezelés (kriolipolízis, kontúrozás): nincs rá pontos levél-kategória,
  // a szűkebb "Skin Care Tools" félrevezető lenne → a szülő "Cosmetic Tools".
  testkezeles: TAXONOMY.cosmeticTools.id,
  sminktetovalas: TAXONOMY.tattooingMachines.id,
  // Kellékek: vegyes (tűmodul, elszívó). A tűmodulok a termék JSON-ban
  // felülírják `tattooingNeedles`-re.
  kellekek: TAXONOMY.cosmeticTools.id,
  kezeloanyagok: TAXONOMY.skinCare.id,
};

/** Kényelmi export a tűmodul-felülíráshoz és teszteléshez. */
export const TATTOOING_NEEDLES_CATEGORY = TAXONOMY.tattooingNeedles.id;

export function googleProductCategoryFor(
  categorySlug: string,
  override?: number | null
): number | undefined {
  return override ?? GOOGLE_PRODUCT_CATEGORY[categorySlug];
}
