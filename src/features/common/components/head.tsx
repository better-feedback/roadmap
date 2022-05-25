import Head from "next/head";
import config from "config";

type Props = {
  title?: string;
  metaDescription?: string;
};

export function CustomHead(props: Props) {
  return (
    <Head>
      <title>
        {props.title ? `${props.title} | ` : ""}
        {config.site.title}
      </title>
      <meta name="description" content={props.metaDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default CustomHead;
