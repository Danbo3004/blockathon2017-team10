const qpm = require('query-params-mongo')

// In case we need some setting for query-params-mongo
const processQuery = qpm({})

module.exports = (query) => {
  const page = parseInt(query.__page, 10);
  const limit = parseInt(query.__limit, 10);
  // use offset and limit for pagination long list
  const pageOffset = (!isNaN(page) && !isNaN(limit)) ? {
    offset: (page - 1) * limit,
    limit,
  } : {}
  // create mongodb query base on req.query
  const mongoQuery = processQuery(query)
  // console.log (mongoQuery)
  return Object.assign({}, mongoQuery, pageOffset)
}