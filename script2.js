
// const getStockPriceAsync = async function (stock) {


//   // находим в массиве портфеля нужную бумагу
//   const currentStock = investmentPortfolio.filter(function (el) {
//     return el.stockTicker === stock
//   })

//   // console.log(currentStock);


//   // иностранные акции грузятся по API
//   if (currentStock[0].currency === 'usd') {



//     const rubPrice = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
//     const rubData = await rubPrice.json()
//     const rubUsdRate = rubData.Valute.USD.Value

//     // console.log(`Rub: ${rubData.Valute.USD.Value}`);

//     const stockPrice = await fetch(`https://api.tdameritrade.com/v1/marketdata/${stock}/quotes?apikey=I6POQMG2MLCUUT26XJCSHZAEX4HF4AZG`)
//     const stockPriceData = await stockPrice.json()
//     const ticker = stock.toUpperCase()
//     const lastStockPrice = stockPriceData[ticker].lastPrice



//     // let x

//     // setTimeout(() => {

//     // x = lastStockPrice

//     const pnl = lastStockPrice - currentStock[0].buyPrice
//     const total = currentStock[0].volume * lastStockPrice


//     // текущая стоимость портфеля
//     portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice) * rubUsdRate).toFixed(2)

//     // console.log(portfolioSumArr);

//     const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     totalSumLast.textContent = totalInvestmentsSum



//     // console.log(totalInvestmentsSum);

//     // Стартовая стоимость портфеля
//     portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume * currentStock[0].usdRubRateBuyDate)

//     // console.log(portfolioSumStartArr);

//     const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)


//     totalSumStart.textContent = totalInvestmentsSumStart

//     // console.log(totalInvestmentsSumStart);


//     // изменение стоимости портфеля в руб

//     // изменение стоимости портфеля в %
//     // console.log(totalInvestmentsSumStart);
//     // console.log(totalInvestmentsSumRub);



//     let liHTML

//     if (pnl > 0) {

//       let classAdd = 'profit';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     } else {

//       let classAdd = 'loss';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     }


//     // }, 1);




//     // российские акции грузятся в ручном режиме
//   } else if (currentStock[0].currency === 'rub') {

//     const pnl = currentStock[0].lastPrice - currentStock[0].buyPrice

//     // Стартовая стоимость портфеля
//     portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume)

//     // console.log(portfolioSumStartArr);

//     const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     // console.log(totalInvestmentsSumStart);

//     totalSumStart.textContent = totalInvestmentsSumStart


//     // текущая стоимость портфеля
//     portfolioSumArr.push(+(currentStock[0].volume * currentStock[0].lastPrice).toFixed(2))

//     // console.log(portfolioSumArr);

//     const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     totalSumLast.textContent = totalInvestmentsSum

//     // console.log(totalInvestmentsSum);


//     let liHTML

//     if (pnl > 0) {

//       let classAdd = 'profit';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${currentStock[0].lastPrice} Р.</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * currentStock[0].lastPrice)} Р.</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((currentStock[0].lastPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     } else {

//       let classAdd = 'loss';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${currentStock[0].lastPrice} Р.</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * currentStock[0].lastPrice)} Р.</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((currentStock[0].lastPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     }


//   }

// }







// const getStockPriceAsync = async function (stock) {


//   // находим в массиве портфеля нужную бумагу
//   const currentStock = investmentPortfolio.filter(function (el) {
//     return el.stockTicker === stock
//   })

//   // console.log(currentStock);


//   // иностранные акции грузятся по API
//   if (currentStock[0].currency === 'usd') {



//     const rubPrice = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
//     const rubData = await rubPrice.json()
//     const rubUsdRate = rubData.Valute.USD.Value

//     // const response = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${stock}&region=US`, {
//     //   "method": "GET",
//     //   "headers": {
//     //     "x-rapidapi-host": "yh-finance.p.rapidapi.com",
//     //     "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//     //   }
//     // })
//     // const data = await response.json()

//     // const rubUsdRate = data.price.regularMarketPrice.raw

//     // console.log(`Rub: ${rubData.Valute.USD.Value}`);

//     const stockPrice = await fetch(`https://api.tdameritrade.com/v1/marketdata/${stock}/quotes?apikey=I6POQMG2MLCUUT26XJCSHZAEX4HF4AZG`)
//     const stockPriceData = await stockPrice.json()
//     const ticker = stock.toUpperCase()
//     const lastStockPrice = stockPriceData[ticker].lastPrice



//     // let x

//     // setTimeout(() => {

//     // x = lastStockPrice

//     const pnl = lastStockPrice - currentStock[0].buyPrice
//     const total = currentStock[0].volume * lastStockPrice


//     // текущая стоимость портфеля
//     portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice) * rubUsdRate).toFixed(2)

//     // console.log(portfolioSumArr);

//     const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     totalSumLast.textContent = totalInvestmentsSum



//     // console.log(totalInvestmentsSum);

//     // Стартовая стоимость портфеля
//     portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume * currentStock[0].usdRubRateBuyDate)

//     // console.log(portfolioSumStartArr);

//     const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)


//     totalSumStart.textContent = totalInvestmentsSumStart

//     // console.log(totalInvestmentsSumStart);


//     let liHTML

//     if (pnl > 0) {

//       let classAdd = 'profit';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     } else {

//       let classAdd = 'loss';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice}$ -> <span>${lastStockPrice.toFixed(2)}$</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice).toFixed(2)} $</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume).toFixed(2)}$ <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     }


//     // }, 1);




//     // российские акции грузятся в ручном режиме
//   } else if (currentStock[0].currency === 'rub') {

//     const response = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${stock}&region=US`, {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "yh-finance.p.rapidapi.com",
//         "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//       }
//     })

//     const data = await response.json()

//     const lastStockPrice = data.price.regularMarketPrice.raw

//     const pnl = lastStockPrice - currentStock[0].buyPrice

//     // Стартовая стоимость портфеля
//     portfolioSumStartArr.push(currentStock[0].buyPrice * currentStock[0].volume)

//     // console.log(portfolioSumStartArr);

//     const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     // console.log(totalInvestmentsSumStart);

//     totalSumStart.textContent = totalInvestmentsSumStart


//     // текущая стоимость портфеля
//     portfolioSumArr.push(+(currentStock[0].volume * lastStockPrice).toFixed(2))

//     // console.log(portfolioSumArr);

//     const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
//       return acc + cur
//     }, 0).toFixed(2)

//     totalSumLast.textContent = totalInvestmentsSum

//     // console.log(totalInvestmentsSum);


//     let liHTML

//     if (pnl > 0) {

//       let classAdd = 'profit';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${lastStockPrice} Р.</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice)} Р.</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     } else {

//       let classAdd = 'loss';

//       liHTML = `
//       <li>
//       <div class="quote-box ${classAdd}">
//         <div class="stock-data">
//           <p class="stock-name">${currentStock[0].stockTicker.toUpperCase()} <span>(${currentStock[0].volume} шт.)</span></p>
//           <p class="stock-amount">${currentStock[0].buyPrice} Р. -> <span>${lastStockPrice} Р.</span> </p>
//         </div>
//         <div class="stock-price">
//           <p class="stock-total-sum-price">${(currentStock[0].volume * lastStockPrice)} Р.</p>
//           <p class="stock-price-delta">${(pnl * currentStock[0].volume)}Р. <span>(${((lastStockPrice - currentStock[0].buyPrice) / (currentStock[0].buyPrice / 100)).toFixed(2)}%)</span></p>
//         </div>
//       </div>
//     </li>
//   `

//       quoteContainer.insertAdjacentHTML("beforeend", liHTML)

//     }


//   }

// }





// const rapidAPI_GET_market_v2_get_quotes = async function () {

//   const response = await fetch("https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=nvda%2Crblx%2Caapl%2Cfxit.me%2Cyndx.me%2C", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "yh-finance.p.rapidapi.com",
//       "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//     }
//   })

//   const data = await response.json()

//   console.log(data.quoteResponse.result);

// }

// rapidAPI_GET_market_v2_get_quotes()























// const rapidAPIStockPrice = async function (ticker) {

//   const response = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`, {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "yh-finance.p.rapidapi.com",
//       "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//     }
//   })

//   const data = await response.json()

//   console.log(data.price.regularMarketPrice.raw);

// }


// rapidAPIStockPrice('RUB=X')



// const rapidAPIStockNews = async function (ticker) {

//   const response = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${ticker}`, {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
//       "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//     }
//   })

//   const data = await response.json()

//   console.log(data);

// }


// rapidAPIStockNews('nvda')



// const rapidAPI_GET_market_v2_get_quotes = async function () {

//   const response = await fetch("https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=nvda%2Crblx%2Caapl%2Cfxit.me%2Cyndx.me%2CRUB=X", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-host": "yh-finance.p.rapidapi.com",
//       "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
//     }
//   })

//   const data = await response.json()

//   console.log(data.quoteResponse.result);

// }

// rapidAPI_GET_market_v2_get_quotes()




