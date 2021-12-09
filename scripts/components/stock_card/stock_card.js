const componentStockData = function (obj) {

    const html = `
          <li>
          <div class="quote-box ${obj.pnl > 0 ? "profit" : "loss"}">
            <div class="stock-data">
              <p class="stock-name">${obj.ticker} <span>(${obj.volume} шт.)</span></p>
              <p class="stock-amount">${obj.buyPrice} ${obj.currency === 'usd' ? "$" : "Р"} -> <span>${obj.lastPrice} ${obj.currency === 'usd' ? "$" : "Р"}</span> </p>
              <p class="bmName">${obj.benchMarkName}</p>
            </div>
            <div class="stock-price">
              <p class="stock-total-sum-price">${obj.totalVolumePrice} ${obj.currency === 'usd' ? "$" : "Р"}</p>
              <p class="stock-price-delta">${obj.deltaMoney} ${obj.currency === 'usd' ? "$" : "Р"} <span>(${obj.deltaPercent}%)</span></p>
              <p class="bm-delta-percent">${obj.benchMarkDeltaPercent} %</p>
            </div>
          </div>
        </li>
      `

    quoteContainer.insertAdjacentHTML("beforeend", html)

}