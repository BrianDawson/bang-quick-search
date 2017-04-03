class Website {
  constructor (bang, baseUrl, searchUrl) {
    this.bang = bang
    this.baseUrl = baseUrl
    this.searchUrl = searchUrl
  }

  fullUrl () {
    return this.baseUrl + this.searchUrl
  }
}
