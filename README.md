# Product Checkout

An open source payment system built with Next and focused on Bitcoin.

[![llamout](./public/images/screenshot.png)]()


## Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Database: [Instantdb](https://www.instantdb.com/)
- Payments: [Lightning Network](https://lightning.network/)
- UI Library: [Shadcn/ui](https://ui.shadcn.com/)

## Roadmap

### Core Features

- [x] Database on Instantdb
- [x] Lightning Payments via LUD-16
- [x] Tiny `/dashboard`

### Soon
- [ ] Email sending system with [React Email](https://react.email/) and [Resend](https://resend.com/)
- [ ] Validation with Zod
- [ ] Customize Checkout
- [ ] Onboarding Process
- [ ] Authentication with Instantdb or Nostr
- [ ] Roles System


## Running Locally

1. Clone the repository
``` bash
git clone ...
```

2. Install dependencies using pnpm
``` bash
pnpm install
```

3. Copy the `.env.example` to `.env` and update the variables.
``` bash
cp .env.example .env
```

4. Start the development server
``` bash
pnpm run dev
```
