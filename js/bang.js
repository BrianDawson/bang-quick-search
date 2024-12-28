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

function handleBangRedirection() {
  var requestUrl = decodeURI(window.location.href).replace(' ', '+')
  var websiteFound = hasValidBang(requestUrl)
  if (websiteFound) {
    var search = parseSearchRequest(requestUrl)

    window.location.replace('https://www.duckduckgo.com/?q=' + search);
  }
}

handleBangRedirection();
