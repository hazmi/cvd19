/* eslint-disable quotes */
const defaultList = [
  {
    label: 'Indonesia',
    keyword: 'Indonesia',
    type: 'country',
    link: '/indonesia'
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
    link: '/provinsi/aceh'
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
    link: '/provinsi/sumatera-utara'
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
    link: '/provinsi/sumatera-barat'
  },
  {
    label: 'Indonesia, Riau',
    keyword: ['Dumai', 'Pekanbaru', 'Siak', 'Indragiri'].join(' '),
    type: 'province',
    link: '/provinsi/riau'
  },
  {
    label: 'Indonesia, Jambi',
    keyword: ['Jambi', 'Batanghari'],
    type: 'province',
    link: '/provinsi/jambi'
  },
  {
    label: 'Indonesia, Sumatera Selatan',
    keyword: ['Palembang', 'Prabumulih', 'Pagar Alam', 'Ogan', 'Lahat'].join(
      ' '
    ),
    type: 'province',
    link: '/provinsi/sumatera-selatan'
  },
  {
    label: 'Indonesia, Bengkulu',
    keyword: ['Seluma'].join(' '),
    type: 'province',
    link: '/provinsi/bengkulu'
  },
  {
    label: 'Indonesia, Kep. Bangka Belitung',
    keyword: [''].join(' '),
    type: 'province',
    link: '/provinsi/kepulauan-bangka-belitung'
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
    link: '/provinsi/lampung'
  },
  {
    label: 'Indonesia, Kep. Riau',
    keyword: ['Batam', 'Tanjungpinang', 'Natuna', 'Bintan'].join(' '),
    type: 'province',
    link: '/provinsi/kepulauan-riau'
  },
  {
    label: 'Indonesia, DKI Jakarta',
    display: 'Jakarta',
    keyword: ['Jakarta'].join(' '),
    type: 'province',
    link: '/provinsi/dki-jakarta'
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
    link: '/provinsi/jawa-barat'
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
    link: '/provinsi/jawa-tengah'
  },
  {
    label: 'Indonesia, Yogyakarta,',
    display: 'Yogyakarta',
    keyword: ['Jogjakarta', 'Sleman', 'Wates', 'Bantul', 'Wonosari'].join(' '),
    type: 'province',
    link: '/provinsi/daerah-istimewa-yogyakarta'
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
    link: '/provinsi/jawa-timur'
  },
  {
    label: 'Indonesia, Banten',
    keyword: ['Serang', 'Tangerang', 'Cilegon', 'Lebak'].join(' '),
    type: 'province',
    link: '/provinsi/banten'
  },
  {
    label: 'Indonesia, Bali',
    keyword: ['Badung', 'Denpasar', 'Jembrana', 'Ubud', 'Seminyak'].join(' '),
    type: 'province',
    link: '/provinsi/bali'
  },
  {
    label: 'Indonesia, Nusa Tenggara Barat',
    keyword: ['Bima', 'Mataram', 'Dompu', 'Lombok'].join(' '),
    type: 'province',
    link: '/provinsi/nusa-tenggara-barat'
  },
  {
    label: 'Indonesia, Nusa Tenggara Timur',
    keyword: ['Kupang', 'Sumba', 'Sikka', 'Alor', 'Timor'].join(' '),
    type: 'province',
    link: '/provinsi/nusa-tenggara-timur'
  },
  {
    label: 'Indonesia, Kalimantan Tengah',
    keyword: ['Palangkaraya', 'Barito', 'Kapuas'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-tengah'
  },
  {
    label: 'Indonesia, Kalimantan Barat',
    keyword: ['Pontianak', 'Singkawang', 'Sambas', 'Bengkayang'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-barat'
  },
  {
    label: 'Indonesia, Kalimantan Selatan',
    keyword: ['Banjarmasin', 'Banjarbaru', 'Balangan', 'Barito'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-selatan'
  },
  {
    label: 'Indonesia, Kalimantan Timur',
    keyword: ['Balikpapan', 'Samarinda', 'Tarakan', 'Nunukan', 'Kutai'].join(
      ' '
    ),
    type: 'province',
    link: '/provinsi/kalimantan-timur'
  },
  {
    label: 'Indonesia, Kalimantan Utara',
    keyword: ['Tarakan', 'Bulungan', 'Tanjung Selor'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-utara'
  },
  {
    label: 'Indonesia, Sulawesi Utara',
    keyword: ['Manado', 'Bitung', 'Talaud', 'Minahasa', 'Sangihe'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-utara'
  },
  {
    label: 'Indonesia, Sulawesi Tengah',
    keyword: ['Palu', 'Banggai', 'Sigi', 'Banggai', 'Toli'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-tengah'
  },
  {
    label: 'Sulawesi Selatan, Indonesia',
    keyword: ['Makassar', 'Makasar', 'Palopo', 'Pare', 'Bone'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-selatan'
  },
  {
    label: 'Indonesia, Sulawesi Tenggara',
    keyword: ['Kendari', 'Bau', 'Wakatobi', 'Konawe'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-tenggara'
  },
  {
    label: 'Indonesia, Sulawesi Barat',
    keyword: ['Mamuju', 'Mamasa', 'Majene'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-barat'
  },
  {
    label: 'Indonesia, Gorontalo',
    keyword: ['Boalemo', 'Bone'].join(' '),
    type: 'province',
    link: '/provinsi/gorontalo'
  },
  {
    label: 'Indonesia, Maluku',
    keyword: ['Ambon', 'Tual', 'Seram'].join(' '),
    type: 'province',
    link: '/provinsi/maluku'
  },
  {
    label: 'Indonesia, Maluku Utara',
    keyword: ['Ternate', 'Tidore', 'Halmahera'].join(' '),
    type: 'province',
    link: '/provinsi/maluku-utara'
  },
  {
    label: 'Indonesia, Papua',
    keyword: ['Jayapura', 'Merauke', 'Asmat', 'Timika', 'Jayawijaya'].join(' '),
    type: 'province',
    link: '/provinsi/papua'
  },
  {
    label: 'Indonesia, Papua Barat',
    keyword: ['Sorong', 'Fakfak', 'Sorong', 'Raja Ampat', 'Manokwari'].join(
      ' '
    ),
    type: 'province',
    link: '/provinsi/papua-barat'
  },
  {
    label: 'US',
    display: 'United States',
    keyword: ['US', 'United States', 'America', 'Amerika', 'Amrik'].join(' '),
    type: 'country',
    link: '/country/us'
  },
  {
    label: 'United Kingdom',
    keyword: ['United Kingdom', 'inggris'].join(' '),
    type: 'country',
    link: '/country/united-kingdom'
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
  'Belgium',
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
  'China',
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
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
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
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
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
  'Spain',
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
  'Turkey',
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
    link: '/country/' + createSlug(countryName)
  });
});

exports.default = defaultList;
module.exports = exports.default;
