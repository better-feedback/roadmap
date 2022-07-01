import Head from "next/head";
import config from "config";

type Props = {
  title?: string;
  metaDescription?: string;
};

export function CustomHead(props: Props) {
  return (
    <Head>

      {/* Primary Meta Tags */}
      <title>
        {props.title ? `${props.title} | ` : ""}
        {config.site.title}
      </title>
      <meta name="title" content={config.site.title}/>
      <meta name="description" content={config.site.metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gov.evmos.vision/" />
      <meta property="og:title" content="Evmos Governance Issue Tracker" />
      <meta property="og:description" content="An issue tracker for all things related to Evmos governance." />
      <meta property="og:image" content="/card.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://gov.evmos.vision/" />
      <meta property="twitter:title" content="Evmos Governance Issue Tracker" />
      <meta property="twitter:description" content="An issue tracker for all things related to Evmos governance." />
      <meta property="twitter:image" content="/card.png" />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}

export default CustomHead;
