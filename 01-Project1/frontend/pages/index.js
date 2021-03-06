import Link from "next/link";

import { API_URL } from "@/config/index";

import Layout from "@/components/layout";
import EventItem from "@/components/event-item";

export default function HomePage({ events }) {
  const hasEmptyData = !events.length && <h3>No events to show</h3>;
  const hasEvents = events.map((event) => (
    <EventItem key={event.id} event={event} />
  ));
  const hasAllEventsButton = events.length > 0 && (
    <Link href="/events">
      <a className="btn-secondary">View All Events</a>
    </Link>
  );

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {hasEmptyData}
      {hasEvents}
      {hasAllEventsButton}
    </Layout>
  );
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await resp.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
