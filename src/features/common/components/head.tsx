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

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.site.url}/>
      <meta property="og:title" content={config.site.title}/>
      <meta property="og:description" content={config.site.metaDescription}/>
      <meta property="og:image" content={config.site.metaImg}/>

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content={config.site.url}/>
      <meta property="twitter:title" content={config.site.title}/>
      <meta property="twitter:description" content={config.site.metaDescription}/>
      <meta property="twitter:image" content={config.site.metaImg}/>

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default CustomHead;
