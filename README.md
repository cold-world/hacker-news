Hacker-news.
=======================================

React, Remix, Typescript.

Main goal -> create fullstack app.
* * *

Features ->

1. Get stories and comments from API.
2. Revalidation data every 1 minute or manually by click on a button.

* * *
### [Demo](https://hacker-news-kappa-seven.vercel.app/)

![Alt Text](https://ibb.co/4gn1r3t)

* * *



### A piece of code

```
export const loader = async () => {
  return json<LoaderData>({
    data: await getNewStories(),
  });
};

export default function Index() {
  const revalidator = useRevalidator();

  const handleRevalidate = () => {
    revalidator.revalidate();
  };

  const { data } = useLoaderData() as LoaderData;

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRevalidate();
    }, REVALIDATE_TIME);

    return () => clearInterval(intervalId);
  }, []);
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/hacker-news.git
cd <project-dir>
npm install
npm run dev
```
