
// нужно для рассчета всего суммарного значнеия инвестиций на текущий момент
const portfolioSumArr = []

const portfolioSumStartArr = []

// тикеры для получения котировок по ним через API + рубль
const tickerArr = ['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u', 'RUB=X']

// массив только с акциями
const tickerArrOnlyStocks = ['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u']




// создаем строку из тикеров массива tickerArr, которая будет вставляться в запрос АПИ по получению котировок
const create_StocksStringForAPI = function (arr) {

  // апдейтнули тикеры в формат для запроса
  const arrForFetchString = arr.map(function (el) {
    return el + '%2C'
  })

  //склеили аргументы в строку для запроса котировок
  const forFetchStocksString = arrForFetchString.join('')

  return forFetchStocksString

}





// получаем курсы котировок единым запросом (акции + курс рубля)
const get_API_StocksQuotes = async function (formattedQuotesString) {


  const response = await fetch(`https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${formattedQuotesString}`, {
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




// вытягиваем текущее значение бенчмарка
const get_BenchmarkLastPrice = function(arr) {

  const benchMarkData = arr.filter(function(el) {
    return el.symbol === 'FXIT.ME'
  })

  const lastBMPrice = benchMarkData[0].regularMarketPrice

  return lastBMPrice
}








const calculate_StocksData = async function (arr) {

  // получаем актуальные курсы котировок (акции + рубль - последний элемент)
  const stocksPlusRubQuotes = await get_API_StocksQuotes(tickerArr)

  // оставляем только массив с курсами котирвок, отрезали последний элемент - курс рубля
  const stockQuotesArr = stocksPlusRubQuotes.slice(0, -1)

  // получаем только данные по рублю
  const rubUsdRate = stocksPlusRubQuotes.pop().regularMarketPrice

  // переменная для формироания объекта с данными по балансам
  let totalDataObj


  // текущая цена бенчмарка (вытягиваем из всего списка котировок полученных через АПИ по всем инструментам)
  const lastBMPrice = get_BenchmarkLastPrice(stocksPlusRubQuotes)



  // проходимся по массиву с тикерами из портфеля и матчим их с полученными котировками по АПИ, чтобы вытянуть нужные данные
  arr.forEach(function (el) {


    // вытягиваем последнюю актуальную цену акции из объекта полученного по АПИ проходимся по массиву с полученными через API котировками и сравниваем с текущим элементом в массиве с тикерами (передаем как аргумент в функцию). Когда находим соответствие сохраняем последнюю цену в переменную  lastStockPrice
    let lastStockPrice

    stockQuotesArr.forEach(function (elApi) {
      if (elApi.symbol === el.toUpperCase()) {
        lastStockPrice = elApi.regularMarketPrice
      }
    })


    //  находим объект со стартовыми данными по акции, потом потребуются для калькуляции других параметров
    const currentStock = investmentPortfolio.filter(function (elPortfolio) {
      return elPortfolio.stockTicker === el
    })


    const pnl = lastStockPrice - currentStock[0].buyPrice


    if (currentStock[0].currency === 'usd') {
      portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice) * rubUsdRate).toFixed(2)
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume * currentStock[0].usdRubRateBuyDate)
    }


    if (currentStock[0].currency === 'rub') {
      portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice).toFixed(2))
      portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume)
    }

    const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
      return acc + cur
    }, 0).toFixed(2)

    const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
      return acc + cur
    }, 0).toFixed(2)


    // считаем процентное изменение бенчмарка
    const benchmarkLastPrice = (lastBMPrice - currentStock[0].benchMarkStartPrice)/(currentStock[0].benchMarkStartPrice/100)


    // формируем объект с данными, которые передадим в компоненту для формирвования HTML по каждой акции
    const stockDataObj = {
      pnl: pnl,
      currency: currentStock[0].currency,
      ticker: currentStock[0].stockTicker.toUpperCase(),
      volume: currentStock[0].volume,
      buyPrice: new Intl.NumberFormat('ru-RU').format(currentStock[0].buyPrice),
      lastPrice: new Intl.NumberFormat('ru-RU').format(lastStockPrice.toFixed(2)),
      totalVolumePrice: new Intl.NumberFormat('ru-RU').format((currentStock[0].volume * lastStockPrice).toFixed(2)),
      deltaMoney: new Intl.NumberFormat('ru-RU').format((pnl * currentStock[0].volume).toFixed(2)),
      deltaPercent: ((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2),
      benchMarkDeltaPercent: benchmarkLastPrice.toFixed(0),
      benchMarkName: "FXIT.ME",
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



// получаем по АПИ объекты с кучей данных по интересующему списку инструментов
get_API_StocksQuotes(create_StocksStringForAPI(tickerArr))


// вычисляем на основне полученных данных по АПИ и стартовых данных нужные показатели + рендерим компоненты в интерфейс
calculate_StocksData(tickerArrOnlyStocks)














































































