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