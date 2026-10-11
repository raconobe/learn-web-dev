import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Learn Web Dev",
  description: "Web Development Roadmap & Resources",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Roadmap', link: '/roadmap' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' }
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Roadmap', link: '/roadmap' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'HTML Fundamentals', link: '/html/' },
          { text: 'CSS & Styling', link: '/css/' },
          { text: 'JavaScript Programming', link: '/javascript/' }
        ]
      }
    ]
  }
})
