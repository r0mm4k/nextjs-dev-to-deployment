import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import { API_URL } from '@/config/index';

import styles from '@/styles/event.module.css';

import Layout from '@/components/layout';

export default function EventPage({ event: { id, name, date, time, image, performers, description, venue, address } }) {
  const hasImage = image && (
    <div className={styles.image}>
      <Image src={image} width={960} height={600} />
    </div>
  );

  const deleteEvent = () => console.log("delete event");

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a><FaPencilAlt /> Edit Event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>{date} at {time}</span>
        <h1>{name}</h1>

        {hasImage}

        <h3>Performers:</h3>
        <p>{performers}</p>

        <h3>Description:</h3>
        <p>{description}</p>

        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
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
