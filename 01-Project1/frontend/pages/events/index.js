import Head from 'next/head';

import { API_URL } from '@/config/index';

import Layout from '@/components/layout';
import EventItem from '@/components/event-item';

export default function EventsPage({ events }) {
  const hasEmptyData = !events.length && <h3>No events to show</h3>;
  const hasEvents = events.map((event) => <EventItem key={event.id} event={event} />);

  return (
    <Layout>
      <h1>Events</h1>
      {hasEmptyData}
      {hasEvents}
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
