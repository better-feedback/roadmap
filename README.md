# Better 

## How to submit your idea

Visit [/better-app/issues](https://github.com/better-feedback/better-app/issues) and add a new issue.

To list your issue on your Better board, tag the issue category as `bug` or `feature` and its status as `open`, `planned` or `inProgress`.

Your issue should now appear on [better.betterhq.org](https://better.betterhq.org/).

You can now:

👉 login with Discord and vote on your favorite issue

👉 add funds to the issue to start a bounty

👉 work on a bounty and claim the bounty pool once finished.

---

## How to set up Better for your organization

Better mirrors your [Github issues](https://github.com/better-feedback/better-app/issues) to a [hosted website](https://better.betterhq.org/), which allows your community to vote on them, fund them as bounties and claim the pooled funds for implementing them. Issues could range from feature requests, to DAO proposals or content marketing ideas.

Setting up your own Better project takes a few steps:

- Fork the [Better repo](https://github.com/better-feedback/better-app)
- Set up [Vercel]([url](https://vercel.com/))
    - Add a new project, linking to your forked repo
     - Set your ENV variables (Ask us on [Discord](https://discord.com/invite/wwwwRFa6aj)!)

After a successful deployment, point your vercel deployment to your custom URL, eg. feedback.yourdapp.com, roadmap.yourdapp.com, bounties.yourdapp.com

- Copy your DNS info at `https://vercel.com/[yourproject]/[yourrepo]/settings/domains`
- Add the info in your domain manager interface

🎊 Congratulations, you just deployed your custom Better site 🎉

---

## How to customize your Better site

Set your project name and custom footer links in this config file: `\better-app\src\config.ts`

Better mirrors each Github issue based on its tags. The default tags are `open`, `inProgress`, `live`.
If you want to set your own, edit the following files:
-  `\better-app\src\config.ts`
- `src/features/issues/components/issues-list-page.tsx`
- `src/features/issues/constants.ts`
- `src/features/issues/types.ts`

You want to customize your site's UI or got feature ideas for Better? Join our [Discord](https://discord.com/invite/wwwwRFa6aj) and let us know!

---

### Dev

Checkout the repo and set the required environmental variables by copying `./.env.example` into `./.env.local`.

Next, install the dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```
