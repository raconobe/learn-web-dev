import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dev Learning Vault",
  description: "Comprehensive Web Dev, Backend, Languages & OS Knowledge Hub",
  base: '/learn-web-dev/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Frontend', link: '/frontend/' },
      { text: 'Backend', link: '/backend/' },
      { text: 'Languages', link: '/languages/' },
      { text: 'Tools & OS', link: '/tools-os/' }
    ],
    sidebar: {
      '/frontend/': [
        {
          text: 'Frontend Development',
          items: [
            { text: 'Overview', link: '/frontend/' },
            { text: 'HTML5', link: '/frontend/html' },
            { text: 'CSS3', link: '/frontend/css' }
          ]
        }
      ],
      '/backend/': [
        {
          text: 'Backend Development',
          items: [
            { text: 'Overview', link: '/backend/' },
            { text: 'Node.js', link: '/backend/node' },
            { text: 'PHP', link: '/backend/php' },
            { text: 'Go', link: '/backend/go' }
          ]
        }
      ],
      '/languages/': [
        {
          text: 'Programming Languages',
          items: [
            { text: 'Overview', link: '/languages/' },
            { text: 'Python', link: '/languages/python' },
            { text: 'Java', link: '/languages/java' },
            { text: 'C / C++', link: '/languages/cpp' }
          ]
        }
      ],
      '/tools-os/': [
        {
          text: 'Dev Environment & Tools',
          items: [
            { text: 'Overview', link: '/tools-os/' },
            { text: 'Git Version Control', link: '/tools-os/git' },
            { text: 'Debian Linux', link: '/tools-os/debian' }
          ]
        }
      ]
    }
  }
})
