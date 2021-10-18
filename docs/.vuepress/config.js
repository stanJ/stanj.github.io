module.exports = {
  title: 'StanJ\'s Blog',
  description: '记录工作、学习经验',
  themeConfig: {
    nav: [
      { 
        text: '前端',
        items: [
          { text: 'javascript', link: '/javascript/' },
          { text: 'css', link: '/css/' },
          { text: 'html', link: '/html/' }
        ]
      },
      { text: '算法', link: '/algorithm/' },
      { text: '设计模式', link: '/design_patterns/' }
    ],
    sidebar: {
      '/javascript/': [
        '',
        'js_this'
      ],
      '/': [
        ''
      ]
    }
  }
}