import { useRouter } from "next/router";

import { API_URL } from '@/config/index';

import Layout from '@/components/layout';

export default function EventPage({ event: { name } }) {
  const { query: { slug } } = useRouter();

  return (
    <Layout>
      <h1>{name}</h1>
    </Layout>
  )
}

export async function getStaticPaths() {
  const resp = await fetch(`${API_URL}/api/events`);
  const events = await resp.json();

  const paths = events.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: true,
   };
}

export async function getStaticProps({ params: { slug } }) {
  const resp = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await resp.json();

  return {
    props: { event: events[0] },
    revalidate: 1,
  }
}
