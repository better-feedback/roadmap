import Head from "./head";
import HeaderNav from "./header-nav";
import Footer from "./footer";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  title?: string;
  metaDescription?: string;
};

export function Layout(props: Props) {
  return (
    <div className="min-h-screen dark:bg-zinc-900 dark:text-white">
      <Head title={props.title} metaDescription={props.metaDescription} />
      <HeaderNav />
      <main>
        <div className="container mx-auto p-4">{props.children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
