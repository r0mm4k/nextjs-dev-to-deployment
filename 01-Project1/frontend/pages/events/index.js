import { API_URL } from "@/config/index";

import Layout from "@/components/layout";
import EventItem from "@/components/event-item";

export default function EventsPage({ events }) {
  const hasEmptyData = !events.length && <h3>No events to show</h3>;
  const hasEvents = events.map((event) => (
    <EventItem key={event.id} event={event} />
  ));

  return (
    <Layout>
      <h1>Events</h1>
      {hasEmptyData}
      {hasEvents}
    </Layout>
  );
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await resp.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
