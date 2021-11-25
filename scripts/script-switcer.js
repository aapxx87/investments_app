const containerQuotes = document.querySelector('.container-portfolio-quotes')
const containerNews = document.querySelector('.container-portfolio-news')

const btnQuote = document.querySelector('.quotes-section')
const btnNews = document.querySelector('.news-section')


btnQuote.addEventListener('click', function () {

  containerQuotes.style.display = 'block'
  containerNews.style.display = 'none'

})


btnNews.addEventListener('click', function () {

  containerQuotes.style.display = 'none'
  containerNews.style.display = 'block'

})