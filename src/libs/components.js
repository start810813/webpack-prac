import introImg from '../cute_pug.jpg'

export const getIntroTitle = () => {
  const el = document.createElement('h2')
  el.innerText = 'Hello, HTML模板是用Pug完成的～'
  return el
}

export const getIntroDesc = () => {
  const el = document.createElement('p')
  el.innerText = '使用到pug-html-loader和html-loader，圖片則使用ImageminPlugin進行壓縮'
  return el
}

export const getIntroImg = () => {
  const el = document.createElement('img')
  el.src = introImg
  return el
}
