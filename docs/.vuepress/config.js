const { fs, path } = require('@vuepress/shared-utils')

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
      '/javascript/': getSideBar('javascript'),
      '/algorithm/': getSideBar('algorithm'),
      '/': [
        ''
      ]
    }
  }
}

function getSideBar(folder) {
  let files = fs
    .readdirSync(path.resolve(__dirname, `../${folder}`))
    .map(filename => filename.slice(0, -3))
    .filter(name => name !== 'README')

  files.unshift('')
  return files
}