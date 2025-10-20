import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Documentation',
    url: 'https://example.com',
    baseUrl: '/',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.ts')
                },
                blog: false,
                theme: { customCss: require.resolve('./src/css/global.css') },
            },
        ],
    ],

    themeConfig: {
        navbar: {
            items: [
                {
                    type: 'doc',
                    docId: 'intro',
                    position: 'left',
                    label: 'Documentation',
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.oceanicNext,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
