# Convertr for Crypto
[![Build Status](https://travis-ci.org/kevin-fang/convertr-for-crypto.svg?branch=master)](https://travis-ci.org/kevin-fang/convertr-for-crypto)

Web application to convert between cryptocurrencies and fiat, based on the Poloniex API. Available at https://kevin-fang.github.io/convertr-for-crypto.

If a direct price conversion is available, the application uses that (BTC -> ETH = BTC/ETH). If this is not available, it tries to convert through the inverse (ETH -> BTC = 1/BTC/ETH). As a last resort, it converts through Bitcoin. (ETH -> USD = ETH/BTC * BTC/USD).

To run for yourself, run the following command: `npm i && npm start`.
