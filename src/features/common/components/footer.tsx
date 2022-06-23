import config from "config";

const BETTER_LINKS = [
  {
    label: "Homepage",
    link: config.site.url,
  },
  {
    label: "Documentation",
    link: config.site.externalLinks.docs,
  },
  {
    label: "Discord",
    link: `https://discord.com/invite/${config.site.externalLinks.discord}`,
  },
  {
    label: "Twitter",
    link: `https://twitter.com/${config.site.externalLinks.twitter}`,
  },
];

const EXTERNAL_LINKS = [
  {
    label: "Homepage",
    link: config.site.url,
  },
  {
    label: "Add new issue",
    link: `https://github.com/${config.github.repoOwner}/${config.github.repoName}/issues/new/choose`,
  },
];

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="border-gray-100 dark:border-zinc-800 border-b-2" />
        <div className="grid grid-cols-1 gap-8 sm:gap-2 sm:grid-cols-3 p-4 text-gray-500 dark:text-zinc-500">
          <div>
            Powered by{" "}
            <a href="https://betterhq.org/" target="_blank" rel="noreferrer">
              Better
            </a>{" "}
            © 2022
          </div>
          <div>
            <div className="mb-2 font-medium uppercase">
              {config.site.projectName}
            </div>
            <ul className="space-y-1">
              {EXTERNAL_LINKS.map(({ label, link }) => (
                <li key={label}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 font-medium uppercase">Better</div>
            <ul className="space-y-1">
              {BETTER_LINKS.map(({ label, link }) => (
                <li key={label}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
