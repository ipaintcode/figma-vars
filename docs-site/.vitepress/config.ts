import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Figma Variables",
  description: "Modern library for working with Figma variables",
  base: '/figma-vars/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'React', link: '/react/' },
      { text: 'Plugin', link: '/plugin/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Security', link: '/guide/security' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Advanced Usage', link: '/guide/advanced' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Core API', link: '/api/core' },
            { text: 'Token Management', link: '/api/tokens' }
          ]
        }
      ],
      '/react/': [
        {
          text: 'React Integration',
          items: [
            { text: 'Overview', link: '/react/' },
            { text: 'Hooks', link: '/react/hooks' },
            { text: 'Components', link: '/react/components' }
          ]
        }
      ],
      '/plugin/': [
        {
          text: 'Figma Plugin',
          items: [
            { text: 'Overview', link: '/plugin/' },
            { text: 'Setup', link: '/plugin/setup' },
            { text: 'Development', link: '/plugin/development' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ipaintcode/figma-vars' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
})