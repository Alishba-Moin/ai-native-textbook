import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics – AI-Native Textbook',
  tagline: 'Mastering Embodied Intelligence: From Theory to Humanoid Deployment',
  favicon: 'img/favicon.ico',

  url: 'https://Alishba-Moin.github.io',
  baseUrl: '/ai-native-textbook/',

  organizationName: 'Alishba-Moin', // Usually your GitHub org/user name.
  projectName: 'ai-native-textbook', // Usually your repo name.

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },


  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    backendUrl: 'https://ai-native-textbook-production.up.railway.app/',  
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          //  Changed to load docs from the root docs/ directory
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/Alishba-Moin/ai-native-textbook/tree/main/docs/',
        },
        blog: false, // Disable blog for textbook
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Book logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://github.com/Alishba-Moin/ai-native-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/introduction-to-robotics',
              },
            ],
          },

          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Alishba-Moin/ai-native-textbook',
              },
              {
                label: 'Project Constitution',
                href: 'https://github.com/Alishba-Moin/ai-native-textbook/blob/main/.specify/memory/constitution.md',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
      },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
