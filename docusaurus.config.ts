import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "tscircuit docs",
  tagline: "Create Electronics with Typescript and React",
  favicon: "logo/ts.svg",

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  // Set the production url of your site here
  url: "https://docs.tscircuit.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "tscircuit", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Serve docs at root
          editUrl: "https://github.com/tscircuit/docs/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_htd8AQjSfVEsFCLQMAiUooG4Q0DKBCjqYuQglc9V3Wo",
        appUrl: "https://postpig.tscircuit.com",
        enableInDevelopment: false, // optional
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/guides/running-tscircuit/programmatically-building-circuits",
            from: "/guides/programmatically-building-circuits",
          },
          {
            to: "/guides/running-tscircuit/displaying-circuit-json-on-a-webpage",
            from: "/guides/displaying-circuit-json-on-a-webpage",
          },
          {
            to: "/guides/running-tscircuit/using-tscircuit-without-react",
            from: "/guides/using-tscircuit-without-react",
          },
          {
            to: "/guides/running-tscircuit/running-tscircuit-inside-an-iframe",
            from: "/guides/running-tscircuit-inside-an-iframe",
          },
          {
            to: "/guides/running-tscircuit/running-tscircuit-standalone",
            from: "/guides/running-tscircuit-standalone",
          },
          {
            to: "/guides/tscircuit-essentials/automatic-pcb-layout",
            from: "/guides/automatic-pcb-layout",
          },
          {
            to: "/guides/tscircuit-essentials/automatic-schematic-layout",
            from: "/guides/automatic-schematic-layout",
          },
          {
            to: "/guides/tscircuit-essentials/configuring-chips",
            from: "/guides/configuring-chips",
          },
          {
            to: "/guides/tscircuit-essentials/essential-elements",
            from: "/guides/essential-elements",
          },
          {
            to: "/guides/tscircuit-essentials/layout-properties",
            from: "/guides/layout-properties",
          },
          {
            to: "/guides/tscircuit-essentials/manual-edits",
            from: "/guides/manual-edits",
          },
          {
            to: "/guides/tscircuit-essentials/port-and-net-selectors",
            from: "/guides/port-and-net-selectors",
          },
          {
            to: "/guides/tscircuit-essentials/using-expressions",
            from: "/guides/using-expressions",
          },
          {
            to: "/guides/tscircuit-essentials/using-sel-references",
            from: "/guides/using-sel-references",
          },
          {
            to: "/guides/running-tscircuit/platform-configuration",
            from: "/guides/platform-configuration",
          },
        ],
      },
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    metadata: [
      // Twitter Meta Tags
      { name: "twitter:card", content: "summary" }, // Small preview with logo
      // { name: "twitter:title", content: "tscircuit Docs" },
      // { name: "twitter:description", content: "Create Electronics with TypeScript and React" },
      {
        name: "twitter:image",
        content: "https://docs.tscircuit.com/logo/logo.png",
      },

      // LinkedIn & Open Graph Meta Tags
      { property: "og:type", content: "website" },
      // { property: "og:title", content: "tscircuit Docs" },
      // { property: "og:description", content: "Create Electronics with TypeScript and React" },
      {
        property: "og:image",
        content: "https://docs.tscircuit.com/logo/logo.png",
      },
      { property: "og:url", content: "https://docs.tscircuit.com/" },
    ],
    navbar: {
      logo: {
        alt: "tscircuit logo",
        src: "logo/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Quickstart",
        },
        { to: "https://blog.tscircuit.com", label: "Blog", position: "left" },
        {
          to: "https://tscircuit.com",
          label: "Use Online",
          position: "left",
        },
        // {
        //   href: "https://github.com/tscircuit/tscircuit/issues/new?template=Blank+issue",
        //   position: "right",
        //   label: "File Issue",
        // },
        {
          href: "https://discord.com/invite/V7FGE5ZCbA",
          position: "right",
          className: "header-discord-link",
          html: '<img src="/img/discord.svg" alt="Discord" style="height: 22px; width: 22px; margin-bottom: -4px;" class="github-icon" />',
        },
        {
          href: "https://github.com/tscircuit/tscircuit",
          position: "right",
          className: "header-github-link",
          html: '<img src="/img/github.svg" alt="GitHub" style="height: 22px; width: 22px; margin-bottom: -4px; margin-right: 6px;" class="github-icon" />',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Explore",
          items: [
            {
              label: "tscircuit.com",
              href: "https://tscircuit.com",
            },
          ],
        },
        {
          title: "Follow",
          items: [
            {
              label: "Blog",
              href: "https://blog.tscircuit.com/",
            },
            {
              label: "Twitter",
              href: "https://x.com/tscircuit",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/V7FGE5ZCbA",
            },
            {
              label: "GitHub",
              href: "https://github.com/tscircuit/tscircuit",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/@seveibar",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "Terms of Service",
              href: "https://registry.tscircuit.com/legal/terms-of-service.html",
            },
            {
              label: "Privacy Policy",
              href: "https://registry.tscircuit.com/legal/privacy-policy.html",
            },
            {
              label: "contact@tscircuit.com",
              href: "mailto:contact@tscircuit.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} tscircuit, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "N7V9Z4M87E",

      // Public API key: it is safe to commit it
      apiKey: "a25dae460e6a029fd1f7d8cc500aae4b",

      indexName: "tscircuit",

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: "external\\.com|domain\\.com",

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: "/docs/", // or as RegExp: /\/docs\//
      //   to: "/",
      // },

      // Optional: Algolia search parameters
      // searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: "search",

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      // insights: false,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
}

export default config
