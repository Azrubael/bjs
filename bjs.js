let binance = 'https://api.binance.com/api/v3/'
let kline = 'klines'
let ticker = 'BTCUSDT'
let interval = 1             // minutes
let objResponce = new Array(
    ['k0', 'Ticker', 'v0', 'BTCUSDT'],
    ['k1', 'Kline open time', 'v1', ''],
    ['k2', 'Open price', 'v2', ''],
    ['k3', 'High price', 'v3', ''],
    ['k4', 'Low price', 'v4', ''],
    ['k5', 'Close price', 'v5', ''],
    ['k6', 'Volume', 'v6', ''],
    ['k7', 'Kline Close time', 'v7', ''],
    ['k8', 'Quote asset volume', 'v8', ''],
    ['k9', 'Number of trades', 'v9', ''],
    ['k10', 'Ticker buy base asset volume', 'v10', ''],
    ['k11', 'Ticker buy quote asset volume', 'v11', ''],
    ['k12', 'Unused field', 'v12', '--'],
)

queryUrl = binance + kline +
    `?symbol=${ticker}&interval=${interval}m&limit=1`

let binanceRequest = new XMLHttpRequest()

binanceRequest.open('GET', queryUrl, true)

binanceRequest.onload = () => {
    let outputString = binanceRequest.responseText
    // console.log(outputString)
	// outputTag1.innerHTML = 'Полученный ответ от сервера <br>' + outputString
    let aString = outputString.replaceAll('[','')
    let bString = aString.replaceAll(']','')
    let cString = bString.replaceAll('"','')
    parcedString = cString.split(',')
    oTime = new Date(Number(parcedString[0]))
    cTime = new Date(Number(parcedString[6]))
    document.getElementById('v1').innerHTML = oTime.toLocaleString()
    document.getElementById('v7').innerHTML = cTime.toLocaleString()

    for (let i=1; i<13; i++) {
        document.getElementById(objResponce[i][0]).innerHTML = objResponce[i][1]
        objResponce[i][3] = Math.ceil(Number(parcedString[i-1])*100)/100
        if (i===1 || i===7) {continue}
        document.getElementById(objResponce[i][2]).innerHTML = objResponce[i][3]  
    }
    
}

binanceRequest.send()