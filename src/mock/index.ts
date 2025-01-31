export const STORE = {
  id: 'company-1',
  // image: show image 48x48
  image: 'https://pbs.twimg.com/profile_images/1869194441426083841/qxwTWYtj_400x400.jpg',
  name: 'Jona |🇦🇷',
  website: 'https://x.com/unllamas',
  lnaddress: 'dios@lawallet.ar',
};

export const CHECKOUT = {
  success_url: 'https://www.jonallamas.com/',
  cancel_url: '',
  // submit_type: '' | 'donate'
  submit_type: 'donate',
  // locale: only 'en'
  locale: 'en',
};

export const PRODUCT = {
  id: 'product-1',
  // image: 4/3 aspect ratio
  image:
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3luN2UzMDZtcWdsaXhyeGk4ZmU1NTR2MXF5aGJxOTV4M2g1OW4xbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FdpN7wrCGqlrR24eHw/giphy.gif',
  name: 'My eternal love',
  description: 'Acquire the love of a Llama using the system!',
  price: 1001,
  // currency: only 'SAT'
  currency: 'SAT',
  variants: [
    {
      id: '1',
      name: 'Coffee ☕️',
      description: 'This gift will accompany me in the mornings.',
      price: 1001,
      currency: 'SAT',
    },
    {
      id: '2',
      name: 'Beer 🍺',
      description: 'Shall we cut the week short? I could use a break.',
      price: 4800,
      currency: 'SAT',
    },
  ],
};
