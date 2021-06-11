import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import { API_URL } from "@/config/index";

import styles from "@/styles/event.module.css";

import Layout from "@/components/layout";

export default function EventPage({
  event: {
    id,
    name,
    date,
    time,
    image,
    performers,
    description,
    venue,
    address,
  },
}) {
  const { push } = useRouter();

  const normalizedDate = new Date(date).toLocaleDateString("en-US");

  const hasImage = image && (
    <div className={styles.image}>
      <Image src={image?.formats?.medium?.url} width={960} height={600} />
    </div>
  );

  const deleteEvent = async () => {
    try {
      const resp = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await resp.json();

      push("/events");
    } catch {
      toast.error("Something went wrong...");
    }
  };
  const handleDeleteEvent = () => {
    if (!confirm("Are you sure?")) {
      return;
    }

    deleteEvent();
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={handleDeleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {normalizedDate} at {time}
        </span>
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
  );
}

export async function getStaticPaths() {
  const resp = await fetch(`${API_URL}/events`);
  const events = await resp.json();

  const paths = events.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const resp = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await resp.json();

  return {
    props: { event: events[0] },
    revalidate: 1,
  };
}
