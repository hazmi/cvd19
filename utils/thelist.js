/* eslint-disable quotes */
const defaultList = [
  {
    label: 'Indonesia',
    keyword: 'Indonesia',
    type: 'country',
    link: '/negara/indonesia/',
    priority: 1,
    position: [-6.21462, 106.84513]
  },
  {
    label: 'Indonesia, Aceh',
    keyword: [
      'Langsa',
      'Lhokseumawe',
      'Sabang',
      'Subulussalam',
      'Bireuen',
      'Pidie Jaya',
      'Simeulue'
    ].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/aceh/',
    population: 4494410,
    position: [4.695135, 96.749397]
  },
  {
    label: 'Indonesia, Sumatera Utara',
    keyword: [
      'Batubara',
      'Gunungsitoli',
      'Binjai',
      'Karo',
      'Medan',
      'Sibolga',
      'Pematangsiantar'
    ].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sumatera-utara/',
    population: 1298220,
    position: [3.597031, 98.678513]
  },
  {
    label: 'Indonesia, Sumatera Barat',
    keyword: [
      'Padang',
      'Bukittinggi',
      'Pariaman',
      'Payakumbuh',
      ' Sawahlunto',
      'Solok'
    ].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sumatera-barat/',
    population: 4846909,
    position: [-0.94924, 100.35427]
  },
  {
    label: 'Indonesia, Riau',
    keyword: ['Dumai', 'Pekanbaru', 'Siak', 'Indragiri'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/riau/',
    population: 5538367,
    position: [0.53333, 101.45]
  },
  {
    label: 'Indonesia, Jambi',
    keyword: ['Jambi', 'Batanghari'],
    type: 'province',
    priority: 0.3,
    link: '/provinsi/jambi/',
    population: 3092265,
    position: [-1.6, 103.61667]
  },
  {
    label: 'Indonesia, Sumatera Selatan',
    keyword: ['Palembang', 'Prabumulih', 'Pagar Alam', 'Ogan', 'Lahat'].join(
      ' '
    ),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sumatera-selatan/',
    population: 7450394,
    position: [-2.91673, 104.7458]
  },
  {
    label: 'Indonesia, Bengkulu',
    keyword: ['Seluma'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/bengkulu/',
    population: 1715518,
    position: [-3.80044, 102.26554]
  },
  {
    label: 'Indonesia, Kep. Bangka Belitung',
    keyword: [''].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kepulauan-bangka-belitung/',
    population: 1223296,
    position: [-2.131627, 106.11693]
  },
  {
    label: 'Indonesia, Lampung',
    keyword: [
      'Bandar Lampung',
      'Metro',
      'Pringsewu',
      'Way Kanan',
      'Mesuji'
    ].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/lampung/',
    population: 7608405,
    position: [-5.45, 105.26667]
  },
  {
    label: 'Indonesia, Kep. Riau',
    keyword: ['Batam', 'Tanjungpinang', 'Natuna', 'Bintan'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kepulauan-riau/',
    population: 1679163,
    position: [0.91667, 104.45]
  },
  {
    label: 'Indonesia, DKI Jakarta',
    display: 'Jakarta',
    keyword: ['Jakarta'].join(' '),
    type: 'province',
    priority: 0.9,
    link: '/provinsi/dki-jakarta/',
    population: 9607787,
    position: [-6.21462, 106.84513]
  },
  {
    label: 'Indonesia, Jawa Barat',
    keyword: [
      'Bogor',
      'Bandung',
      'Bekasi',
      'Ciamis',
      'Depok',
      'Sukabumi',
      'Tasikmalaya',
      'Cirebon',
      'Garut',
      'Subang',
      'Karawang'
    ].join(' '),
    type: 'province',
    priority: 0.9,
    link: '/provinsi/jawa-barat/',
    population: 43053732,
    position: [-6.90389, 107.61861]
  },
  {
    label: 'Indonesia, Jawa Tengah',
    keyword: [
      'Tegal',
      'Magelang',
      'Semarang',
      'Salatiga',
      'Surakarta',
      'Pekalongan',
      'Kudus',
      'Kebumen',
      'Kendal',
      'Batang',
      'Klaten'
    ].join(' '),
    type: 'province',
    priority: 0.8,
    link: '/provinsi/jawa-tengah/',
    population: 32382657,
    position: [-6.9932, 110.4203]
  },
  {
    label: 'Indonesia, Yogyakarta,',
    display: 'Yogyakarta',
    keyword: ['Jogjakarta', 'Sleman', 'Wates', 'Bantul', 'Wonosari'].join(' '),
    type: 'province',
    priority: 0.8,
    link: '/provinsi/daerah-istimewa-yogyakarta/',
    population: 3457491,
    position: [-7.78278, 110.36083]
  },
  {
    label: 'Indonesia, Jawa Timur',
    keyword: [
      'Surabaya',
      'Malang',
      'Blitar',
      'Batu',
      'Pasuruan',
      'Banyuwangi',
      'Sumenep'
    ].join(' '),
    type: 'province',
    priority: 0.8,
    link: '/provinsi/jawa-timur/',
    population: 37476757,
    position: [-7.24917, 112.75083]
  },
  {
    label: 'Indonesia, Banten',
    keyword: ['Serang', 'Tangerang', 'Cilegon', 'Lebak'].join(' '),
    type: 'province',
    link: '/provinsi/banten/',
    priority: 0.8,
    population: 10632166,
    position: [-6.17806, 106.63]
  },
  {
    label: 'Indonesia, Bali',
    keyword: ['Badung', 'Denpasar', 'Jembrana', 'Ubud', 'Seminyak'].join(' '),
    type: 'province',
    link: '/provinsi/bali/',
    population: 3890757,
    position: [-8.65, 115.21667]
  },
  {
    label: 'Indonesia, Nusa Tenggara Barat',
    keyword: ['Bima', 'Mataram', 'Dompu', 'Lombok'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/nusa-tenggara-barat/',
    population: 4500212,
    position: [-8.58333, 116.11667]
  },
  {
    label: 'Indonesia, Nusa Tenggara Timur',
    keyword: ['Kupang', 'Sumba', 'Sikka', 'Alor', 'Timor'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/nusa-tenggara-timur/',
    population: 4683827,
    position: [-10.1718, 123.6075]
  },
  {
    label: 'Indonesia, Kalimantan Tengah',
    keyword: ['Palangkaraya', 'Barito', 'Kapuas'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kalimantan-tengah/',
    population: 2212089,
    position: [-2.2136, 113.9108]
  },
  {
    label: 'Indonesia, Kalimantan Barat',
    keyword: ['Pontianak', 'Singkawang', 'Sambas', 'Bengkayang'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kalimantan-barat/',
    population: 4395983,
    position: [-0.03109, 109.32199]
  },
  {
    label: 'Indonesia, Kalimantan Selatan',
    keyword: ['Banjarmasin', 'Banjarbaru', 'Balangan', 'Barito'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kalimantan-selatan/',
    population: 3626616,
    position: [-3.31987, 114.59075]
  },
  {
    label: 'Indonesia, Kalimantan Timur',
    keyword: ['Balikpapan', 'Samarinda', 'Tarakan', 'Nunukan', 'Kutai'].join(
      ' '
    ),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/kalimantan-timur/',
    population: 3553143,
    position: [-1.24204, 116.89419]
  },
  {
    label: 'Indonesia, Kalimantan Utara',
    keyword: ['Tarakan', 'Bulungan', 'Tanjung Selor'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-utara/',
    population: 738163,
    position: [2.85, 117.383333]
  },
  {
    label: 'Indonesia, Sulawesi Utara',
    keyword: ['Manado', 'Bitung', 'Talaud', 'Minahasa', 'Sangihe'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sulawesi-utara/',
    population: 2270596,
    position: [1.25, 124.833333]
  },
  {
    label: 'Indonesia, Sulawesi Tengah',
    keyword: ['Palu', 'Banggai', 'Sigi', 'Banggai', 'Toli'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sulawesi-tengah/',
    population: 2635009,
    position: [-0.895, 119.859444]
  },
  {
    label: 'Sulawesi Selatan, Indonesia',
    keyword: ['Makassar', 'Makasar', 'Palopo', 'Pare', 'Bone'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-selatan/',
    population: 8034776,
    position: [-5.133333, 119.416667]
  },
  {
    label: 'Indonesia, Sulawesi Tenggara',
    keyword: ['Kendari', 'Bau', 'Wakatobi', 'Konawe'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sulawesi-tenggara/',
    population: 2232586,
    position: [-3.967489, 122.5947]
  },
  {
    label: 'Indonesia, Sulawesi Barat',
    keyword: ['Mamuju', 'Mamasa', 'Majene'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/sulawesi-barat/',
    population: 1158651,
    position: [-2.668611, 118.862222]
  },
  {
    label: 'Indonesia, Gorontalo',
    keyword: ['Boalemo', 'Bone'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/gorontalo/',
    population: 1040164,
    position: [0.666667, 123]
  },
  {
    label: 'Indonesia, Maluku',
    keyword: ['Ambon', 'Tual', 'Seram'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/maluku/',
    population: 1533506,
    position: [-3.705, 128.17]
  },
  {
    label: 'Indonesia, Maluku Utara',
    keyword: ['Ternate', 'Tidore', 'Halmahera'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/maluku-utara/',
    population: 1038087,
    position: [0.383333, 127.366667]
  },
  {
    label: 'Indonesia, Papua',
    keyword: ['Jayapura', 'Merauke', 'Asmat', 'Timika', 'Jayawijaya'].join(' '),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/papua/',
    population: 2833381,
    position: [-2.533, 140.317]
  },
  {
    label: 'Indonesia, Papua Barat',
    keyword: ['Sorong', 'Fakfak', 'Sorong', 'Raja Ampat', 'Manokwari'].join(
      ' '
    ),
    type: 'province',
    priority: 0.3,
    link: '/provinsi/papua-barat/',
    population: 760422,
    position: [-0.866667, 131.25]
  },
  {
    label: 'US',
    display: 'United States',
    keyword: ['US', 'United States', 'America', 'Amerika', 'Amrik'].join(' '),
    type: 'country',
    priority: 0.9,
    link: '/negara/us/'
  },
  {
    label: 'Spain',
    keyword: ['spain', 'spanyol'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/spain/'
  },
  {
    label: 'Italy',
    keyword: ['italy', 'italy'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/italy/'
  },
  {
    label: 'France',
    keyword: ['france', 'perancis', 'prancis'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/france/'
  },
  {
    label: 'Germany',
    keyword: ['germany'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/germany/'
  },
  {
    label: 'United Kingdom',
    keyword: ['United Kingdom', 'inggris'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/united-kingdom/'
  },
  {
    label: 'China',
    keyword: ['china', 'cina'].join(' '),
    type: 'country',
    priority: 0.9,
    link: '/negara/china/'
  },
  {
    label: 'Iran',
    keyword: ['iran'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/iran/'
  },
  {
    label: 'Turkey',
    keyword: ['turkey', 'turki'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/turkey/'
  },
  {
    label: 'Belgium',
    keyword: ['belgium', 'belgia'].join(' '),
    type: 'country',
    priority: 0.8,
    link: '/negara/belgium/'
  }
];

const otherCountries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'Colombia',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Diamond Princess',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'Gabon',
  'Gambia',
  'Georgia',
  'Ghana',
  'Grenada',
  'Greece',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Iraq',
  'Ireland',
  'Israel',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Korea, South',
  'Kuwait',
  'Kyrgyzstan',
  'Latvia',
  'Lebanon',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'San Marino',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan*',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Trinidad and Tobago',
  'Tunisia',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Zambia',
  'Zimbabwe',
  'West Bank and Gaza',
  'Laos',
  'Kosovo',
  'Burma',
  'MS Zaandam',
  'Botswana',
  'Burundi',
  'Sierra Leone',
  'Malawi',
  'South Sudan',
  'Western Sahara',
  'Sao Tome and Principe'
];

const createSlug = function(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
  return str;
};

// eslint-disable-next-line arrow-parens
otherCountries.map(countryName => {
  defaultList.push({
    label: countryName,
    keyword: countryName,
    type: 'country',
    priority: 0.2,
    link: '/negara/' + createSlug(countryName) + '/'
  });
});

exports.default = defaultList;
module.exports = exports.default;
