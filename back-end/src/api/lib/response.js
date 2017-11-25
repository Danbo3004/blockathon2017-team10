module.exports = function(req, res, next) {
  res.response = (code, data) => {
    if (typeof code !== 'number') {
      data = code
      code = 200
    }
    switch(code) {
      case 404:
        res.status(code).json({
          message: 'Not found.',
          moreinfo: data
        })
        break
      case 401:
        res.status(code).json({
          message: 'Unauthorized: Request failed because user is not authenticated.',
          moreinfo: data
        })
        break
      case 403:
        res.status(code).json({
          message: 'Forbidden: Request failed because user does not have authorization to access a specific resource.',
          moreinfo: data
        })
        break
      case 400:
        res.status(code).json({
          message: 'Bad Request: The request could not be understood by the server due to malformed syntax. The client should not repeat the request without modifications.',
          moreinfo: data
        })
        break
      case 422:
        res.status(code).json({
          message: 'Unprocessable Entity: Your request was understood, but contained invalid parameters',
          moreinfo: data
        })
        break;
      case 429:
        res.status(code).json({
          message: 'Too Many Requests: You have been rate-limited, retry later',
          moreinfo: data
        })
        break;
      case 500:
        res.status(code).json({
          message: 'Internal Server Error: Something went wrong on the server, check status site and/or report the issue',
          moreinfo: data
        })
        break;
      default:
        if (typeof data !== 'object') data = { data }
        res.status(code).json(data)
    }
  }
  next()
}