/**
 * Valódi Google-vélemények a Skinlab cégprofiljáról – egyetlen forrás.
 *
 * A szöveg SZÓ SZERINT a Google-ről (helyesírási hibákkal együtt): kitalált
 * vagy átfogalmazott mondat nem kerülhet ide. Csak szöveges véleményt
 * teszünk ki; a csak csillagos értékeléseket nem.
 * Használja: sections/GoogleReviews.astro (főoldal) és az /ertekeles/ oldal.
 */
export interface GoogleReview {
  name: string;
  /** /public alatti profilkép, ha a Google-profilon van; különben monogram. */
  avatar?: string;
  text: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: 'Hajnalka Török',
    avatar: '/images/reviews/torok-hajnalka.webp',
    text: 'Szívből ajánlom a Skinlab csapatát! Számomra egyértelműen az egyik legmegbízhatóbb választás a professzionális gépek terén. Én is tőlük választottam a gépeimet, és maximálisan elégedett vagyok velük. A gépeik magas minőségűek, megbízhatóak, professzionálisak, és a mindennapi munkában is abszolút hozzák azt a színvonalat, amit egy szakember elvár.\nÉn szemelyszerint egy yag-lézert és egy Frost Cold plazma gépet vásároltam tőlük, de tervben vannak további gépek beszerzése is… Ha egyszer valaki itt jár “megfertőződik” 👌🏻\nAmi számomra különösen fontos, hogy náluk nem ér véget a történet a gép megvásárlásával. Az oktatásuk nagyon átfogó és alapos, minden szükséges tudást átadnak ahhoz, hogy az ember magabiztosan és biztonságosan tudjon dolgozni. Ha pedig később merül fel kérdés, akkor is segítőkészek és elérhetőek.\nNekem fontos, hogy ne csak egy jó minőségű gépet vásároljak, hanem valódi szakmai hátteret és támogatást is kapjak mellé. A Skinlabnál ezt mind megtaláltam, ezért nem véletlen, hogy nálam is minden gép tőlük van. Jó szívvel ajánlom őket! 🤍',
  },
  {
    name: 'Dora Racz',
    text: '❤️❤️❤️❤️ Legjobb\nDiódalézer,Yag Lèzer, Fusion Plasma,Elite Pod system arckezelő,Mezo,Motoros kezelőàgy,Tetovalógépek illetve pigmentek , tetovàlótűk ès még a professzionális Monduniq termékeket is tőlük szereztem be!! Szerintem ez mindent elàrul :)) Èvek óta visszatérő vàsàrlójuk vagyok :) Bàtran ajànlom őket :)',
  },
  {
    name: 'Tímea Virga',
    avatar: '/images/reviews/virga-timea.webp',
    text: 'Szuper gépek, a képzéseket pedig imádom,jó hangulatban telnek, türelmesek, kedvesek. Utolsó szempont, de az ellátás egyedi és különleges minden alkalommal.',
  },
];
