// Site-wide configuration. Change SITE_URL and the contact block once, everything follows.
export const site = {
  url: process.env.SITE_URL || 'https://raymarkhat.com', // 构建时可用 SITE_URL 覆盖
  name: 'Raymark Caps',
  brand: 'RAYMARK',
  legalName: 'Heze Raymark International Trade Co., Ltd',
  tagline: 'Custom & pro-team baseball caps, factory-direct.',
  description:
    'Factory-direct custom baseball caps and pro-team colorway caps from Heze, Shandong. MOQ 50 pcs, 12-color embroidery, 12–18 day bulk lead time, DDP shipping to the U.S.',
  founded: '2014',
  city: 'Heze',
  region: 'Shandong',
  country: 'CN',
  countryName: 'China',
  phoneDisplay: '+86 159 5435 8307',
  phoneWhatsApp: '8615954358307',
  email: 'info@raymarkhat.com',
  hours: 'Mon–Sat, 09:00–21:00 China Standard Time (UTC+8)',
  hoursShort: 'Replies within 12 hours, 7 days a week',
  // 搜索引擎验证码：填进这里，构建时自动输出 meta 标签
  verification: {
    google: process.env.GSC_TOKEN || '',
    bing: process.env.BING_TOKEN || '',
  },
  moq: 50,
  leadTime: '12–18 days',
  urlPath: {
    home: '/',
    shop: '/shop/',
    custom: '/custom-baseball-caps/',
    team: '/team-caps/',
    pedia: '/pedia/',
    contact: '/contact/',
    cart: '/cart/',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop/' },
  { label: 'Pedia', href: '/pedia/' },
  { label: 'Contact', href: '/contact/' },
];

export const money = (n) => {
  const v = Math.round(n * 20) / 20;
  return v.toFixed(2);
};
