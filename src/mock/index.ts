export const STORE = {
  id: 'company-1',
  // image: show image 48x48
  image: 'images/logo.png',
  name: 'La Crypta |🇦🇷',
  website: 'https://x.com/lacryptaok',
  lnaddress: process.env.NEXT_LN_ADDRESS,
};

export const CHECKOUT = {
  success_url: '',
  cancel_url: '',
  // submit_type: '' | 'donate'
  submit_type: 'donate',
  // locale: only 'en'
  locale: 'en',
};

export const PRODUCT = {
  id: 'Cowork ticket',
  // image: 4/3 aspect ratio
  image:
    'images/banner2.jpeg',
  name: `MARTES DE COWORKING 🌯`,
  description: '¡Reserva tu silla junto a los bitcoiners mas picantes del país!',
  price: 500,
  // currency: only 'SAT'
  currency: 'SAT',
  variants: null,
};
