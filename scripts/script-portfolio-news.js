const newsUl = document.querySelector('.news-ul')
const btnSearchNews = document.querySelector('.btn-search-news')
const stockSelector = document.querySelector('.select-stock-input')
// const stockTitle = document.querySelector('.stock-title')







const rapidAPIStockNews = async function (ticker) {

  console.log('GET-News-Start');

  const response = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${ticker}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
    }
  })

  const data = await response.json()




  data.item.forEach(function (el) {
    // console.log(el);

    const html = `
      <li>
        <p class="title">${el.title}</p>
        <p class="description">${el.description}</p>
        <p class="pubDate">${el.pubDate.slice(0, -14)}</p>
        <p class="link">
          <a href="${el.link}"
            target="blank">Read &#8594</a>
        </p>
      </li> 
    
    `

    newsUl.insertAdjacentHTML('beforeend', html)


  })

}





btnSearchNews.addEventListener('click', function () {


  newsUl.innerHTML = ''


  rapidAPIStockNews(stockSelector.value)


  // stockTitle.textContent = stockSelector.value



})


