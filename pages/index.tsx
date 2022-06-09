import type { NextPage } from 'next';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    await sleep(7000);
    // await new Promise((s) => setTimeout(s, 3000));
    return res.json();
  });

const Home: NextPage = () => {
  const { data, error } = useSWR('https://api.github.com/repos/vercel/swr', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{data.name}</h1>
        <p className={styles.description}>{data.description}</p>
        <p>
          <strong>👁 {data.subscribers_count}</strong>
          <strong>✨ {data.stargazers_count}</strong>
          <strong>🍴 {data.forks_count}</strong>
        </p>
      </main>
    </div>
  );
};

export default Home;
