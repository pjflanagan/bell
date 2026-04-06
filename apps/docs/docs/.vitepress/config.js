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
    ['link', { rel: 'icon', href: '/bell/favicon.png' }]
  ],

  // Update this to match your GitHub repository name
  base: '/bell/',

  themeConfig: {
    logo: '/favicon.png',
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
