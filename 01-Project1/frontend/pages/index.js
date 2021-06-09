import Head from 'next/head';

import { API_URL } from '@/config/index';

import Layout from '@/components/layout';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
