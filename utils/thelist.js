/* eslint-disable quotes */
const defaultList = [
  {
    label: 'Indonesia',
    keyword: 'Indonesia',
    type: 'country',
    link: '/indonesia'
  },
  {
    label: 'Aceh, Indonesia',
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
    label: 'Sumatera Utara, Indonesia',
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
    label: 'Sumatera Barat, Indonesia',
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
    label: 'Riau, Indonesia',
    keyword: ['Dumai', 'Pekanbaru', 'Siak', 'Indragiri'].join(' '),
    type: 'province',
    link: '/provinsi/riau'
  },
  {
    label: 'Jambi, Indonesia',
    keyword: ['Jambi', 'Batanghari'],
    type: 'province',
    link: '/provinsi/jambi'
  },
  {
    label: 'Sumatera Selatan, Indonesia',
    keyword: ['Palembang', 'Prabumulih', 'Pagar Alam', 'Ogan', 'Lahat'].join(
      ' '
    ),
    type: 'province',
    link: '/provinsi/sumatera-selatan'
  },
  {
    label: 'Bengkulu, Indonesia',
    keyword: ['Seluma'].join(' '),
    type: 'province',
    link: '/provinsi/bengkulu'
  },
  {
    label: 'Kepulauan Bangka Belitung, Indonesia',
    keyword: [''].join(' '),
    type: 'province',
    link: '/provinsi/kepulauan-bangka-belitung'
  },
  {
    label: 'Lampung, Indonesia',
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
    label: 'Kepulauan Riau, Indonesia',
    keyword: ['Batam', 'Tanjungpinang', 'Natuna', 'Bintan'].join(' '),
    type: 'province',
    link: '/provinsi/kepulauan-riau'
  },
  {
    label: 'DKI Jakarta, Indonesia',
    keyword: ['Jakarta'].join(' '),
    type: 'province',
    link: '/provinsi/dki-jakarta'
  },
  {
    label: 'Jawa Barat, Indonesia',
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
    label: 'Jawa Tengah, Indonesia',
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
    label: 'Daerah Istimewa Yogyakarta, Indonesia',
    keyword: ['Jogjakarta', 'Sleman', 'Wates', 'Bantul', 'Wonosari'].join(' '),
    type: 'province',
    link: '/provinsi/daerah-istimewa-yogyakarta'
  },
  {
    label: 'Jawa Timur, Indonesia',
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
    label: 'Banten, Indonesia',
    keyword: ['Serang', 'Tangerang', 'Cilegon', 'Lebak'].join(' '),
    type: 'province',
    link: '/provinsi/banten'
  },
  {
    label: 'Bali, Indonesia',
    keyword: ['Badung', 'Denpasar', 'Jembrana', 'Ubud', 'Seminyak'].join(' '),
    type: 'province',
    link: '/provinsi/bali'
  },
  {
    label: 'Nusa Tenggara Barat, Indonesia',
    keyword: ['Bima', 'Mataram', 'Dompu', 'Lombok'].join(' '),
    type: 'province',
    link: '/provinsi/nusa-tenggara-barat'
  },
  {
    label: 'Nusa Tenggara Timur, Indonesia',
    keyword: ['Kupang', 'Sumba', 'Sikka', 'Alor', 'Timor'].join(' '),
    type: 'province',
    link: '/provinsi/nusa-tenggara-timur'
  },
  {
    label: 'Kalimantan Tengah, Indonesia',
    keyword: ['Palangkaraya', 'Barito', 'Kapuas'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-tengah'
  },
  {
    label: 'Kalimantan Barat, Indonesia',
    keyword: ['Pontianak', 'Singkawang', 'Sambas', 'Bengkayang'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-barat'
  },
  {
    label: 'Kalimantan Selatan, Indonesia',
    keyword: ['Banjarmasin', 'Banjarbaru', 'Balangan', 'Barito'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-selatan'
  },
  {
    label: 'Kalimantan Timur, Indonesia',
    keyword: ['Balikpapan', 'Samarinda', 'Tarakan', 'Nunukan', 'Kutai'].join(
      ' '
    ),
    type: 'province',
    link: '/provinsi/kalimantan-timur'
  },
  {
    label: 'Kalimantan Utara, Indonesia',
    keyword: ['Tarakan', 'Bulungan', 'Tanjung Selor'].join(' '),
    type: 'province',
    link: '/provinsi/kalimantan-utara'
  },
  {
    label: 'Sulawesi Utara, Indonesia',
    keyword: ['Manado', 'Bitung', 'Talaud', 'Minahasa', 'Sangihe'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-utara'
  },
  {
    label: 'Sulawesi Tengah, Indonesia',
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
    label: 'Sulawesi Tenggara, Indonesia',
    keyword: ['Kendari', 'Bau', 'Wakatobi', 'Konawe'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-tenggara'
  },
  {
    label: 'Sulawesi Barat, Indonesia',
    keyword: ['Mamuju', 'Mamasa', 'Majene'].join(' '),
    type: 'province',
    link: '/provinsi/sulawesi-barat'
  },
  {
    label: 'Gorontalo, Indonesia',
    keyword: ['Boalemo', 'Bone'].join(' '),
    type: 'province',
    link: '/provinsi/gorontalo'
  },
  {
    label: 'Maluku, Indonesia',
    keyword: ['Ambon', 'Tual', 'Seram'].join(' '),
    type: 'province',
    link: '/provinsi/maluku'
  },
  {
    label: 'Maluku Utara, Indonesia',
    keyword: ['Ternate', 'Tidore', 'Halmahera'].join(' '),
    type: 'province',
    link: '/provinsi/maluku-utara'
  },
  {
    label: 'Papua, Indonesia',
    keyword: ['Jayapura', 'Merauke', 'Asmat', 'Timika', 'Jayawijaya'].join(' '),
    type: 'province',
    link: '/provinsi/papua'
  },
  {
    label: 'Papua Barat, Indonesia',
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
