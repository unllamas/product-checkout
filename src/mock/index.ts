export const COMPANY = {
  // show image 48x48
  image: 'https://pbs.twimg.com/profile_images/1869194441426083841/qxwTWYtj_400x400.jpg',
  name: 'Jona |🇦🇷',
  website: 'https://x.com/unllamas',
  lightningAddress: 'dios@lawallet.ar',
};

export const CHECKOUT = {
  success_url: 'https://www.jonallamas.com/',
  cancel_url: '',
  // '' or 'donate'
  submit_type: 'donate',
  // only 'en'
  locale: 'en',
};

export const PRODUCT = {
  // 4/3 aspect ratio
  image:
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3luN2UzMDZtcWdsaXhyeGk4ZmU1NTR2MXF5aGJxOTV4M2g1OW4xbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FdpN7wrCGqlrR24eHw/giphy.gif',
  name: 'My eternal love',
  description: 'Acquire the love of a Llama using the system!',
  price: 1001,
  // only 'SAT'
  currency: 'SAT',
  variants: [
    {
      id: '1',
      name: 'Basic',
      description: 'Esta es una descripcion',
      price: 1001,
      currency: 'SAT',
    },
    {
      id: '2',
      name: 'Advanced',
      description: 'Esta es una descripcion',
      price: 10021,
      currency: 'SAT',
    },
  ],
};
