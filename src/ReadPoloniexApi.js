// read from the poloniex API 
export const readPoloniexApi = (coinObject) => {
  var fromCoin = coinObject.fromCoin
  var toCoin = coinObject.toCoin
  var value = coinObject.value

  if (toCoin !== "" && fromCoin !== "") { // check if the inputs are valid
    var poloResponse = coinObject.poloniexResponse
    // change possible USD to USDT for Tether usage
    if (fromCoin === "USD") fromCoin = "USDT"
    if (toCoin === "USD") toCoin = "USDT"

    // direct checking Poloniex
    var price = poloResponse[toCoin + "_" + fromCoin]

    if (price !== undefined) {
      return { price: price.last * value, unit: price.last }
    } else { 
      // try with inverse conversion, e.g., if there is no ETH / BTC, find 1 / BTC / ETH
      price = poloResponse[fromCoin + "_" + toCoin]

      if (price !== undefined) {
        return { price: value / price.last, unit: 1 / price.last}
      } else { 
        /* try with conversion through BTC. e.g., if there is no SC / ETH, find
         * BTC/SC and BTC/ETH and then return SC/BTC * BTC/ETH to get SC/ETH
         */
        var priceFromBtc = undefined
        var priceToBtc = undefined

        // special case for tether conversion
        if (fromCoin !== "USDT") {
          priceFromBtc = poloResponse["BTC_" + fromCoin]
        } else {
          priceFromBtc = poloResponse["USDT_BTC"]
        }
        if (toCoin !== "USDT") {
          priceToBtc = poloResponse["BTC_" + toCoin]
        } else {
          priceToBtc = poloResponse["USDT_BTC"]
        }

        if (priceFromBtc !== undefined && priceToBtc !== undefined) {
          var fromBtc = (fromCoin === "USDT" ? 1 / priceFromBtc.last : priceFromBtc.last)
          var toBtc = (toCoin === "USDT" ? 1 / priceToBtc.last : priceToBtc.last)

          return { price: fromBtc / toBtc * value, unit: fromBtc / toBtc }
        } else {
          return "Not available"
        }
      }
    }
  } else {
    return "Not available"
  }
}
