This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The homepage/landing page is on page.tsx  

## Styling 

We are using [tailwind css](https://tailwindcss.com/) for css formatting. So all styles are attached via class names to html/react elements 

## Creating Pages

To create a new page, add a new folder directly under the app directory, which corresponds to the url you would like that page to live at, and then create a file under it called page.tsx, and import any components you would like into that file. The page will then be available at that specified url. For instance, in the http://localhost:3000/dashboard page, the page is populated by the code in app/dashboard/page.tsx, and has the word dashboard in the url because we named our directory dashboard.

## Creating Components

For page specific components, we will create a folder under each page called components, and put our components inside of that. For sitewide components, we can put those in a folder called components that lives directly inside the app folder, and import them into the various pages as needed. 

## Creating Unit Tests

We are using [jest](https://jestjs.io/docs/getting-started) for unit testing. After you've written your tests, just run 

```bash
npm test
```

And your tests will be run!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
