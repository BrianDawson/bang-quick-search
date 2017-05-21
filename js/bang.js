chrome.webRequest.onBeforeRequest.addListener(

  function (details) {
    var requestUrl = decodeURI(details.url).replace(' ', '+')
    var websiteFound = hasValidBang(requestUrl)
    if (websiteFound) {
      var search = parseSearchRequest(requestUrl)
      // if (search === websiteFound.bang) {
      //   return {redirectUrl: details.url = websiteFound.baseUrl}
      // } else {
      //   return {redirectUrl: details.url = websiteFound.fullUrl() + search}
      // }
      console.log(search)
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
  var searchRequest = url.substring(url.lastIndexOf('q=') + 2)
  searchRequest = searchRequest.substring(0, searchRequest.indexOf('&'))
  searchRequest = searchRequest.toLowerCase()

  /* searchRequest = searchRequest.replace(bang + '+', '')
  searchRequest = searchRequest.replace('+' + bang, '') */

  return searchRequest
}

function hasValidBang (requestUrl) {
  if (/!([a-zA-Z])*\+/.test(requestUrl) || /\+!([a-zA-Z])*\&/.test(requestUrl)) {
    return true
  }
}
