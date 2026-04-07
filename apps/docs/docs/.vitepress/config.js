import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read the Bell grammar from the vscode package
const grammarPath = path.resolve(__dirname, '../../../../packages/vscode/syntaxes/bel.tmLanguage.json')
const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf-8'))

// Shiki uses the 'name' field as the language ID for highlighting
grammar.name = 'bel'
grammar.scopeName = 'source.bel'

export default defineConfig({
  title: 'Bell',
  description: 'A simple script for describing and making API calls',
  
  head: [
    ['link', { rel: 'icon', href: '/bell/favicon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Bell' }],
    ['meta', { property: 'og:description', content: 'A simple script for describing and making API calls' }],
    ['meta', { property: 'og:image', content: 'https://pjflanagan.github.io/bell/bell-card.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://pjflanagan.github.io/bell/bell-card.png' }]
  ],

  // Update this to match your GitHub repository name
  base: '/bell/',

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Syntax', link: '/guide/syntax' },
          { text: 'CLI', link: '/guide/cli' },
          { text: 'Examples', link: '/guide/examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pjflanagan/bell' }
    ]
  },

  markdown: {
    languages: [grammar]
  }
})
