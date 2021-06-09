import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/event-item.module.css';

export default function EventItem({ event: { image, date, time, name, slug } }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={image || "/images/event-default.png"} width={170} height={100} />
      </div>

      <div className={styles.info}>
        <span>{date} at {time}</span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
