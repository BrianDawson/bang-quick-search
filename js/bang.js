var bangDict = {
  amazonBang: '!a',
  googleBang: '!g',
  bingBang: '!b',
  wikipediaBang: '!w',
  youtubeBang: '!yt',
  googleMapsBang: '!gm',
  googleScholarBang: '!gs'
}

chrome.webRequest.onBeforeRequest.addListener(

  function (details) {
    var requestUrl = decodeURI(details.url).replace(' ', '+')

    if (isValidUrl(requestUrl)) {
//      requestUrl = requestUrl.replace(/%21/g, "!");
//      requestUrl = requestUrl.replace(/%20/g, "+");

      switch (true) {
        case hasBang(bangDict['amazonBang']):
          return navigateToAmazon(parseSearchRequest(requestUrl, bangDict['amazonBang']))
        case hasBang(bangDict['googleBang']):
          return navigateToGoogle(parseSearchRequest(requestUrl, bangDict['googleBang']))
        case hasBang(bangDict['bingBang']):
          return navigateToBing(parseSearchRequest(requestUrl, bangDict['bingBang']))
        case hasBang(bangDict['wikipediaBang']):
          return navigateToWikipedia(parseSearchRequest(requestUrl, bangDict['wikipediaBang']))
        case hasBang(bangDict['youtubeBang']):
          return navigateToYoutube(parseSearchRequest(requestUrl, bangDict['youtubeBang']))
        case hasBang(bangDict['googleMapsBang']):
          return navigateToGoogleMaps(parseSearchRequest(requestUrl, bangDict['googleMapsBang']))
        case hasBang(bangDict['googleScholarBang']):
          return navigateToGoogleScholar(parseSearchRequest(requestUrl, bangDict['googleScholarBang']))
        default:
          console.log('no supported bang found')
      }
    }

    function hasBang (bang) {
      console.log(requestUrl.substring(requestUrl.length - (bang.length) - 1))
      if (requestUrl.includes(bang + '+') || requestUrl.includes(bang + '&')) {
        return true
      } else if (requestUrl.slice(-Math.abs(bang.length)) === bang) {
        return true
      } else {
        return false
      }
    }

    function navigateToAmazon (search) {
      if (search === bangDict['amazonBang']) {
        return {redirectUrl: details.url = 'https://www.amazon.com/'}
      } else {
        return {redirectUrl: details.url = 'https://www.amazon.com/s/?field-keywords=' + search}
      }
    }

    function navigateToGoogle (search) {
      if (search === bangDict['googleBang']) {
        return {redirectUrl: details.url = 'https://www.google.com/'}
      } else {
        return {redirectUrl: details.url = 'https://www.google.com/search?q=' + search}
      }
    }

    function navigateToBing (search) {
      if (search === bangDict['bingBang']) {
        return {redirectUrl: details.url = 'https://www.bing.com/'}
      } else {
        return {redirectUrl: details.url = 'https://www.bing.com/search?q=' + search}
      }
    }

    function navigateToWikipedia (search) {
      if (search === bangDict['wikipediaBang']) {
        return {redirectUrl: details.url = 'https://www.wikipedia.org/'}
      } else {
        return {redirectUrl: details.url = 'https://en.wikipedia.org/w/index.php?search=' + search}
      }
    }

    function navigateToYoutube (search) {
      if (search === bangDict['youtubeBang']) {
        return {redirectUrl: details.url = 'https://www.youtube.com/'}
      } else {
        return {redirectUrl: details.url = 'https://www.youtube.com/results?search_query=' + search}
      }
    }

    function navigateToGoogleMaps (search) {
      if (search === bangDict['googleMapsBang']) {
        return {redirectUrl: details.url = 'https://www.google.com/maps/'}
      } else {
        return {redirectUrl: details.url = 'https://www.google.com/maps/search/' + search}
      }
    }

    function navigateToGoogleScholar (search) {
      if (search === bangDict['googleScholarBang']) {
        return {redirectUrl: details.url = 'https://scholar.google.com/'}
      } else {
        return {redirectUrl: details.url = 'https://scholar.google.com/scholar?q=' + search}
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

function isValidUrl (url) {
  for (var key in bangDict) {
    if (url.includes(bangDict[key])) {
      return true
    }
  }
}
