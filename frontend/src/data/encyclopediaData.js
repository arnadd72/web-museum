// File: src/data/encyclopedia.js

export const encyclopediaData = {
  BIO: {
    id: "BIO",
    title: "MAKHLUK HIDUP",
    desc: "Analisis struktur biologis organisme purba.",
    color: "#00ff88",
    image: "/ImageModels/EraGeologi/foto-mesozoikum.jpg",
    subCategories: [
      {
        title: "INVERTEBRATA",
        desc: "Organisme lunak tanpa tulang belakang.",
        image: "/ImageModels/EraGeologi/anomalocaris.jpg",
        items: [
          {
            name: "AMMONITE",
            modelPath: "/models/hewan/invertebrata/ammonite.glb",
            image:
              "https://lovelymeregis.co.uk/images/gallery/ammonite-creature.jpg",
            period: "Mesozoikum (Devon - Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Kerabat purba cumi-cumi dan gurita dengan cangkang spiral yang hidup di laut sekitar 400 hingga 66 juta tahun lalu, memiliki tentakel untuk menangkap mangsa dan bergerak dengan menyemprotkan air.",
              full: "Amonit (Ammonite) adalah kelompok moluska laut predator dari kelas Cephalopoda yang telah punah. Mereka memiliki cangkang eksternal berpilin (spiral) yang terbagi menjadi bilik-bilik udara, memungkinkan mereka mengatur daya apung di dalam air. Hewan ini sangat sukses dan beragam selama era Mesozoikum, namun punah bersamaan dengan dinosaurus non-unggas pada peristiwa kepunahan massal Kapur-Paleogen.",
              key: "Amonit memiliki cangkang yang bekerja persis seperti kapal selam, memompa udara masuk dan keluar bilik cangkang untuk mengatur kedalaman.",
            },
            details: {
              diet: "Karnivora (Plankton & Krustasea)",
              lifespan: "1 - 4 Tahun",
              weight: "10g - 100kg (Bervariasi)",
              size: "Diameter 2cm - 2m",
              discoveryYear: "Zaman Kuno (Pliny the Elder)",
              taxonomy: "Mollusca > Cephalopoda",
              stats: { completeness: 95, rarity: 30, value: 80 },
            },
          },
          {
            name: "TURRITELLA",
            modelPath:
              "/models/hewan/invertebrata/gastropods_turritella_terebralis.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/f/f2/Turritella_duplicata_01.jpg",
            period: "Kenozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Siput laut dengan cangkang berbentuk menara runcing yang hidup berkelompok di dasar laut berlumpur, menyaring makanan dari air, dan fosilnya sering ditemukan melimpah membentuk batuan.",
              full: "Turritella adalah genus siput laut (gastropoda) berukuran sedang yang memiliki cangkang sangat khas berbentuk kerucut memanjang (seperti menara bor) dengan banyak putaran spiral yang rapat. Hewan ini hidup dengan membenamkan diri di substrat lunak dan mencari makan dengan cara filter feeding (menyaring partikel organik). Kelimpahan cangkang mereka di masa lampau sering kali membentuk lapisan batuan sedimen yang dikenal sebagai 'Batu Turritella'.",
              key: "Turritella sering ditemukan mati dalam jumlah jutaan hingga cangkangnya menumpuk dan berubah menjadi batuan permata cantik yang disebut 'Agate Turritella'.",
            },
            details: {
              diet: "Filter Feeder (Detritus)",
              lifespan: "3 - 10 Tahun",
              weight: "< 50 gram",
              size: "Panjang 3 - 15 cm",
              discoveryYear: "1799 (Lamarck)",
              taxonomy: "Mollusca > Gastropoda",
              stats: { completeness: 100, rarity: 20, value: 60 },
            },
          },
          {
            name: "BRACHIOPODA",
            modelPath:
              "/models/hewan/invertebrata/modern_brachiopod_animation.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/e/ea/Liospiriferina_rostrata_Noir.jpg",
            period: "Paleozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Hewan laut bercangkang tangkup atas-bawah yang menempel di dasar laut menggunakan tangkai, sekilas mirip kerang tetapi memiliki anatomi dalam yang sangat berbeda.",
              full: "Brakiopoda adalah filum hewan laut yang memiliki cangkang keras terdiri dari dua katup (atas dan bawah), berbeda dengan kerang (bivalvia) yang cangkangnya kiri dan kanan. Di dalam cangkangnya, terdapat organ khusus bernama lofofor, yaitu struktur berbentuk tentakel melingkar yang digunakan untuk menyaring makanan dari arus air. Meskipun sangat melimpah pada Era Paleozoikum, jenis mereka menurun drastis setelah kepunahan massal Permian.",
              key: "Brakiopoda sekilas mirip kerang, namun sebenarnya memiliki 'tentakel' khusus bernama lofofor yang tersembunyi di dalam cangkang untuk menangkap makanan.",
            },
            details: {
              diet: "Filter Feeder (Plankton)",
              lifespan: "3 - 30 Tahun",
              weight: "< 50 gram",
              size: "2 - 10 cm",
              discoveryYear: "1806 (Duméril)",
              taxonomy: "Animalia > Brachiopoda",
              stats: { completeness: 90, rarity: 20, value: 70 },
            },
          },
          {
            name: "PORIFERA",
            modelPath: "/models/hewan/invertebrata/sponge.glb",
            image:
              "https://unsir.ac.id/wp-content/uploads/2024/01/WhatsApp-Image-2023-09-01-at-132835-2748392327.webp",
            period: "Prekambrium - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Hewan multiseluler paling sederhana yang dikenal sebagai spons laut, tubuhnya penuh pori-pori untuk menyaring air guna mendapatkan oksigen dan makanan, serta tidak memiliki organ sejati.",
              full: "Porifera (hewan berpori) adalah filum hewan invertebrata yang hidup menetap (sesil) di dasar perairan. Tubuh mereka terdiri dari jaringan saluran air yang kompleks namun tidak memiliki sistem saraf, pencernaan, atau peredaran darah sejati. Mereka bertahan hidup dengan memompa air melalui tubuh mereka untuk menyaring partikel makanan mikroskopis. Struktur tubuhnya ditopang oleh spikula (duri mikroskopis) yang terbuat dari kapur atau silika.",
              key: "Porifera (Spons Laut) memiliki kemampuan unik di mana jika tubuhnya dihancurkan menjadi sel-sel terpisah, sel-sel tersebut bisa menyatu kembali membentuk spons baru!",
            },
            details: {
              diet: "Filter Feeder (Partikel Organik)",
              lifespan: "Puluhan - Ribuan Tahun",
              weight: "Bervariasi",
              size: "1 cm - 2 meter",
              discoveryYear: "1836 (Grant)",
              taxonomy: "Animalia > Porifera",
              stats: { completeness: 60, rarity: 40, value: 75 },
            },
          },
          {
            name: "STAR FISH",
            modelPath: "/models/hewan/invertebrata/starfish.glb",
            image:
              "https://www.thoughtco.com/thmb/PHXqLrrhvo1wVZGne0ddMCef9E0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-orange-starfish-on-sand-489010151-59847f7f22fa3a0010518acc.jpg",
            period: "Paleozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Hewan laut berbentuk bintang dengan kulit berduri dan kemampuan regenerasi luar biasa, bergerak menggunakan kaki tabung dan memakan kerang dengan cara mengeluarkan lambungnya.",
              full: "Bintang laut adalah echinodermata yang memiliki tubuh simetri radial, umumnya dengan lima lengan yang memancar dari pusat tubuh. Mereka bergerak menggunakan sistem vaskular air yang menggerakkan ratusan kaki tabung kecil di bawah lengannya. Bintang laut adalah predator penting di ekosistem laut yang memangsa moluska, terumbu karang, atau detritus. Kemampuan regenerasinya memungkinkan mereka menumbuhkan kembali lengan yang putus akibat serangan predator.",
              key: "Bintang laut tidak punya otak maupun darah, mereka memompa air laut ke seluruh tubuhnya untuk mengedarkan nutrisi.",
            },
            details: {
              diet: "Karnivora (Kerang)",
              lifespan: "Hingga 35 Tahun",
              weight: "0.1 - 5 kg",
              size: "10 - 25 cm (Diameter)",
              discoveryYear: "1758 (Linnaeus)",
              taxonomy: "Echinodermata > Asteroidea",
              stats: { completeness: 85, rarity: 25, value: 65 },
            },
          },
          {
            name: "TRILOBITE PROETIDA",
            modelPath: "/models/hewan/invertebrata/trilobite_proetida.glb",
            image:
              "https://alchetron.com/cdn/proetida-95e7880c-345a-4c53-98e4-3039e8fd566-resize-750.jpeg",
            period: "Paleozoikum (Ordovisium - Permian)",
            status: "PUNAH",
            description: {
              short:
                "Kelompok artropoda laut purba terakhir yang bertahan hidup, memiliki tubuh bersegmen tiga lobus dan cangkang keras, hidup di dasar laut sebelum punah pada akhir masa Paleozoikum.",
              full: "Proetida adalah ordo dari kelas Trilobita yang memiliki rentang hidup paling panjang secara geologis, muncul dari periode Ordovisium hingga akhirnya punah di periode Permian. Mereka memiliki eksoskeleton kalsit yang keras, mata majemuk yang canggih, dan kemampuan menggulung tubuh untuk pertahanan diri. Sebagai pemakan bangkai atau predator kecil di dasar laut, mereka adalah komponen vital ekosistem laut purba.",
              key: "Trilobita bisa menggulung tubuhnya menjadi bola keras saat merasa terancam bahaya, persis seperti Trenggiling modern!",
            },
            details: {
              diet: "Detritivora (Sisa Organik)",
              lifespan: "3 - 5 Tahun",
              weight: "< 50 gram",
              size: "2 - 5 cm",
              discoveryYear: "1843",
              taxonomy: "Arthropoda > Trilobita",
              stats: { completeness: 98, rarity: 40, value: 85 },
            },
          },
        ],
      },
      {
        title: "MIKROFOSIL",
        desc: "Sisa-sisa fosil kecil organisme purba.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nanoplankton-fossil-sediment_hg.jpg/330px-Nanoplankton-fossil-sediment_hg.jpg",
        galleryImage: "/ImageModels/EraGeologi/anomalocaris.jpg",
        items: [
          {
            name: "GLOBIGERINELLA BULLODES",
            modelPath: "/models/hewan/mikrofosil/globigerina_bulloides.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/3/39/Gbulloides.jpg",
            period: "Kenozoikum (Miosen - Sekarang)",
            status: "MASIH HIDUP",
            description: {
              short:
                "Plankton mikroskopis bersel tunggal dengan cangkang kapur berpori, hidup melayang di permukaan laut, dan fosilnya digunakan ilmuwan untuk mengetahui suhu laut masa lalu.",
              full: "Globigerina bulloides adalah spesies foraminifera planktonik yang hidup di zona fotik lautan dunia. Organisme bersel tunggal ini membangun cangkang (test) dari kalsium karbonat yang memiliki duri-duri halus semasa hidupnya. Kelimpahannya sangat tinggi di perairan dingin atau area upwelling yang kaya nutrisi. Analisis kimiawi pada cangkang fosilnya memberikan data akurat mengenai suhu permukaan laut ribuan tahun lalu.",
              key: "Globigerina bulloides memiliki cangkang yang berfungsi sebagai 'termometer purba' bagi ilmuwan untuk meneliti suhu laut jutaan tahun lalu.",
            },
            details: {
              diet: "Omnivora (Plankton lain)",
              lifespan: "2 - 4 Minggu",
              weight: "Mikroskopis",
              size: "< 1 mm",
              discoveryYear: "1826 (d'Orbigny)",
              taxonomy: "Foraminifera",
              stats: { completeness: 100, rarity: 10, value: 90 },
            },
          },
          {
            name: "GLOBIGERINELLA CALIDA",
            modelPath:
              "/models/hewan/mikrofosil/foraminifera_-_globigerinella_calida.glb",
            image:
              "https://www.mikrotax.org/images/pf_cenozoic/Globigerinidae/Globigerinella/Globigerinella%20calida/Lam%20&%20Leckie%202020%20pl04%2006-7.jpg",
            period: "Kenozoikum (Pleistosen - Sekarang)",
            status: "MASIH HIDUP",
            description: {
              short:
                "Mikroorganisme laut dengan cangkang spiral longgar yang hidup di perairan tropis hangat, sering dijadikan penunjuk usia lapisan batuan muda di wilayah Indonesia.",
              full: "Globigerinella calida adalah spesies foraminifera planktonik dengan cangkang yang tersusun secara trochospiral rendah hingga planar. Spesies ini hidup di perairan laut tropis dan subtropis yang hangat. Kehadiran fosilnya dalam sedimen laut sangat berguna bagi ahli biostratigrafi untuk menentukan umur batuan sedimen, khususnya dari periode Pleistosen hingga Holosen (zaman Kuarter).",
              key: "Globigerinella calida sangat berharga bagi ahli geologi karena penemuannya seperti peta harta karun menuju cadangan minyak!",
            },
            details: {
              diet: "Heterotrof (Plankton)",
              lifespan: "Beberapa hari/minggu",
              weight: "Mikroskopis",
              size: "< 1 mm",
              discoveryYear: "1962 (Parker)",
              taxonomy: "Foraminifera",
              stats: { completeness: 100, rarity: 15, value: 85 },
            },
          },
          {
            name: "RADIOLARIA",
            modelPath: "/models/hewan/mikrofosil/radiolarian_spumellaria.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkP0QwHGroMqOdmKi2audGutfkxosskEjhgA&s",
            period: "Paleozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Protozoa laut mikroskopis yang memiliki kerangka rumit dari kaca (silika) dengan bentuk geometris indah, endapannya membentuk lumpur di dasar laut dalam.",
              full: "Radiolaria adalah kelompok protozoa (zooplankton) yang memproduksi kerangka mineral rumit yang terbuat dari silika (seperti kaca). Mereka memiliki struktur tubuh simetris radial yang sangat artistik dan bervariasi. Karena kerangkanya tidak larut di kedalaman laut ekstrem (di bawah CCD), sisa-sisa mereka menumpuk membentuk 'lumpur radiolaria' di dasar samudra yang dalam.",
              key: "Radiolaria memiliki kerangka tubuh yang terbuat dari bahan yang sama dengan kaca jendela rumahmu (silika)!",
            },
            details: {
              diet: "Heterotrof (Bakteri/Alga)",
              lifespan: "2 - 4 Minggu",
              weight: "Mikroskopis",
              size: "0.1 - 0.2 mm",
              discoveryYear: "1834 (Meyen)",
              taxonomy: "Rhizaria > Radiolaria",
              stats: { completeness: 95, rarity: 20, value: 80 },
            },
          },
          {
            name: "COCCOLITHOPHORE",
            modelPath: "/models/hewan/mikrofosil/coccolithophore.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gephyrocapsa_oceanica.jpg/330px-Gephyrocapsa_oceanica.jpg",
            period: "Mesozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Ganggang mikroskopis penghasil kapur yang menutupi tubuhnya dengan lempengan bulat, berperan besar menghasilkan oksigen dan membentuk endapan kapur putih raksasa.",
              full: "Coccolithophore adalah fitoplankton uniseluler yang mengelilingi dirinya dengan pelat-pelat kalsium karbonat mikroskopis yang disebut coccolith. Meskipun ukurannya sangat kecil, mereka hidup dalam jumlah triliunan dan mekar (blooming) hingga terlihat dari luar angkasa, mengubah warna lautan menjadi biru kehijauan. Mereka adalah produsen utama oksigen dan penyerap karbon dioksida di lautan.",
              key: "Coccolithophore dalam jumlah miliaran membentuk tebing kapur raksasa berwarna putih di Dover, Inggris!",
            },
            details: {
              diet: "Fotosintesis (Autotrof)",
              lifespan: "Beberapa hari",
              weight: "Mikroskopis",
              size: "< 0.02 mm",
              discoveryYear: "Abad ke-19",
              taxonomy: "Haptophyta",
              stats: { completeness: 100, rarity: 5, value: 90 },
            },
          },
        ],
      },
      {
        title: "VERTEBRATA",
        desc: "Hewan dengan struktur tulang belakang.",
        image: "/ImageModels/EraGeologi/trex.jpg",
        items: [
          {
            name: "ALLOSAURUS",
            modelPath: "/models/hewan/vertebrata/allosaurus.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2015/12/Allosaurus-Images.jpg",
            period: "Mesozoikum (Jura Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus karnivora puncak pada zaman Jura yang berburu mangsa besar dengan gigi tajam bergerigi dan cakar tangan yang kuat, hidup jauh sebelum T-Rex muncul.",
              full: "Allosaurus ('Kadal Berbeda') adalah predator theropoda dominan di Amerika Utara selama periode Jura Akhir (sekitar 155-150 juta tahun lalu). Memiliki panjang tubuh rata-rata 8,5 meter, ia dilengkapi dengan rahang kuat yang bisa membuka lebar dan gigi bergerigi melengkung ke belakang untuk mengiris daging. Penelitian menunjukkan Allosaurus mungkin berburu sauropoda raksasa atau stegosaurus secara berkelompok atau menyerang bagian lunak mangsanya.",
              key: "Allosaurus bisa membuka mulutnya sangat lebar seperti ular (hingga 79 derajat) untuk menghantam mangsanya dengan gigi atasnya!",
            },
            details: {
              diet: "Karnivora (Daging)",
              lifespan: "25 - 30 Tahun",
              weight: "1.5 - 2 Ton",
              size: "Panjang 8.5 Meter",
              discoveryYear: "1877 (O.C. Marsh)",
              taxonomy: "Dinosauria > Theropoda",
              stats: { completeness: 60, rarity: 70, value: 85 },
            },
          },
          {
            name: "COELACANTH",
            modelPath: "/models/hewan/vertebrata/coelacanth.glb",
            image:
              "https://cdn.grid.id/crop/0x0:0x0/x/photo/2022/12/07/3jpg-20221207021026.jpg",
            period: "Paleozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Ikan purba legendaris yang memiliki sirip berdaging mirip kaki, sempat dianggap punah jutaan tahun lalu sebelum ditemukan masih hidup di laut dalam Afrika dan Indonesia.",
              full: "Coelacanth adalah ordo ikan purba yang termasuk dalam kelompok Sarcopterygii (ikan bersirip lobus). Mereka memiliki ciri fisik unik yang tidak berubah selama ratusan juta tahun, termasuk sirip berpasangan yang bergerak seperti kaki hewan darat, sisik tebal tipe kosmoid, dan organ pendeteksi listrik di moncongnya. Penemuan kembali ikan ini pada tahun 1938 menggemparkan dunia sains karena sebelumnya hanya diketahui dari catatan fosil.",
              key: "Coelacanth punya keunikan aneh: ia memiliki ekor kecil tambahan di tengah-tengah ekor utamanya!",
            },
            details: {
              diet: "Karnivora (Ikan/Cumi)",
              lifespan: "60 - 100 Tahun",
              weight: "Mencapai 90 kg",
              size: "Panjang hingga 2 m",
              discoveryYear: "1938 (Ditemukan hidup)",
              taxonomy: "Sarcopterygii",
              stats: { completeness: 90, rarity: 95, value: 100 },
            },
          },
          {
            name: "LATIMERIA",
            modelPath: "/models/hewan/vertebrata/dinorauls_latimeria_2.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/9/96/Latimeria_Paris.jpg",
            period: "Kenozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Genus modern dari ikan purba Coelacanth yang masih hidup hingga saat ini.",
              full: "Latimeria adalah satu-satunya genus Coelacanth yang masih bertahan hidup. Struktur tubuhnya mempertahankan ciri-ciri primitif dari nenek moyang ikan.",
              key: "Latimeria adalah spesies yang secara mengejutkan ditemukan hidup dan berenang di perairan Manado, Indonesia!",
            },
            details: {
              diet: "Karnivora",
              lifespan: "60 - 100 Tahun",
              weight: "95 kg",
              size: "Panjang 1.8 m",
              discoveryYear: "1997 (Manado)",
              taxonomy: "Sarcopterygii",
              stats: { completeness: 100, rarity: 100, value: 100 },
            },
          },
          {
            name: "KOMODO",
            modelPath: "/models/hewan/vertebrata/komodo_dragon_lizard-v2.glb",
            image:
              "https://samaraliveaboard.com/wp-content/uploads/2025/03/komodo-1-1024x683.jpg",
            period: "Kenozoikum - Sekarang",
            status: "MASIH HIDUP",
            description: {
              short:
                "Kadal terbesar di dunia yang hanya hidup di beberapa pulau di Indonesia, predator puncak dengan gigitan berbisa dan air liur penuh bakteri mematikan.",
              full: "Komodo (Varanus komodoensis) adalah spesies biawak raksasa endemik Indonesia yang merupakan sisa fauna purba. Panjangnya bisa mencapai 3 meter dengan berat lebih dari 70 kg. Mereka berburu dengan strategi penyergapan, mengandalkan indra penciuman tajam untuk mendeteksi bangkai atau mangsa dari jarak jauh. Air liur komodo mengandung racun antikoagulan yang mencegah pembekuan darah mangsa, mempercepat kematian akibat syok dan kehabisan darah.",
              key: "Komodo bisa melahap mangsa hingga 80% dari berat tubuhnya sendiri dalam sekali makan!",
            },
            details: {
              diet: "Karnivora (Rusa/Kerbau)",
              lifespan: "30 - 50 Tahun",
              weight: "70 - 90 kg",
              size: "Panjang 2 - 3 m",
              discoveryYear: "1910 (Ouwens)",
              taxonomy: "Reptilia > Squamata",
              stats: { completeness: 100, rarity: 80, value: 90 },
            },
          },
          {
            name: "PTERANODON",
            modelPath: "/models/hewan/vertebrata/pteranodon.glb",
            image:
              "https://cdn.mos.cms.futurecdn.net/6vA8wWskCkUgffN9dbQhvh-1200-80.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Reptil terbang raksasa dari zaman Kapur dengan bentang sayap lebar dan jambul kepala yang khas, hidup di pesisir pantai dan memakan ikan.",
              full: "Pteranodon bukanlah dinosaurus, melainkan reptil terbang (Pterosaurus) yang hidup pada periode Kapur Akhir di Amerika Utara. Spesies jantan memiliki bentang sayap hingga 7 meter dan jambul tulang panjang di kepala yang kemungkinan berfungsi sebagai kemudi aerodinamis atau penarik pasangan. Mereka tidak memiliki gigi dan menangkap ikan dengan cara menyambar permukaan air (skimming) seperti burung pelikan modern.",
              key: "Pteranodon sama sekali tidak punya gigi di paruhnya meskipun bentang sayapnya mencapai 7 meter (sepanjang bus)!",
            },
            details: {
              diet: "Piscivora (Ikan)",
              lifespan: "20 - 30 Tahun",
              weight: "20 - 90 kg",
              size: "Bentang Sayap 7 m",
              discoveryYear: "1876 (O.C. Marsh)",
              taxonomy: "Pterosauria",
              stats: { completeness: 50, rarity: 60, value: 85 },
            },
          },
          {
            name: "SPINOSAURUS",
            modelPath: "/models/hewan/vertebrata/spinosaurus.glb",
            image:
              "https://st2.depositphotos.com/1042659/6280/i/450/depositphotos_62803335-stock-photo-dinosaur-spinosaurus.jpg",
            period: "Mesozoikum (Kapur Awal)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus karnivora terbesar yang pernah ada, hidup semi-akuatik di sungai purba dengan ciri khas layar besar di punggung dan moncong panjang mirip buaya.",
              full: "Spinosaurus aegyptiacus adalah predator raksasa yang lebih panjang dan berat dari T-Rex, diadaptasi khusus untuk gaya hidup semi-akuatik. Tulang-tulangnya padat untuk membantu menyelam, kaki belakangnya pendek, dan moncongnya panjang penuh gigi kerucut untuk menangkap ikan besar. Struktur layar di punggungnya dibentuk oleh duri tulang vertebra yang sangat panjang, kemungkinan berfungsi untuk termoregulasi atau intimidasi.",
              key: "Spinosaurus memiliki duri-duri tulang di punggung yang tingginya bisa mencapai 1,6 meter, lebih tinggi dari manusia dewasa!",
            },
            details: {
              diet: "Karnivora (Semi-akuatik)",
              lifespan: "30+ Tahun",
              weight: "7 - 20 Ton",
              size: "Panjang 14 - 15 m",
              discoveryYear: "1912 (Ernst Stromer)",
              taxonomy: "Dinosauria > Theropoda",
              stats: { completeness: 40, rarity: 85, value: 95 },
            },
          },
          {
            name: "TRICERATOPS",
            modelPath: "/models/hewan/vertebrata/triceratop.glb",
            image:
              "https://cdn.grid.id/crop/0x127:1024x741/x/photo/2025/08/11/triceratops_-_jurapark_baltowjp-20250811114312.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus herbivora berbadan besar dengan tiga tanduk di wajah dan tameng leher lebar, hidup berkelompok dan sering bertarung melawan T-Rex.",
              full: "Triceratops adalah salah satu dinosaurus ceratopsid (bertanduk) paling terkenal dari akhir periode Kapur. Kepalanya yang masif dihiasi dua tanduk panjang di atas mata, satu tanduk pendek di hidung, dan jumbai tulang (frill) lebar di bagian belakang leher. Struktur ini berfungsi sebagai pertahanan mematikan terhadap predator serta alat komunikasi visual antar spesies. Paruhnya yang kuat didesain for memotong vegetasi keras seperti sikas dan palem.",
              key: "Triceratops punya sekitar 800 gigi di rahangnya, tapi mereka hanya menggunakan sebagian kecilnya secara bergantian untuk mengunyah tanaman!",
            },
            details: {
              diet: "Herbivora (Tanaman Keras)",
              lifespan: "40 - 50 Tahun",
              weight: "6 - 12 Ton",
              size: "Panjang 8 - 9 m",
              discoveryYear: "1889 (O.C. Marsh)",
              taxonomy: "Dinosauria > Ceratopsia",
              stats: { completeness: 75, rarity: 40, value: 90 },
            },
          },
          {
            name: "VELOCIRAPTOR",
            modelPath: "/models/geologi/era_mesozoikum/velociraptor.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2015/08/Velociraptor.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus pemangsa berukuran kecil, lincah, cerdas, dan tertutup bulu, terkenal dengan cakar sabit besar di kakinya.",
              full: "Velociraptor mongoliensis aslinya jauh lebih kecil daripada yang digambarkan di film, hanya seukuran kalkun besar. Fosilnya membuktikan bahwa mereka memiliki 'quill knobs' (benjolan tempat melekatnya bulu) di lengan, menegaskan bahwa mereka berbulu lebat seperti burung. Mereka adalah predator gurun yang ganas, menggunakan cakar sabit di kaki kedua untuk menusuk mangsa seperti Protoceratops. Mereka mungkin berburu sendiri atau dalam kelompok kecil.",
              key: "Velociraptor sebenarnya kecil and berbulu, bukan raksasa seperti di film. Senjata utamanya adalah cakar melengkung di kaki, bukan gigitan.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "10 - 15 Tahun",
              weight: "15 - 20 kg",
              size: "Panjang 2 m",
              discoveryYear: "1924 (H.F. Osborn)",
              taxonomy: "Dinosauria > Dromaeosauridae",
              stats: { completeness: 80, rarity: 60, value: 85 },
            },
          },
        ],
      },
    ],
  },
  FOSSIL: {
    id: "FOSSIL",
    title: "JENIS FOSIL",
    desc: "Klasifikasi batuan & mineral.",
    color: "#ff4d4d",
    image: "/ImageModels/EraGeologi/jenisfosil.jpg",
    subCategories: [
      {
        title: "FOSIL JEJAK",
        desc: "Sisa aktivitas (Trace Fossils).",
        image: "/ImageModels/EraGeologi/velociraptor.webp",
        items: [
          {
            name: "JEJAK T-REX",
            modelPath: "/models/fosil/fosil_jejak/dinosaur_Trex_footprint.glb",
            image:
              "https://www.theprehistoricstore.com/cdn/shop/files/20250117-131441_683x700.jpg?v=1737288879",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Cetakan kaki raksasa berjarak tiga dari Tyrannosaurus Rex yang membatu, menunjukkan ukuran masif dan tekanan langkah predator puncak ini.",
              full: "Fosil jejak (ichnofosil) berupa cetakan kaki T-Rex memberikan informasi berharga yang tidak bisa didapat dari tulang belulang saja, seperti kecepatan berjalan, postur tubuh, dan biomekanik pergerakan. Jejak ini menunjukkan kaki berjari tiga dengan bantalan tumit yang tebal dan luas untuk menopang berat tubuh yang mencapai 8 ton. Dalamnya cetakan pada batuan sedimen menunjukkan kekuatan impak langkah sang raja dinosaurus.",
              key: "Jejak T-Rex ini adalah bukti fisik langsung interaksi sang predator dengan lingkungannya saat masih hidup.",
            },
            details: {
              diet: "N/A",
              lifespan: "N/A",
              weight: "N/A",
              size: "Panjang 1m",
              discoveryYear: "N/A",
              taxonomy: "Ichnofossil",
              stats: { completeness: 80, rarity: 60, value: 70 },
            },
          },
          {
            name: "JEJAK VELOCIRAPTOR",
            modelPath: "/models/fosil/fosil_jejak/footprint_raptor.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/f/f4/Velociraptor_footprint_%2817100106312%29.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Jejak kaki unik dinosaurus raptor yang hanya menampakkan dua jari menapak tanah, karena satu jari bercakar besar diangkat ke atas.",
              full: "Jejak kaki ini mengkonfirmasi anatomi kaki dromaeosaurid (raptor) yang unik, yaitu kondisi 'didactyl' (dua jari). Raptor berjalan hanya menggunakan jari ketiga dan keempat, sementara jari kedua yang memiliki cakar sabit besar yang melengkung (killing claw) diangkat tinggi agar tetap tajam dan siap digunakan untuk menyerang. Pola jejak ini sangat berbeda dengan dinosaurus theropoda lain yang umumnya menapak dengan tiga jari.",
              key: "Jejak Velociraptor ini memberikan bukti perilaku bahwa raptor menjaga ketajaman senjata utamanya dengan tidak menapakkannya ke tanah.",
            },
            details: {
              diet: "N/A",
              lifespan: "N/A",
              weight: "N/A",
              size: "15 cm",
              discoveryYear: "N/A",
              taxonomy: "Ichnofossil",
              stats: { completeness: 70, rarity: 75, value: 80 },
            },
          },
          {
            name: "JEJAK SAUROPODA",
            modelPath: "/models/fosil/fosil_jejak/sauropod_footprint.glb",
            image:
              "https://cdn.mos.cms.futurecdn.net/G7CKGktH2mtEQbdo7qDsGE-1200-80.jpg",
            period: "Mesozoikum (Jura)",
            status: "PUNAH",
            description: {
              short:
                "Jejak kaki bulat berukuran sangat besar yang ditinggalkan kawanan dinosaurus leher panjang saat bermigrasi melintasi dataran lumpur purba.",
              full: "Trackway (jalur jejak) sauropoda sering ditemukan membentang panjang, menunjukkan perilaku sosial hidup berkelompok. Jejak kaki depan biasanya berbentuk bulan sabit yang lebih kecil, sedangkan kaki belakang berbentuk bulat lonjong yang sangat besar. Kedalaman dan jarak antar jejak membantu ilmuwan memperkirakan kecepatan berjalan dan ukuran tubuh dinosaurus tersebut. Lubang jejak yang dalam ini terkadang menjadi perangkap mematikan bagi hewan kecil lainnya.",
              key: "Jejak Sauropoda ini merekam momen migrasi hewan darat terbesar yang pernah berjalan di muka bumi.",
            },
            details: {
              diet: "N/A",
              lifespan: "N/A",
              weight: "N/A",
              size: "Diameter 1m",
              discoveryYear: "N/A",
              taxonomy: "Ichnofossil",
              stats: { completeness: 90, rarity: 50, value: 75 },
            },
          },
        ],
      },
      {
        title: "TERAWETKAN",
        desc: "Organisme utuh dalam amber/es.",
        image: "/ImageModels/EraGeologi/amphibian.jpg",
        items: [
          {
            name: "DAUN PAKIS",
            modelPath: "/models/fosil/fosil_terawetkan/eduf104_fern_leaves.glb",
            image:
              "https://media.istockphoto.com/id/1449549945/id/foto/fosil-daun-pakis-membatu-dan-disorot-di-permukaan-batu.jpg?s=170667a&w=0&k=20&c=jZ_D3VaG8-J2TNJj9yORAvqj6u3BlCZahtxuh-qaNKQ=",
            period: "Paleozoikum (Karbon)",
            status: "PUNAH",
            description: {
              short:
                "Cetakan karbon daun tumbuhan paku dari zaman Karbon, sisa hutan rawa purba yang kini menjadi sumber batu bara dunia.",
              full: "Fosil daun pakis (fern) ini terbentuk melalui proses karbonisasi, di mana tumbuhan tertimbun sedimen dalam kondisi tanpa oksigen, menyisakan lapisan karbon tipis yang mencetak detail bentuk daun pada batuan. Tumbuhan ini mendominasi hutan rawa lembap pada Periode Karbon (300 juta tahun lalu). Penumpukan biomassa tanaman ini selama jutaan tahun adalah asal mula sebagian besar cadangan batu bara yang kita gunakan sebagai energi saat ini.",
              key: "Daun Pakis ini adalah saksi bisu era di mana kadar oksigen bumi sangat tinggi, memungkinkan serangga tumbuh raksasa.",
            },
            details: {
              diet: "Fotosintesis",
              lifespan: "Musiman",
              weight: "N/A",
              size: "10 - 50 cm",
              discoveryYear: "N/A",
              taxonomy: "Pteridophyta",
              stats: { completeness: 85, rarity: 20, value: 60 },
            },
          },
          {
            name: "KAYU MEMBATU",
            modelPath:
              "/models/fosil/fosil_terawetkan/eduf407_petrified_wood.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatFnYn9XFV7fWOKtr62uj5FpKpRF3nXvU9A&s",
            period: "Zaman Prasejarah",
            status: "PUNAH",
            description: {
              short:
                "Batang pohon purba yang materi organiknya telah tergantikan sepenuhnya oleh mineral batu namun tetap mempertahankan struktur serat kayu aslinya.",
              full: "Kayu membatu (Petrified Wood) terbentuk melalui proses permineralisasi. Ketika pohon purba tertimbun abu vulkanik atau sedimen basah, air tanah yang kaya mineral (seperti silika) meresap ke dalam pori-pori sel kayu. Seiring waktu, materi organik membusuk dan digantikan molekul demi molekul oleh mineral batu, mengawetkan bentuk asli pohon hingga ke tingkat sel mikroskopis. Hasilnya adalah fosil yang sekeras batu namun terlihat persis seperti kayu.",
              key: "Kayu Membatu adalah contoh sempurna transformasi materi organik menjadi anorganik tanpa mengubah bentuk fisik aslinya.",
            },
            details: {
              diet: "N/A",
              lifespan: "Ratusan Tahun",
              weight: "Berat Batu",
              size: "Bervariasi",
              discoveryYear: "N/A",
              taxonomy: "Plantae",
              stats: { completeness: 95, rarity: 40, value: 70 },
            },
          },
          {
            name: "BAYI MAMMOTH LYUBA",
            modelPath:
              "/models/fosil/fosil_terawetkan/lyuba_the_woolly_mammoth_calf.glb",
            image:
              "https://historyofinformation.com/images/Screen_Shot_2020-10-05_at_6.16.10_PM.png",
            period: "Kenozoikum (Pleistosen)",
            status: "PUNAH",
            description: {
              short:
                "Mumi bayi Mammoth berbulu paling utuh yang pernah ditemukan, terawetkan sempurna di dalam es abadi Siberia selama 40.000 tahun.",
              full: "Lyuba adalah spesimen bayi Mammoth berbulu (Mammuthus primigenius) betina yang meninggal sekitar usia 1 bulan akibat tenggelam di lumpur, yang kemudian membeku menjadi permafrost. Kondisi pengawetannya sangat luar biasa; kulit, daging, belalai, organ dalam, bahkan sisa susu ibu di dalam perutnya masih utuh. Penemuan ini memberikan data biologis yang tak ternilai mengenai anatomi dan fisiologi hewan zaman es yang tidak bisa didapat dari fosil tulang.",
              key: "Lyuba adalah jendela waktu yang nyata ke masa lalu, menampilkan rupa asli hewan punah dengan detail sempurna.",
            },
            details: {
              diet: "Susu",
              lifespan: "1 Bulan",
              weight: "50 kg",
              size: "85 cm",
              discoveryYear: "2007 (Siberia)",
              taxonomy: "Proboscidea",
              stats: { completeness: 100, rarity: 100, value: 100 },
            },
          },
          {
            name: "NYAMUK AMBER",
            modelPath:
              "/models/fosil/fosil_terawetkan/real-time_refraction_demo_mosquito_in_amber.glb",
            image:
              "https://img.freepik.com/foto-premium/amber-dengan-serangga-prasejarah-yang-diawetkan-nyamuk-dengan-darah-atau-dna-yang-diawetkan-dalam-amber_72932-3415.jpg?w=360",
            period: "Mesozoikum - Kenozoikum",
            status: "PUNAH",
            description: {
              short:
                "Serangga kecil yang terperangkap and mati di dalam getah pohon yang mengeras, tubuhnya terawetkan utuh dalam 'peti mati' emas transparan.",
              full: "Amber adalah getah pohon purba (resin) yang telah memfosil. Seringkali, serangga atau hewan kecil terjebak di dalam getah lengket ini saat masih cair. Ketika getah mengeras dan mengalami proses polimerisasi selama jutaan tahun, tubuh hewan di dalamnya terisolasi dari udara dan bakteri pembusuk, sehingga terawetkan dengan detail tiga dimensi yang sempurna. Amber menjadi kapsul waktu yang menyimpan ekosistem hutan purba.",
              key: "Nyamuk Amber populer di film fiksi ilmiah, namun mengekstraksi DNA dari fosil ini sangatlah sulit dan belum terbukti berhasil.",
            },
            details: {
              diet: "Darah",
              lifespan: "Singkat",
              weight: "Mikro",
              size: "1 cm",
              discoveryYear: "N/A",
              taxonomy: "Insecta",
              stats: { completeness: 100, rarity: 80, value: 90 },
            },
          },
        ],
      },
      {
        title: "FOSIL TUBUH",
        desc: "Sisa tulang, gigi, and cangkang.",
        image: "/ImageModels/EraGeologi/smilodon.webp",
        items: [
          {
            name: "CAKAR VELOCIRAPTOR",
            modelPath:
              "/models/fosil/fosil_tubuh/deinonychus_velociraptor_claw.glb",
            image:
              "https://c02.purpledshub.com/uploads/sites/41/2021/05/GettyImages-589152322-c7ec34e.jpg?webp=1&w=1200",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Fosil cakar kaki melengkung tajam berbentuk sabit, senjata utama dinosaurus raptor untuk menusuk dan mencengkeram mangsanya.",
              full: "Ini adalah fosil 'Terrible Claw' atau cakar pembunuh yang menjadi ciri khas dinosaurus Dromaeosaurid seperti Velociraptor and Deinonychus. Cakar ini terletak di jari kaki kedua and memiliki persendian khusus yang memungkinkannya ditarik ke atas (retractable) saat berjalan and diayunkan ke bawah dengan kekuatan besar saat menyerang. Bentuknya yang melengkung and tajam dirancang untuk menembus kulit tebal mangsa atau memanjat tubuh dinosaurus yang lebih besar.",
              key: "Cakar Velociraptor adalah adaptasi evolusioner yang mengubah kaki menjadi senjata ofensif yang mematikan.",
            },
            details: {
              diet: "N/A",
              lifespan: "N/A",
              weight: "N/A",
              size: "10 cm",
              discoveryYear: "N/A",
              taxonomy: "Theropoda",
              stats: { completeness: 80, rarity: 70, value: 75 },
            },
          },
          {
            name: "BELEMNITE",
            modelPath:
              "/models/fosil/fosil_tubuh/eduf32_belemnite_phragmacone.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT578NeCt-YGMQs3s-wKKmemcjs75ZXxMLM6g&s",
            period: "Mesozoikum (Jura - Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Bagian dalam cangkang keras berbentuk peluru dari hewan laut purba mirip cumi-cumi, sering ditemukan melimpah di batuan sedimen.",
              full: "Belemnite adalah ordo cephalopoda punah yang hidup pada era Mesozoikum. Fosil yang umum ditemukan adalah bagian 'rostrum' atau 'guard', yaitu struktur internal keras berbentuk seperti peluru yang berfungsi sebagai penyeimbang berat tubuh agar hewan ini bisa berenang lurus secara horizontal. Bagian tubuh lunaknya mirip cumi-cumi modern dengan tentakel berkait (bukan pengisap) and kantung tinta.",
              key: "Belemnite sangat umum ditemukan di batuan Jura and Kapur, sering dijadikan fosil indeks and indikator suhu laut purba.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "2 - 4 Tahun",
              weight: "< 1 kg",
              size: "10 - 50 cm",
              discoveryYear: "Kuno",
              taxonomy: "Cephalopoda",
              stats: { completeness: 90, rarity: 30, value: 65 },
            },
          },
          {
            name: "GIGI MEGALODON",
            modelPath: "/models/fosil/fosil_tubuh/megalodon_teeth_fossil.glb",
            image:
              "https://www.buriedtreasurefossils.com/media/magefan_blog/OSB-1---LC-meg.gif",
            period: "Kenozoikum (Miosen)",
            status: "PUNAH",
            description: {
              short:
                "Gigi fosil berukuran raksasa, berbentuk segitiga and bergerigi tajam, satu-satunya sisa yang tertinggal dari hiu terbesar sepanjang masa.",
              full: "Megalodon (Otodus megalodon) adalah hiu terbesar yang pernah meneror lautan. Karena kerangka hiu terbuat dari tulang rawan yang mudah hancur, gigi adalah satu-satunya bagian tubuh yang umum memfosil. Gigi ini bisa mencapai ukuran diagonal lebih dari 18 cm, dengan tepi bergerigi halus seperti gergaji untuk memotong daging paus and mamalia laut besar lainnya. Ukuran gigi ini mengindikasikan kekuatan gigitan yang mencapai 180.000 Newton.",
              key: "Gigi Megalodon adalah gigi terbesar di dunia hewan, simbol kekuatan predator puncak lautan purba.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "N/A",
              weight: "N/A",
              size: "18 cm",
              discoveryYear: "Renaissance",
              taxonomy: "Chondrichthyes",
              stats: { completeness: 95, rarity: 70, value: 90 },
            },
          },
          {
            name: "TENGKORAK SMILODON",
            modelPath:
              "/models/fosil/fosil_tubuh/saber-toothed_tiger_cat_-_ice_age_smilodon.glb",
            image:
              "https://www.activewild.com/wp-content/uploads/2018/11/Smilodon_populator_skull.jpg",
            period: "Kenozoikum (Pleistosen)",
            status: "PUNAH",
            description: {
              short:
                "Tengkorak macan purba dengan sepasang gigi taring atas yang sangat panjang seperti pedang, rahangnya bisa membuka sangat lebar.",
              full: "Tengkorak Smilodon fatalis memperlihatkan adaptasi predator yang sangat spesifik. Taring 'saber' (pedang) yang panjangnya bisa mencapai 28 cm ini sebenarnya cukup rapuh terhadap tekanan samping. Oleh karena itu, Smilodon memiliki struktur rahang yang bisa membuka hingga 120 derajat and otot leher yang sangat kuat untuk menancapkan taringnya ke leher mangsa yang sudah dilumpuhkan, memutus pembuluh darah utama dengan presisi bedah.",
              key: "Smilodon adalah ikon predator Zaman Es yang menunjukkan spesialisasi evolusi berburu yang ekstrem.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "N/A",
              weight: "N/A",
              size: "40 cm",
              discoveryYear: "N/A",
              taxonomy: "Mammalia",
              stats: { completeness: 80, rarity: 50, value: 70 },
            },
          },
          {
            name: "TENGKORAK T-REX",
            modelPath:
              "/models/fosil/fosil_tubuh/vertebrate_tyrannosaurus_rex_skull_mote.glb",
            image:
              "https://pict.sindonews.net/dyn/850/pena/news/2022/12/09/768/964301/tengkorak-kepala-trex-dilelang-harga-diperkirakan-tembus-rp311-miliar-zvi.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Tengkorak kokoh dengan rahang yang sangat kuat and gigi berbentuk pisang yang tebal, didesain untuk meremukkan tulang mangsa.",
              full: "Tengkorak Tyrannosaurus rex berbeda dari theropoda lain karena bentuknya yang lebar di bagian belakang, memberikan penglihatan binokular (kedalaman visual) yang sangat baik. Tulang tengkoraknya menyatu and sangat tebal untuk menahan gaya gigitan yang ekstrem. Giginya tidak pipih and tajam untuk mengiris, melainkan tebal and bulat seperti pasak besi, dirancang untuk menusuk and menghancurkan tulang (osteophagy) mangsanya hingga hancur.",
              key: "Tengkorak T-Rex memiliki struktur pemangsa paling mematikan dengan kekuatan gigitan terkuat di antara hewan darat yang pernah ada.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "N/A",
              weight: "N/A",
              size: "1.5 m",
              discoveryYear: "N/A",
              taxonomy: "Theropoda",
              stats: { completeness: 70, rarity: 80, value: 95 },
            },
          },
          {
            name: "GIGI RUSA RAKSASA",
            modelPath:
              "/models/fosil/fosil_tubuh/giant_deer_teeth_115000_years_old.glb",
            image:
              "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/32/2024/09/25/News-20240919-Czech-Republic-Reindeer-Teeth-565674170.jpg",
            period: "Kenozoikum (Pleistosen)",
            status: "PUNAH",
            description: {
              short:
                "Fosil gigi geraham besar dengan permukaan kasar dari Megaloceros, digunakan untuk mengunyah rumput and vegetasi keras di padang es.",
              full: "Gigi ini milik Megaloceros giganteus (Rusa Raksasa Irlandia), rusa terbesar yang pernah hidup. Struktur giginya yang tinggi and bergelombang (hypsodont) menunjukkan adaptasi khusus untuk memakan rumput yang keras and abrasif di lingkungan stepa terbuka Zaman Es. Gigi ini harus sangat kuat untuk memproses volume makanan yang besar guna menopang tubuh raksasa and pertumbuhan tanduk masif mereka setiap tahunnya.",
              key: "Gigi Rusa Raksasa ini memberikan petunjuk tentang pola makan and lingkungan hidup megafauna Pleistosen.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "20 Tahun",
              weight: "N/A",
              size: "8 cm",
              discoveryYear: "N/A",
              taxonomy: "Mammalia",
              stats: { completeness: 90, rarity: 60, value: 70 },
            },
          },
          {
            name: "TENGKORAK TRICERATOPS",
            modelPath: "/models/fosil/fosil_tubuh/triceratops_skull.glb",
            image:
              "https://media.istockphoto.com/id/501154807/id/foto/tengkorak-fosil-triceratops-di-atas-latar-belakang-terisolasi-putih.jpg?s=612x612&w=0&k=20&c=QsPjw2eXUU3bWdahhpITi7TY6dSpYgv7c0ZywCCZLaI=",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Salah satu tengkorak terbesar hewan darat, dilengkapi paruh keras, tiga tanduk tajam, and tameng leher tulang yang kokoh.",
              full: "Tengkorak Triceratops adalah mahakarya pertahanan alam. Panjangnya bisa mencapai 2,5 meter, hampir sepertiga panjang tubuhnya. Paruh di bagian depan sangat kuat untuk mematahkan dahan tanaman keras. Tiga tanduknya digunakan untuk bertarung sesama pejantan atau melawan predator. Tameng leher (frill) yang terbuat dari tulang padat berfungsi melindungi leher dari gigitan and tempat melekatnya otot rahang yang kuat.",
              key: "Tengkorak Triceratops sering ditemukan memfosil secara utuh karena struktur tulangnya yang sangat tebal and keras.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "N/A",
              weight: "N/A",
              size: "2.5 m",
              discoveryYear: "N/A",
              taxonomy: "Ceratopsia",
              stats: { completeness: 85, rarity: 60, value: 80 },
            },
          },
        ],
      },
    ],
  },
  ERA: {
    id: "ERA",
    title: "ERA ZAMAN",
    desc: "Timeline sejarah bumi.",
    color: "#00d2ff",
    image: "/ImageModels/EraGeologi/backgroundquiz.jpg",
    subCategories: [
      {
        title: "PALEOZOIKUM",
        desc: "Ledakan kehidupan laut purba.",
        image: "/ImageModels/EraGeologi/foto-paleozoikum.jpg",
        items: [
          {
            name: "ANOMALOCARIS",
            modelPath:
              "/models/geologi/era_paleozoikum/anomalocaris_3d_model.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKirad74kBrQZ5awp0RCliWJ2WObwA64JpA&s",
            period: "Paleozoikum (Kambrium)",
            status: "PUNAH",
            description: {
              short:
                "Predator laut raksasa pertama di bumi dari zaman Kambrium, memiliki mata majemuk besar and sepasang lengan berduri di dekat mulut untuk menangkap mangsa.",
              full: "Anomalocaris ('Udang Aneh') adalah penguasa lautan Kambrium sekitar 500 juta tahun lalu. Dengan panjang mencapai 1 meter, ia adalah raksasa di zamannya. Hewan ini memiliki tubuh bersegmen dengan sirip samping untuk berenang, mulut berbentuk cincin yang unik untuk meremukkan mangsa bercangkang lunak, and sepasang lengan berduri untuk menyambar trilobita. Mata majemuknya sangat canggih, memberinya penglihatan tajam sebagai pemburu visual.",
              key: "Anomalocaris merupakan predator puncak (apex predator) pertama yang diketahui dalam sejarah evolusi hewan.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "2 - 5 Tahun",
              weight: "5 kg",
              size: "1 m",
              discoveryYear: "1892",
              taxonomy: "Radiodonta",
              stats: { completeness: 40, rarity: 90, value: 100 },
            },
          },
          {
            name: "DIMETRODON",
            modelPath: "/models/geologi/era_paleozoikum/dimetrodon.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Om1KbpIjtaEVrAfucbh-LepeHUcPK6i_Ng&s",
            period: "Paleozoikum (Permian)",
            status: "PUNAH",
            description: {
              short:
                "Reptil purba berkaki empat dengan layar besar di punggungnya, hidup jauh sebelum dinosaurus and sebenarnya lebih berkerabat dekat dengan mamalia.",
              full: "Dimetrodon sering dikira dinosaurus, padahal ia adalah Pelycosaur (Synapsida) yang hidup pada periode Permian, jutaan tahun sebelum dinosaurus pertama muncul. Ciri khasnya adalah layar punggung tinggi yang dibentuk oleh perpanjangan tulang belakang. Layar ini kaya akan pembuluh darah and berfungsi sebagai alat termoregulasi canggih—menyerap panas matahari di pagi hari agar ia bisa aktif berburu lebih cepat daripada mangsanya.",
              key: "Dimetrodon bukan dinosaurus, melainkan kerabat awal mamalia. Layar besar di punggungnya berfungsi untuk mengatur suhu tubuh.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "250 kg",
              size: "4.6 m",
              discoveryYear: "1878",
              taxonomy: "Synapsida",
              stats: { completeness: 85, rarity: 40, value: 85 },
            },
          },
          {
            name: "ARTHROPLEURA",
            modelPath:
              "/models/geologi/era_paleozoikum/dinorauls_arthropleura.glb",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Arthropleura_Reconstruction.jpg/250px-Arthropleura_Reconstruction.jpg",
            period: "Paleozoikum (Karbon)",
            status: "PUNAH",
            description: {
              short:
                "Kelabang raksasa seukuran mobil yang hidup di hutan rawa zaman Karbon, invertebrata darat terbesar yang pernah merayap di bumi.",
              full: "Arthropleura adalah artropoda raksasa yang hidup sekitar 300 juta tahun lalu. Panjang tubuhnya bisa mencapai 2,5 meter. Ukuran fantastis ini dimungkinkan karena tingginya kadar oksigen di atmosfer pada periode Karbon and belum adanya predator vertebrata darat yang besar. Meskipun berpenampilan menyeramkan, penelitian fosil isi perut menunjukkan bahwa kemungkinan besar mereka adalah herbivora yang memakan tumbuhan paku and sisa tanaman busuk.",
              key: "Arthropleura adalah invertebrata darat terbesar yang pernah ada. Meski terlihat menyeramkan, hewan ini kemungkinan besar adalah herbivora.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "10 Tahun",
              weight: "50 kg",
              size: "2.5 m",
              discoveryYear: "1854",
              taxonomy: "Arthropoda",
              stats: { completeness: 50, rarity: 85, value: 90 },
            },
          },
          {
            name: "DUNKLEOSTEUS",
            modelPath:
              "/models/geologi/era_paleozoikum/dinorauls_dunkleosteus_2.glb",
            image:
              "https://it.schleich-s.com/cdn/shop/files/14575_main_v16_TP.jpg?v=1707493289",
            period: "Paleozoikum (Devon)",
            status: "PUNAH",
            description: {
              short:
                "Ikan purba raksasa yang kepala and dadanya dilindungi pelat tulang keras, memiliki rahang tajam pemotong tulang tanpa gigi sejati.",
              full: "Dunkleosteus terrelli adalah ikan Placoderm (ikan berahang perisai) terbesar yang hidup di periode Devon. Panjangnya mencapai 6 meter and berat 1 ton. Ia tidak memiliki gigi, melainkan lempengan tulang rahang yang menajam sendiri seperti gunting raksasa. Kekuatan gigitannya setara dengan T-Rex, memungkinkannya membelah mangsa bercangkang keras atau ikan hiu purba sekalipun. Ikan ini punah tanpa meninggalkan keturunan langsung.",
              key: "Dunkleosteus memiliki rahang pemotong tulang tanpa gigi sejati. Kekuatan gigitannya termasuk yang terkuat di lautan purba.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "4 Ton",
              size: "6 m",
              discoveryYear: "1873",
              taxonomy: "Placodermi",
              stats: { completeness: 70, rarity: 60, value: 90 },
            },
          },
          {
            name: "MEGANEURA",
            modelPath: "/models/geologi/era_paleozoikum/meganeura.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkspHJnRrRvRBvObxlyzBGwvDr9F1H4birvQ&s",
            period: "Paleozoikum (Karbon)",
            status: "PUNAH",
            description: {
              short:
                "Capung raksasa dengan bentang sayap selebar tangan manusia dewasa, predator udara yang menguasai langit zaman Karbon.",
              full: "Meganeura monyi adalah serangga mirip capung (Griffinfly) yang hidup di hutan rawa periode Karbon. Dengan bentang sayap mencapai 70 cm, ia adalah serangga terbesar yang pernah diketahui. Seperti capung modern, Meganeura adalah predator udara yang gesit, memangsa serangga lain and mungkin amfibi kecil. Ukurannya yang besar didukung oleh sistem pernapasan trakea yang efisien di atmosfer berkadar oksigen tinggi.",
              key: "Meganeura adalah serangga terbesar yang pernah hidup dengan bentang sayap sangat lebar. Ukurannya dimungkinkan oleh kadar oksigen tinggi di atmosfer purba.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "2 Tahun",
              weight: "< 1 kg",
              size: "Sayap 70 cm",
              discoveryYear: "1880",
              taxonomy: "Insecta",
              stats: { completeness: 30, rarity: 90, value: 80 },
            },
          },
          {
            name: "TRILOBITE",
            modelPath:
              "/models/geologi/era_paleozoikum/model_of_a_trilobite.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRstc9xAVu7a6fljWVLAqaDeOHWyE2U6R88Gg&s",
            period: "Paleozoikum (Kambrium)",
            status: "PUNAH",
            description: {
              short:
                "Hewan laut purba yang sangat sukses and beragam, memiliki tubuh bersegmen tiga lobus and mata majemuk kristal, mendominasi lautan selama ratusan juta tahun.",
              full: "Trilobita adalah kelas artropoda laut yang punah, menjadi salah satu kelompok hewan paling sukses dalam sejarah bumi. Mereka muncul di Kambrium Awal and bertahan selama hampir 300 juta tahun. Tubuhnya terbagi menjadi tiga lobus (sehingga namanya Trilobita). Mereka memiliki beragam bentuk and ukuran, serta mata majemuk dari mineral kalsit yang canggih. Sebagian besar hidup merayap di dasar laut, berenang, atau menggali lumpur.",
              key: "Trilobite adalah hewan laut purba yang sangat sukses and bertahan hampir 300 juta tahun. Mata majemuknya terbuat dari kristal kalsit.",
            },
            details: {
              diet: "Detritivora",
              lifespan: "5 Tahun",
              weight: "< 1 kg",
              size: "3 - 70 cm",
              discoveryYear: "1771",
              taxonomy: "Arthropoda",
              stats: { completeness: 98, rarity: 10, value: 95 },
            },
          },
          {
            name: "GORGONOPSID",
            modelPath:
              "/models/geologi/era_paleozoikum/primeval_-_gorgonopsid.glb",
            image:
              "https://images.steamusercontent.com/ugc/2057631029505964028/84558350C0569A59A53F5D4189B367D6199A0AC6/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
            period: "Paleozoikum (Permian)",
            status: "PUNAH",
            description: {
              short:
                "Predator darat utama pada akhir masa Paleozoikum, reptil mirip mamalia yang gesit dengan gigi taring besar untuk merobek mangsa.",
              full: "Gorgonopsid adalah kelompok Therapsida (reptil mirip mamalia) yang menjadi predator puncak pada periode Permian Akhir. Mereka menggabungkan ciri reptil and mamalia; memiliki kaki yang tegak di bawah tubuh (bukan merayap samping) yang memungkinkan gerakan cepat. Ciri utamanya adalah gigi taring 'saber' yang besar, yang kemudian berevolusi konvergen pada macan gigi pedang. Mereka punah dalam kepunahan massal Permian-Trias.",
              key: "Gorgonopsid adalah predator puncak darat sebelum dinosaurus muncul. Ia memiliki gigi taring besar mirip pedang, pendahulu evolusi gigi mamalia.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "20 Tahun",
              weight: "300 kg",
              size: "3 m",
              discoveryYear: "1876",
              taxonomy: "Therapsida",
              stats: { completeness: 60, rarity: 75, value: 85 },
            },
          },
        ],
      },
      {
        title: "MESOZOIKUM",
        desc: "Zaman kejayaan reptil raksasa.",
        image: "/ImageModels/EraGeologi/foto-mesozoikum.jpg",
        items: [
          {
            name: "ALLOSAURUS",
            modelPath: "/models/geologi/era_mesozoikum/allosaurus.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2015/12/Allosaurus-Images.jpg",
            period: "Mesozoikum (Jura)",
            status: "PUNAH",
            description: {
              short:
                "Predator puncak zaman Jura yang berburu mangsa besar dengan gigi tajam and cakar tangan kuat, teror bagi dinosaurus herbivora.",
              full: "Allosaurus adalah dinosaurus theropoda karnivora paling umum and berbahaya di Amerika Utara selama periode Jura Akhir. Berbeda dengan T-Rex yang mengandalkan kekuatan gigitan penghancur tulang, Allosaurus menggunakan rahangnya seperti kapak (hatchet attack)—membuka mulut lebar and mengayunkan gigi atasnya ke mangsa untuk menyebabkan pendarahan hebat. Ia memiliki lengan yang kuat with tiga cakar tajam untuk mencengkeram.",
              key: "Allosaurus berburu dengan cara melukai mangsa secara berulang hingga kehabisan darah. Strategi ini berbeda dari T-Rex yang mengandalkan gigitan penghancur tulang.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "2 Ton",
              size: "8.5 m",
              discoveryYear: "1877",
              taxonomy: "Theropoda",
              stats: { completeness: 85, rarity: 30, value: 90 },
            },
          },
          {
            name: "BRACHIOSAURUS",
            modelPath:
              "/models/geologi/era_mesozoikum/brachiosaurus_altithorax.glb",
            image:
              "https://awsimages.detik.net.id/community/media/visual/2023/12/22/brachiosaurus_169.jpeg?w=1200",
            period: "Mesozoikum (Jura)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus leher panjang raksasa with kaki depan yang lebih tinggi dari kaki belakang, memungkinkannya memakan daun di puncak pohon.",
              full: "Brachiosaurus adalah sauropoda kolosal yang memiliki postur tubuh unik seperti jerapah, dengan kaki depan lebih panjang daripada kaki belakang. Struktur ini memungkinkannya menjangkau dedaunan di pohon conifer yang sangat tinggi tanpa perlu mengangkat lehernya secara aktif. Lubang hidungnya terletak di puncak kepala yang menonjol. Tidak seperti sauropoda lain, Brachiosaurus kemungkinan tidak bisa berdiri dengan dua kaki belakang.",
              key: "Brachiosaurus memiliki kaki depan lebih panjang dari kaki belakang, Struktur ini memungkinkannya memakan daun di puncak pohon tinggi and menjadikannya Dinosaurus tertinggi.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "100 Tahun",
              weight: "50 Ton",
              size: "25 m",
              discoveryYear: "1903",
              taxonomy: "Sauropoda",
              stats: { completeness: 70, rarity: 60, value: 95 },
            },
          },
          {
            name: "DILOPHOSAURUS",
            modelPath:
              "/models/geologi/era_mesozoikum/dilophosaurus_wetherilli.glb",
            image:
              "https://images.dinosaurpictures.org/127544_Dilophosaurus_Pose_2_000.jpg0c59dae3-f8e3-48a4-a5d4-da8ff572cef3Original_eb0a.jpg",
            period: "Mesozoikum (Jura Awal)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus karnivora lincah dari awal zaman Jura, memiliki ciri khas sepasang jambul tulang berbentuk setengah lingkaran di atas kepalanya.",
              full: "Dilophosaurus wetherilli adalah theropoda besar pertama yang muncul pada Awal Jura. Ciri paling mencolok adalah dua jambul (crest) tipis di kepalanya yang kemungkinan digunakan untuk pamer (display) antar spesies, bukan senjata. Rahang atasnya memiliki celah khas (subnarial gap) yang membuat gigitannya tidak terlalu kuat, menunjukkan ia mungkin pemakan ikan atau bangkai selain pemburu hewan kecil. Catatan: Ia tidak memiliki jumbai leher atau racun seperti di film.",
              key: "Dilophosaurus dikenal dari dua jambul tipis di kepalanya yang digunakan untuk pamer, bukan bertarung. Ia tidak memiliki racun atau jumbai leher seperti di film.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "20 Tahun",
              weight: "400 kg",
              size: "7 m",
              discoveryYear: "1954",
              taxonomy: "Theropoda",
              stats: { completeness: 65, rarity: 70, value: 85 },
            },
          },
          {
            name: "ANKYLOSAURUS",
            modelPath: "/models/geologi/era_mesozoikum/dino_-_ankylosaurus.glb",
            image:
              "https://images.dinosaurpictures.org/Ankylosaurus/Ankylosaurus_775883a1.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus herbivora yang tubuhnya dilindungi baju zirah tulang anti peluru and memiliki gada berat di ujung ekornya untuk pertahanan.",
              full: "Ankylosaurus adalah tank hidup dari periode Kapur Akhir. Seluruh tubuh bagian atasnya tertutup osteoderm (lempeng tulang) yang menyatu with kulit, bahkan kelopak matanya pun bertulang. Ia memiliki tubuh lebar and rendah sehingga sulit dibalikkan oleh predator. Senjata utamanya adalah gada tulang padat di ujung ekor yang dapat diayunkan with kecepatan tinggi, cukup kuat untuk mematahkan kaki T-Rex.",
              key: "Ankylosaurus adalah dinosaurus bertameng paling kuat with tubuh dilapisi tulang keras. Gada di ekornya cukup kuat untuk mematahkan kaki predator besar.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "30 Tahun",
              weight: "8 Ton",
              size: "8 m",
              discoveryYear: "1908",
              taxonomy: "Ankylosauria",
              stats: { completeness: 80, rarity: 50, value: 85 },
            },
          },
          {
            name: "HERRERASAURUS",
            modelPath:
              "/models/geologi/era_mesozoikum/dinorauls_herrerasaurus.glb",
            image:
              "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiIyMDIxLTExL2hlcnJlcmFzYXVydXNfMjI2MDA0LnBuZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsiZml0IjoiY29udGFpbiJ9fX0=",
            period: "Mesozoikum (Trias)",
            status: "PUNAH",
            description: {
              short:
                "Salah satu dinosaurus paling awal yang pernah ditemukan, predator lincah berkaki dua yang hidup pada zaman Trias.",
              full: "Herrerasaurus ischigualastensis adalah salah satu dinosaurus primitif yang hidup di Argentina sekitar 230 juta tahun lalu (Trias Akhir). Ia memiliki campuran ciri-ciri dinosaurus modern and nenek moyang reptil archosauria, membuat klasifikasinya sempat membingungkan ilmuwan. Sebagai predator bipedal (berjalan dua kaki) yang cepat, ia memiliki rahang fleksibel yang bisa menahan mangsa yang meronta.",
              key: "Herrerasaurus adalah salah satu dinosaurus paling awal yang pernah hidup. Ia menunjukkan transisi penting dari reptil purba menuju dinosaurus sejati.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "15 Tahun",
              weight: "350 kg",
              size: "6 m",
              discoveryYear: "1963",
              taxonomy: "Herrerasauridae",
              stats: { completeness: 50, rarity: 80, value: 95 },
            },
          },
          {
            name: "ICHTHYOSAURUS",
            modelPath: "/models/geologi/era_mesozoikum/ichthyosaurus.glb",
            image:
              "https://www.harapanrakyat.com/wp-content/uploads/2022/03/Fosil-Reptil-Laut-Ichthyosaurus-Berusia-160-Tahun-Direknostruksi.jpg",
            period: "Mesozoikum (Jura)",
            status: "PUNAH",
            description: {
              short:
                "Reptil laut yang berevolusi memiliki bentuk tubuh menyerupai lumba-lumba modern, perenang cepat yang melahirkan anak di dalam air.",
              full: "Ichthyosaurus adalah contoh sempurna evolusi konvergen, di mana reptil purba mengembangkan bentuk tubuh 'streamline' yang sangat mirip with ikan atau lumba-lumba untuk berenang cepat di laut. Mereka memiliki sirip punggung, sirip ekor vertikal, and paru-paru untuk bernapas di permukaan. Mata mereka sangat besar, dilindungi cincin tulang sklerotik, untuk melihat mangsa (cumi-cumi and ikan) di kedalaman laut yang gelap.",
              key: "Ichthyosaurus berevolusi with bentuk tubuh mirip lumba-lumba untuk berenang cepat. Ia melahirkan anak di dalam air and tidak pernah naik ke darat.",
            },
            details: {
              diet: "Piscivora",
              lifespan: "25 Tahun",
              weight: "100 kg",
              size: "3 m",
              discoveryYear: "1821",
              taxonomy: "Ichthyosauria",
              stats: { completeness: 90, rarity: 40, value: 80 },
            },
          },
          {
            name: "QUETZALCOATLUS",
            modelPath:
              "/models/geologi/era_mesozoikum/jurassic_world_dominion_quetzalcoatlus.glb",
            image:
              "https://t3.ftcdn.net/jpg/16/05/05/46/360_F_1605054644_xdiTwD4wqv0SmPRmmJnenIj8xdYKhqEe.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Hewan terbang terbesar sepanjang sejarah bumi, reptil pterosaurus raksasa with tinggi setara jerapah saat berdiri di tanah.",
              full: "Quetzalcoatlus northropi adalah pterosaurus azhdarchid dari periode Kapur Akhir yang ukurannya menentang imajinasi. Dengan bentang sayap 10-11 meter and leher yang sangat panjang, ia menguasai langit Amerika Utara. Saat di darat, ia berjalan with empat kaki and berburu hewan kecil seperti dinosaurus bayi with mematuknya menggunakan paruh raksasa yang tajam, mirip perilaku bangau raksasa.",
              key: "Quetzalcoatlus adalah hewan terbang terbesar yang pernah ada. Saat berdiri, tingginya bisa setara jerapah meski mampu terbang jarak jauh.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "250 kg",
              size: "Sayap 11 m",
              discoveryYear: "1971",
              taxonomy: "Pterosauria",
              stats: { completeness: 40, rarity: 95, value: 100 },
            },
          },
          {
            name: "COELOPHYSIS",
            modelPath: "/models/geologi/era_mesozoikum/jwe2_coelophysis.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2018/11/Coelophysis-Images.jpg",
            period: "Mesozoikum (Trias)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus karnivora kecil, ramping, and lincah dari zaman Trias yang tulang-tulangnya berongga ringan, hidup and berburu secara berkelompok.",
              full: "Coelophysis bauri adalah salah satu dinosaurus theropoda awal yang paling sukses. Tubuhnya ramping, berleher panjang, and memiliki tulang berongga (seperti burung) yang membuatnya sangat ringan and cepat. Penemuan ratusan kerangka Coelophysis di Ghost Ranch, New Mexico, menunjukkan bahwa mereka kemungkinan besar hidup atau mati bersama dalam kawanan besar. Gigi tajamnya menunjukkan ia pemangsa serangga and reptil kecil.",
              key: "Coelophysis adalah salah satu dinosaurus karnivora paling awal and bertubuh ramping. Fosilnya sering ditemukan berkelompok, menunjukkan kemungkinan hidup berkoloni.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "15 Tahun",
              weight: "30 kg",
              size: "3 m",
              discoveryYear: "1889",
              taxonomy: "Theropoda",
              stats: { completeness: 85, rarity: 60, value: 75 },
            },
          },
          {
            name: "MOSASAURUS",
            modelPath: "/models/geologi/era_mesozoikum/mosasaurus.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2019/03/Mosasaurus.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Kadal laut raksasa penguasa lautan zaman Kapur, predator puncak with rahang kuat yang memangsa apa saja di laut.",
              full: "Mosasaurus bukanlah dinosaurus, melainkan kadal laut raksasa (kerabat biawak and ular) yang sepenuhnya beradaptasi di laut. Panjangnya mencapai 17 meter. Ia memiliki tubuh kekar, sirip dayung, and ekor kuat untuk berenang cepat. Rahangnya yang mengerikan memiliki sendi ganda yang memungkinkannya menelan mangsa besar, serta barisan gigi tambahan di langit-langit mulut (gigi pterygoid) untuk menahan mangsa agar tidak lolos.",
              key: "Mosasaurus adalah predator laut raksasa and bukan dinosaurus. Ia memiliki rahang tambahan di langit-langit mulut untuk menahan mangsa agar tidak lolos.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "50 Tahun",
              weight: "15 Ton",
              size: "18 m",
              discoveryYear: "1764",
              taxonomy: "Squamata",
              stats: { completeness: 70, rarity: 50, value: 85 },
            },
          },
          {
            name: "PARASAUROLOPHUS",
            modelPath:
              "/models/geologi/era_mesozoikum/parasaurolophus_walkeri.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2015/09/Parasaurolophus-Photos.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus pemakan tumbuhan with jambul tabung panjang di belakang kepala yang berfungsi seperti terompet untuk berkomunikasi.",
              full: "Parasaurolophus adalah dinosaurus hadrosaurida (berparuh bebek) yang ikonik. Jambul tabung di kepalanya bukan sekadar hiasan, melainkan rongga resonansi yang terhubung with saluran napas. Ilmuwan meyakini jambul ini digunakan untuk menghasilkan suara frekuensi rendah yang keras for komunikasi jarak jauh antar anggota kawanan atau peringatan bahaya. Ia berjalan with empat kaki tetapi bisa berlari with dua kaki.",
              key: "Parasaurolophus memiliki jambul panjang berongga yang digunakan untuk menghasilkan suara. Jambul ini kemungkinan berfungsi for komunikasi and penanda kelompok.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "40 Tahun",
              weight: "4 Ton",
              size: "10 m",
              discoveryYear: "1922",
              taxonomy: "Hadrosauridae",
              stats: { completeness: 80, rarity: 40, value: 75 },
            },
          },
          {
            name: "PTERANODON",
            modelPath: "/models/geologi/era_mesozoikum/pteranodon.glb",
            image:
              "https://cdn.mos.cms.futurecdn.net/6vA8wWskCkUgffN9dbQhvh-1200-80.jpg",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Reptil terbang terkenal yang memiliki paruh panjang tanpa gigi and jambul kepala menonjol, ahli meluncur di atas samudra purba.",
              full: "Pteranodon adalah pterosaurus besar yang sangat spesialis dalam terbang layang (soaring) di atas lautan, mirip burung albatros modern. Sayapnya yang panjang memungkinkannya terbang jarak jauh hemat energi. Jambul di kepalanya bervariasi bentuk and ukurannya tergantung jenis kelamin and usia, berfungsi sebagai display sosial atau kemudi aerodinamis. Ia menangkap ikan with paruh panjangnya saat terbang rendah di permukaan air.",
              key: "Pteranodon bukan dinosaurus, melainkan reptil terbang. Ia tidak memiliki gigi and menggunakan paruh panjangnya for menangkap ikan di laut.",
            },
            details: {
              diet: "Piscivora",
              lifespan: "30 Tahun",
              weight: "90 kg",
              size: "Sayap 7 m",
              discoveryYear: "1876",
              taxonomy: "Pterosauria",
              stats: { completeness: 60, rarity: 30, value: 80 },
            },
          },
          {
            name: "SPINOSAURUS",
            modelPath: "/models/geologi/era_mesozoikum/spinosaurus.glb",
            image:
              "https://www.superherotoystore.com/cdn/shop/articles/Blog_Banners_11_e325b223-a705-4062-a83a-66a2548fde70_1600x.jpg?v=1746545950",
            period: "Mesozoikum (Kapur)",
            status: "PUNAH",
            description: {
              short:
                "Karnivora terbesar di bumi yang beradaptasi for hidup di air and darat, memiliki layar punggung raksasa and moncong panjang pemakan ikan.",
              full: "Spinosaurus mengubah pandangan kita tentang dinosaurus theropoda. Ia adalah satu-satunya dinosaurus yang diketahui beradaptasi baik for gaya hidup semi-akuatik. Kaki belakangnya pendek, tulang-tulangnya padat for kontrol daya apung, and ekornya berbentuk seperti dayung for berenang. Moncongnya yang panjang and gigi kerucut sangat efisien for menangkap ikan purba raksasa seperti Onchopristis di sungai delta Afrika Utara.",
              key: "Spinosaurus adalah dinosaurus karnivora terbesar yang pernah ditemukan, bahkan lebih panjang dari T-Rex. Ia adalah dinosaurus semi-akuatik yang berburu ikan menggunakan rahang panjang mirip buaya.",
            },
            details: {
              diet: "Piscivora/Karnivora",
              lifespan: "30 Tahun",
              weight: "20 Ton",
              size: "15 m",
              discoveryYear: "1912",
              taxonomy: "Theropoda",
              stats: { completeness: 45, rarity: 85, value: 95 },
            },
          },
          {
            name: "STEGOSAURUS",
            modelPath: "/models/geologi/era_mesozoikum/stegosaurus_armatus.glb",
            image:
              "https://dinosaurlady.com/wp-content/uploads/2024/08/4802592-311672367.jpg?w=1200",
            period: "Mesozoikum (Jura)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus herbivora with barisan lempeng tulang di punggung and empat duri tajam di ekor, namun memiliki otak yang sangat kecil.",
              full: "Stegosaurus adalah dinosaurus yang mudah dikenali berkat barisan pelat (plates) berbentuk layang-layang di punggungnya and duri tajam (thagomizer) di ujung ekornya. Pelat ini kemungkinan berfungsi for pamer (display), identifikasi spesies, atau termoregulasi, bukan sebagai perisai pelindung. Duri ekornya adalah senjata pertahanan mematikan yang bisa diayunkan ke predator seperti Allosaurus. Uniknya, walau bertubuh besar, otaknya hanya sebesar buah kenari.",
              key: "Stegosaurus memiliki otak yang sangat kecil dibandingkan tubuhnya yang besar. Duri di punggungnya berfungsi sebagai pertahanan sekaligus membantu mengatur suhu tubuh.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "50 Tahun",
              weight: "7 Ton",
              size: "9 m",
              discoveryYear: "1877",
              taxonomy: "Stegosauria",
              stats: { completeness: 80, rarity: 40, value: 85 },
            },
          },
          {
            name: "T-REX",
            modelPath: "/models/geologi/era_mesozoikum/t-rex.glb",
            image:
              "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/6260/production/_126048152_gettyimages-1363838708.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Tyrannosaurus Rex, raja dinosaurus karnivora with gigitan terkuat di daratan, lengan kecil, and indra penciuman yang sangat tajam.",
              full: "T-Rex adalah predator puncak definitif di akhir zaman Kapur. Tubuhnya yang masif, kaki yang kuat, and tengkorak besar menjadikannya mesin pembunuh yang efisien. Gigitannya mampu menghasilkan tekanan ribuan kilogram, cukup for menghancurkan tulang mangsanya. Penelitian terbaru menunjukkan T-Rex memiliki penglihatan binokular yang lebih baik dari elang and indra penciuman yang luar biasa sensitif, menjadikannya pemburu aktif sekaligus pemakan bangkai yang oportunis.",
              key: "T-Rex memiliki gigitan terkuat di antara hewan darat yang pernah hidup. Indra penciumannya sangat tajam for mendeteksi mangsa dari jauh.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "14 Ton",
              size: "13 m",
              discoveryYear: "1902",
              taxonomy: "Theropoda",
              stats: { completeness: 65, rarity: 95, value: 100 },
            },
          },
          {
            name: "TRICERATOPS",
            modelPath: "/models/geologi/era_mesozoikum/triceratop.glb",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zUdVREIP4qVQLBkN257QoEFPhqPYVWk3Gw&s",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus berbadan badak with tiga tanduk wajah and tameng leher, herbivora tangguh yang berani berhadapan with T-Rex.",
              full: "Triceratops horridus adalah salah satu dinosaurus non-unggas terakhir yang berevolusi sebelum kepunahan massal. Tiga tanduknya (dua di dahi, satu di hidung) and jumbai lehernya yang solid (tanpa lubang) menjadikannya lawan yang sulit bagi predator manapun. Tidak seperti ceratopsid lain, jumbai Triceratops murni tulang tebal yang berfungsi sebagai perisai leher yang efektif dalam pertarungan. Mereka hidup di dataran banjir Amerika Utara purba.",
              key: "Triceratops memiliki tiga tanduk tajam and perisai tulang besar di lehernya. Ia hidup sezaman and mampu melawan predator seperti T-Rex..",
            },
            details: {
              diet: "Herbivora",
              lifespan: "50 Tahun",
              weight: "12 Ton",
              size: "9 m",
              discoveryYear: "1889",
              taxonomy: "Ceratopsia",
              stats: { completeness: 75, rarity: 40, value: 90 },
            },
          },
          {
            name: "VELOCIRAPTOR",
            modelPath: "/models/geologi/era_mesozoikum/velociraptor.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2015/08/Velociraptor.jpg",
            period: "Mesozoikum (Kapur Akhir)",
            status: "PUNAH",
            description: {
              short:
                "Dinosaurus pemangsa berukuran kecil, lincah, cerdas, and tertutup bulu, terkenal with cakar sabit besar di kakinya.",
              full: "Velociraptor mongoliensis aslinya jauh lebih kecil daripada yang digambarkan di film, hanya seukuran kalkun besar. Fosilnya membuktikan bahwa mereka memiliki 'quill knobs' (benjolan tempat melekatnya bulu) di lengan, menegaskan bahwa mereka berbulu lebat seperti burung. Mereka adalah predator gurun yang ganas, menggunakan cakar sabit di kaki kedua for menusuk mangsa seperti Protoceratops. Mereka mungkin berburu sendiri atau dalam kelompok kecil.",
              key: "Velociraptor sebenarnya kecil and berbulu, bukan raksasa seperti di film. Senjata utamanya adalah cakar melengkung di kaki, bukan gigitan.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "15 Tahun",
              weight: "15 kg",
              size: "2 m",
              discoveryYear: "1924",
              taxonomy: "Dromaeosauridae",
              stats: { completeness: 80, rarity: 60, value: 85 },
            },
          },
        ],
      },
      {
        title: "KENOZOIKUM",
        desc: "Era mamalia and manusia.",
        image: "/ImageModels/EraGeologi/foto-kenozoikum.jpg",
        items: [
          {
            name: "PARACERATHERIUM",
            modelPath:
              "/models/geologi/era_kenozoikum/dinorauls_paraceratherium.glb",
            image:
              "https://www.fossilguy.com/gallery/vert/mammal/land/paraceratherium/paraceratherium-statue-5820747273.jpg",
            period: "Kenozoikum (Oligosen)",
            status: "PUNAH",
            description: {
              short:
                "Mamalia darat terbesar yang pernah berjalan di bumi, kerabat badak raksasa tanpa cula with leher panjang pemakan daun tinggi.",
              full: "Paraceratherium (dulu dikenal sebagai Indricotherium) adalah raksasa sejati zaman Oligosen. Tingginya mencapai 4,8 meter di bahu and berat hingga 20 ton. Meskipun berkerabat with badak modern, ia tidak memiliki cula and memiliki leher serta kaki panjang, mengisi relung ekologi yang mirip jerapah for memakan dedaunan pohon tinggi. Ukurannya yang masif membuatnya hampir kebal terhadap serangan predator manapun di zamannya.",
              key: "Paraceratherium adalah hewan darat terbesar yang pernah hidup, bahkan lebih tinggi dari jerapah. Meski kerabat badak, hewan ini tidak memiliki tanduk.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "80 Tahun",
              weight: "20 Ton",
              size: "7.4 m",
              discoveryYear: "1911",
              taxonomy: "Mammalia",
              stats: { completeness: 50, rarity: 90, value: 95 },
            },
          },
          {
            name: "MAMMOTH",
            modelPath: "/models/geologi/era_kenozoikum/mammoth.glb",
            image:
              "https://awsimages.detik.net.id/community/media/visual/2022/03/19/replika-mammoth-berbulu.webp?w=1200",
            period: "Kenozoikum (Pleistosen)",
            status: "PUNAH",
            description: {
              short:
                "Gajah purba ikonik Zaman Es yang tubuhnya tertutup rambut tebal and memiliki gading melengkung besar, hidup berdampingan with manusia purba.",
              full: "Mammoth Berbulu (Mammuthus primigenius) adalah spesies gajah yang beradaptasi sempurna with iklim dingin Pleistosen. Tubuhnya dilindungi lapisan lemak tebal and dua lapisan rambut. Gadingnya yang sangat panjang and melengkung digunakan for menyingkirkan salju demi mencari rumput kering di bawahnya. Mereka hidup di padang rumput stepa raksasa yang membentang dari Eropa hingga Amerika Utara and sering menjadi buruan manusia purba.",
              key: "Mammoth memiliki bulu tebal and lapisan lemak for bertahan di Zaman Es. Menariknya, Mammoth terakhir masih hidup saat piramida Mesir sudah dibangun.",
            },
            details: {
              diet: "Herbivora",
              lifespan: "60 Tahun",
              weight: "8 Ton",
              size: "3.4 m",
              discoveryYear: "1799",
              taxonomy: "Mammalia",
              stats: { completeness: 85, rarity: 40, value: 95 },
            },
          },
          {
            name: "TERROR BIRD",
            modelPath:
              "/models/geologi/era_kenozoikum/phorusrhacos_longissimus_terror_bird.glb",
            image:
              "https://imgapps.okezone.com/dynamic/content/2023/04/17/56/2800114/mengenal-terror-bird-burung-predator-purba-yang-sempat-jadi-puncak-rantai-makanan-gzmizQFatb.jpg?w=350",
            period: "Kenozoikum (Miosen)",
            status: "PUNAH",
            description: {
              short:
                "Burung pemangsa raksasa yang tidak bisa terbang, predator puncak berkaki cepat with paruh besar mematikan yang menguasai Amerika Selatan.",
              full: "Phorusrhacidae, atau 'Burung Teror', adalah kelompok burung karnivora yang berevolusi menjadi predator puncak setelah dinosaurus punah, terutama di Amerika Selatan yang saat itu terisolasi. Phorusrhacos tingginya mencapai 2,5 meter and tidak bisa terbang, namun berlari sangat cepat. Paruhnya yang besar and melengkung seperti kapak digunakan for mematuk mangsa with gerakan vertikal yang kuat, menghancurkan tulang belakang korbannya.",
              key: "Terror Bird adalah burung raksasa yang tidak bisa terbang, tetapi sangat cepat berlari. ia menjadi predator darat paling ditakuti setelah dinosaurus punah.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "20 Tahun",
              weight: "130 kg",
              size: "2.5 m",
              discoveryYear: "1887",
              taxonomy: "Aves",
              stats: { completeness: 60, rarity: 70, value: 85 },
            },
          },
          {
            name: "SMILODON",
            modelPath: "/models/geologi/era_kenozoikum/smilodon.glb",
            image:
              "https://www.extinctanimals.org/wp-content/uploads/2018/09/Smilodon-Size.jpg",
            period: "Kenozoikum (Pleistosen)",
            status: "PUNAH",
            description: {
              short:
                "Kucing besar prasejarah yang terkenal with dua gigi taring atas yang sangat panjang seperti pedang, pemburu hewan besar di Zaman Es.",
              full: "Smilodon fatalis, atau macan gigi pedang, bukanlah leluhur harimau/singa modern, melainkan cabang terpisah dari keluarga kucing (Felidae). Tubuhnya kekar and berotot, dirancang for bergulat menjatuhkan mangsa besar seperti bison atau unta purba, bukan for mengejar jarak jauh. Sepasang taringnya yang ikonik digunakan for memberikan gigitan presisi yang mematikan pada leher mangsa yang sudah tak berdaya.",
              key: "Smilodon adalah predator Pleistosen paling terkenal yang fosilnya ribuan jumlahnya ditemukan di lubang aspal La Brea Tar Pits.",
            },
            details: {
              diet: "Karnivora",
              lifespan: "30 Tahun",
              weight: "280 kg",
              size: "2 m",
              discoveryYear: "1842",
              taxonomy: "Mammalia",
              stats: { completeness: 80, rarity: 50, value: 70 },
            },
          },
        ],
      },
    ],
  },
};
