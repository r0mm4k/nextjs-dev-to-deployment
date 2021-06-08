import Head from "next/head";
import { useRouter } from "next/router";

import Header from './header';
import Showcase from './showcase';
import Footer from './footer';

import styles from '@/styles/layout.module.css';

export default function Layout({title, keywords, description, children}) {
  const { pathname } = useRouter();

  const hasShowcase = pathname === "/" && <Showcase />;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {hasShowcase}

      <div className={styles.container}>
        {children}
      </div>

      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest patries",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
}
