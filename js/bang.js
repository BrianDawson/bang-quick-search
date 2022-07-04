chrome.webRequest.onBeforeRequest.addListener(

  function (details) {
    var requestUrl = decodeURI(details.url).replace(' ', '+')
    var websiteFound = hasValidBang(requestUrl)
    if (websiteFound) {
      var search = parseSearchRequest(requestUrl)

      return {redirectUrl: details.url = 'https://www.duckduckgo.com/?q=' + search
      }
    }
  },
  // Applies to following url patterns
  {urls: ['*://*.google.com/*', '*://*.bing.com/*']},
  // In request blocking mode
  ['blocking']
)

function parseSearchRequest (url) {
  var searchRequest = url.substring(url.indexOf('q=') + 2)
  searchRequest = searchRequest.substring(0, searchRequest.indexOf('&'))
  searchRequest = searchRequest.toLowerCase()

  return searchRequest
}

function hasValidBang (requestUrl) {
  if (/!([a-zA-Z]){1,}\+/.test(requestUrl) || /!([a-zA-Z]){1,}&/.test(requestUrl)) {
    return true
  }
}
