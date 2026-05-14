import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read the Bell grammar from the vscode package
const grammarPath = path.resolve(__dirname, '../../../../packages/vscode/syntaxes/bel.tmLanguage.json')
const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf-8'))

// Copy the Bell skill file to public/ so it can be downloaded
const skillSrc = path.resolve(__dirname, '../../../../packages/core/src/skill/bell-skill.md')
const skillDest = path.resolve(__dirname, '../public/bell-skill.md')
fs.copyFileSync(skillSrc, skillDest)

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
          { text: 'Migrate from Postman', link: '/guide/migrate' },
          { text: 'Examples', link: '/guide/examples' },
          { text: 'AI Skill', link: '/guide/ai-skill' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pjflanagan/bell' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456l-.005 10.382H5.113z"/></svg>'
        },
        link: 'https://www.npmjs.com/package/bell-lang',
        ariaLabel: 'npm'
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>'
        },
        link: 'https://marketplace.visualstudio.com/items?itemName=pjflanagan.bell',
        ariaLabel: 'VS Code Marketplace'
      }
    ]
  },

  markdown: {
    languages: [grammar]
  }
})
