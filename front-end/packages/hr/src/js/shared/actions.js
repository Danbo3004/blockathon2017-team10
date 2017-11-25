import transport from '../transports/RestTransport'

export const getSignedPost = (options={}) => {
  let queryString = '?v1';
  if (options.acl) {
    queryString += '&acl=' + options.acl
  }
  return transport.get('/signedS3Url' + queryString)
}

const MIME_TYPES = {
  'application/pdf': 'pdf',
  'application/msword': 'doc'
}

export const mime2ext = (type) => {
  return MIME_TYPES[type] || 'doc'
}
