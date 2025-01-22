import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "tscircuit docs",
	tagline: "Dinosaurs are cool",
	favicon: "logo/ts.svg",

	// Set the production url of your site here
	url: "https://docs.tscircuit.com",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "facebook", // Usually your GitHub org/user name.
	projectName: "docusaurus", // Usually your repo name.

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
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
					// Useful options to enforce blogging best practices
					onInlineTags: "warn",
					onInlineAuthors: "warn",
					onUntruncatedBlogPosts: "warn",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
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
					href: "https://github.com/tscircuit/tscircuit",
					label: "GitHub",
					position: "right",
					className: "header-github-link",
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
	} satisfies Preset.ThemeConfig,
};

export default config;
