This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the node modules

```bash
npm install 
# or
yarn add
```

Run dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Run test cases

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.



## Deployed on Vercel

[https://binoloop-desktop-app.vercel.app/]


## Learn More

Component structure

Divided Dashbord in to different small component to maintain readability.

**Drawer** >> Left side drawer menu.

**Header** >> Which contains project selection, Dashboard/submission Tab bar/ userInfo.

**Submissionstat** >> Which contain stats.

**Dashboard** >> Contains table and filter tabs( All, Top 20 etc).

Main index entry point file >> **Pages/ index.tsx**.

Api >> **Pages/Api/SubmissionData.ts**.

Also Added test cases for each react component.

**Global.css** >> Added custom font (Santoshi Variable).

Cutom hook to get screen size >> **hooks folder**.

All type declaration are under **Model** folder

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


