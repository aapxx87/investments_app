
const quoteContainer = document.querySelector('.quote-ul')
const quoteBox = document.querySelector('.quote-box')

const containerTotalBalances = document.querySelector('.total-balances')


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

// тикеры для получения котировок по ним через API + рубль
const tickerArr = ['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u', 'RUB=X']

// массив только с акциями
const tickerArrOnlyStocks = ['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u']





// получаем курсы котировок единым запросом (акции + курс рубля)
const getStocksQuotes = async function (arr) {

  // апдейтнули тикеры в формат для запроса 
  const arrForFetchString = arr.map(function (el) {
    return el + '%2C'
  })


  //склеили аргументы в строку для запроса котировок 
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

  return stockQuotesArr

}








const getInstrumentsPricecAsync = async function (arr) {

  // получаем актуальные курсы котировок (акции + рубль - последний элемент)
  const stocksPlusRubQuotes = await getStocksQuotes(tickerArr)

  // оставляем только массив с курсами котирвок, отрезали последний элемент - курс рубля
  const stockQuotesArr = stocksPlusRubQuotes.slice(0, -1)

  // получаем только данные по рублю
  const rubUsdRate = stocksPlusRubQuotes.pop().regularMarketPrice

  // переменная для формироания объекта с данными по балансам
  let totalDataObj



  // проходимся по массиву с тикерами из портфеля и матчим их с полученными котировками по АПИ, чтобы вытянуть нужные данные
  arr.forEach(function (el) {


    let lastStockPrice

    // проходимся по массиву с полученными через API котировками и сравниваем с текущим элементом в массиве с тикерами (передаем как аргумент в функцию)
    // когда находим соответствие сохраняем последнюю цену в переменную  lastStockPrice
    stockQuotesArr.forEach(function (elApi) {
      if (elApi.symbol === el.toUpperCase()) {
        lastStockPrice = elApi.regularMarketPrice
      }
    })


    const currentStock = investmentPortfolio.filter(function (elPortfolio) {
      return elPortfolio.stockTicker === el
    })


    const pnl = lastStockPrice - currentStock[0].buyPrice


    if(currentStock[0].currency === 'usd') {
      portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice) * rubUsdRate).toFixed(2)
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume * currentStock[0].usdRubRateBuyDate)
    } else if(currentStock[0].currency === 'rub') {
      portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice).toFixed(2))
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume)
    }

    const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
      return acc + cur
    }, 0).toFixed(2)

    const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
      return acc + cur
    }, 0).toFixed(2)


    // формируем объект с данными, которые передадим в компоненту для формирвования HTML по каждой акции
    const stockDataObj = {
      pnl: pnl,
      ticker: currentStock[0].stockTicker.toUpperCase(),
      volume: currentStock[0].volume,
      buyPrice: currentStock[0].buyPrice,
      lastPrice: lastStockPrice.toFixed(2),
      totalVolumePrice: (currentStock[0].volume * lastStockPrice).toFixed(2),
      deltaMoney: (pnl * currentStock[0].volume).toFixed(2),
      deltaPercent: ((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2),
    }

    // формируем объект с данными, которые передадим в компоненту для формирвования итоговых балансов
    totalDataObj = {
      startAmount: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSumStart),
      lastAmount: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum),
      totalDelta: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum - totalInvestmentsSumStart),
      totalDeltaPercent: ((totalInvestmentsSum - totalInvestmentsSumStart) / (totalInvestmentsSumStart / 100)).toFixed(0)
    }


    // вставляем компоненту по каждой конкретной акции
    componentStockData(stockDataObj)

  })

  // всавляем компоненту с балансами тотальными
  componentTotalBalances(totalDataObj)


}



const componentStockData = function (obj) {

  const html = `
          <li>
          <div class="quote-box ${obj.pnl > 0 ? "profit" : "loss"}">
            <div class="stock-data">
              <p class="stock-name">${obj.ticker} <span>(${obj.volume} шт.)</span></p>
              <p class="stock-amount">${obj.buyPrice}$ -> <span>${obj.lastPrice}$</span> </p>
            </div>
            <div class="stock-price">
              <p class="stock-total-sum-price">${obj.totalVolumePrice} $</p>
              <p class="stock-price-delta">${obj.deltaMoney}$ <span>(${obj.deltaPercent}%)</span></p>
            </div>
          </div>
        </li>
      `

  quoteContainer.insertAdjacentHTML("beforeend", html)

}


const componentTotalBalances = function (obj) {

  const html = `
        <div class="start-current-balance">
          <p class="totalSumStart">${obj.startAmount}</p> &#8594 <p class="totalSumLast">${obj.lastAmount}</p>
        </div>
        <div class="pnl-box">
          <p class="pnl-total">${obj.totalDelta}</p>
          <p class="pnl-percent">(${obj.totalDeltaPercent}%)</p>
        </div>
  `

  containerTotalBalances.insertAdjacentHTML("beforeend", html)

}



getInstrumentsPricecAsync(tickerArrOnlyStocks)












































































