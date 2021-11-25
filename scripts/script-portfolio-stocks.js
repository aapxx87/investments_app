
const quoteContainer = document.querySelector('.quote-ul')
const quoteBox = document.querySelector('.quote-box')

const totalSumLast = document.querySelector('.totalSumLast')
const totalSumStart = document.querySelector('.totalSumStart')


const totalDelta = document.querySelector('.pnl-total')
const totalDeltaProcent = document.querySelector('.pnl-percent')




// ----- Stock part
const investmentPortfolio = [
  {
    stockTicker: 'aapl',
    currency: 'usd',
    buyDate: '25.02.2020',
    buyPrice: 73.22,
    volume: 4,
    usdRubRateBuyDate: 67,
  },
  {
    stockTicker: 'nvda',
    currency: 'usd',
    buyDate: '10.07.2020',
    buyPrice: 104.35,
    volume: 4,
    usdRubRateBuyDate: 73,
  },
  {
    stockTicker: 'rblx',
    currency: 'usd',
    buyDate: '03.11.2021',
    buyPrice: 78.72,
    volume: 2,
    usdRubRateBuyDate: 73.09,
  },
  {
    stockTicker: 'u',
    currency: 'usd',
    buyDate: '12.11.2021',
    buyPrice: 187.2,
    volume: 1,
    usdRubRateBuyDate: 72.97,
  },
  {
    stockTicker: 'fb',
    currency: 'usd',
    buyDate: '25.03.2020',
    buyPrice: 160.14,
    volume: 1,
    usdRubRateBuyDate: 80.32,
  },
  {
    stockTicker: 'mtch',
    currency: 'usd',
    buyDate: '25.03.2020',
    buyPrice: 63.99,
    volume: 1,
    usdRubRateBuyDate: 66.57,
  },
  {
    stockTicker: 'tcsg.me',
    currency: 'rub',
    buyDate: '10.01.2020',
    buyPrice: 1370,
    lastPrice: 6848,
    volume: 2,
    usdRubRateBuyDate: 66.57,
  },
  {
    stockTicker: 'yndx.me',
    currency: 'rub',
    buyDate: '10.01.2020',
    buyPrice: 2732,
    lastPrice: 5612,
    volume: 1,
    usdRubRateBuyDate: 66.57,
  },
  {
    stockTicker: 'fxit.me',
    currency: 'rub',
    buyDate: '10.01.2020',
    buyPrice: 5675,
    lastPrice: 12382,
    volume: 1,
    usdRubRateBuyDate: 66.57,
  }
]


const portfolioSumArr = []
const portfolioSumStartArr = []



const getInstrumentsPricecAsync = async function (arr) {

  console.log('GET-quotes-Start');

  // получили курс рубля
  const rubPrice = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=RUB=X&region=US`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
    }
  })

  const rubData = await rubPrice.json()

  const rubUsdRate = rubData.price.regularMarketPrice.raw

  //склеили аргументы в строку для запроса котировок 
  const arrForFetchString = arr.map(function (el) {
    return el + '%2C'
  })

  const forFetchStocksString = arrForFetchString.join('')

  const response = await fetch(`https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${forFetchStocksString}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
    }
  })

  const data = await response.json()

  // получили массив с данными по акциям из массива аргументов
  const stockQuotesArr = data.quoteResponse.result;

  arr.forEach(function (el) {


    let lastStockPrice

    stockQuotesArr.forEach(function (elApi) {
      if (elApi.symbol === el.toUpperCase()) {
        lastStockPrice = elApi.regularMarketPrice
      }
    })


    const currentStock = investmentPortfolio.filter(function (elPortfolio) {
      return elPortfolio.stockTicker === el
    })

    // console.log(currentStock);


    if (currentStock[0].currency === 'usd') {

      const pnl = lastStockPrice - currentStock[0].buyPrice
      const total = currentStock[0].volume * lastStockPrice


      // текущая стоимость портфеля
      portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice) * rubUsdRate).toFixed(2)


      const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
        return acc + cur
      }, 0).toFixed(2)

      totalSumLast.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum)

      // Стартовая стоимость портфеля
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume * currentStock[0].usdRubRateBuyDate)

      // console.log(portfolioSumStartArr);

      const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
        return acc + cur
      }, 0).toFixed(2)


      totalSumStart.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSumStart)

      // console.log(totalInvestmentsSumStart);


      let liHTML

      if (pnl > 0) {

        let classAdd = 'profit';

        liHTML = `
          <li>
          <div class="quote-box ${classAdd}">
            <div class="stock-data">
              <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
              <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
            </div>
            <div class="stock-price">
              <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
              <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
            </div>
          </div>
        </li>
      `

        quoteContainer.insertAdjacentHTML("beforeend", liHTML)

      } else {

        let classAdd = 'loss';

        liHTML = `
          <li>
          <div class="quote-box ${classAdd}">
            <div class="stock-data">
              <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
              <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
            </div>
            <div class="stock-price">
              <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
              <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
            </div>
          </div>
        </li>
      `

        quoteContainer.insertAdjacentHTML("beforeend", liHTML)

      }

      totalDelta.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum - totalInvestmentsSumStart)

      totalDeltaProcent.textContent = `(${((totalInvestmentsSum - totalInvestmentsSumStart) / (totalInvestmentsSumStart / 100)).toFixed(0)}%)`


    } else if (currentStock[0].currency === 'rub') {

      const pnl = lastStockPrice - currentStock[0].buyPrice

      // Стартовая стоимость портфеля
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume)

      const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
        return acc + cur
      }, 0).toFixed(2)

      totalSumStart.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSumStart) -


        // текущая стоимость портфеля
        portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice).toFixed(2))

      // console.log(portfolioSumArr);

      const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
        return acc + cur
      }, 0).toFixed(2)

      totalSumLast.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum)


      let liHTML

      if (pnl > 0) {

        let classAdd = 'profit';

        liHTML = `
           <li>
           <div class="quote-box ${classAdd}">
          <div class="stock-data">
            <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
            <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${lastStockPrice} Р.</span> </p>
            </div>
            <div class="stock-price">
            <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice)} Р.</p>
            <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
            </div>
           </div>
          </li>
        `

        quoteContainer.insertAdjacentHTML("beforeend", liHTML)

      } else {

        let classAdd = 'loss';

        liHTML = `
             <li>
            <div class="quote-box ${classAdd}">
             <div class="stock-data">
              <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
            <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${lastStockPrice} Р.</span> </p>
             </div>
              <div class="stock-price">
               <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice)} Р.</p>
            <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
            </div>
           </div>
           </li>
           `

        quoteContainer.insertAdjacentHTML("beforeend", liHTML)

      }

      totalDelta.textContent = new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum - totalInvestmentsSumStart)

      totalDeltaProcent.textContent = `(${((totalInvestmentsSum - totalInvestmentsSumStart) / (totalInvestmentsSumStart / 100)).toFixed(0)}%)`



    }

  })

}



getInstrumentsPricecAsync(['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u'])












































































