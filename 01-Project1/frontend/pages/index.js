import Head from 'next/head';

import Link from 'next/link';

import { API_URL } from '@/config/index';

import Layout from '@/components/layout';
import EventItem from '@/components/event-item';

export default function HomePage({ events }) {
  const hasEmptyData = !events.length && <h3>No events to show</h3>;
  const hasEvents = events.map((event) => <EventItem key={event.id} event={event} />);
  const hasAllEventsButton = events.length > 0 && <Link href="/events"><a className="btn-secondary">View All Events</a></Link>;

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {hasEmptyData}
      {hasEvents}
      {hasAllEventsButton}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0,3) },
    revalidate: 1,
  };
}
