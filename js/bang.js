// var bangDict = {
//   amazonBang: '!a',
//   googleBang: '!g',
//   bingBang: '!b',
//   wikipediaBang: '!w',
//   youtubeBang: '!yt',
//   googleMapsBang: '!gm',
//   googleScholarBang: '!gs'
// }

chrome.webRequest.onBeforeRequest.addListener(

  function (details) {
    var requestUrl = decodeURI(details.url).replace(' ', '+')
    var websiteFound = hasValidBang(requestUrl)
    if (websiteFound) {
      var search = parseSearchRequest(requestUrl, websiteFound.bang)
      if (search === websiteFound.bang) {
        return {redirectUrl: details.url = websiteFound.baseUrl}
      } else {
        return {redirectUrl: details.url = websiteFound.fullUrl() + search}
      }
    }
  },
  // Applies to following url patterns
  {urls: ['*://*.google.com/*', '*://*.bing.com/*']},
  // In request blocking mode
  ['blocking']
)

function parseSearchRequest (url, bang) {
  var searchRequest = url.substring(url.lastIndexOf('q=') + 2)
  searchRequest = searchRequest.substring(0, searchRequest.indexOf('&'))
  searchRequest = searchRequest.toLowerCase()

  searchRequest = searchRequest.replace(bang + '+', '')
  searchRequest = searchRequest.replace('+' + bang, '')

  return searchRequest
}

function hasValidBang (requestUrl) {
  for (var i in websites) {
    if (requestUrl.includes(websites[i].bang + '+') || requestUrl.includes(websites[i].bang + '&')) {
      return websites[i]
    } else if (requestUrl.slice(-Math.abs(websites[i].bang.length)) === websites[i].bang) {
      return websites[i]
    }
  }
}
