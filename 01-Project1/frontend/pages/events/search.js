import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { API_URL } from '@/config/index';

import Layout from '@/components/layout';
import EventItem from '@/components/event-item';

export default function SearchPage({ events }) {
  const { query: { term } } = useRouter();

  const hasEmptyData = !events.length && <h3>No events to show</h3>;
  const hasEvents = events.map((event) => <EventItem key={event.id} event={event} />);

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {term}</h1>
      {hasEmptyData}
      {hasEvents}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  console.dir(query)
  const resp = await fetch(`${API_URL}/events?${query}`);
  const events = await resp.json();

  return {
    props: { events },
  };
}
