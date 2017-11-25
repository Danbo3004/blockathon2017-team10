import axios from 'axios';
/**
 * Rest API Transporter using Axios
 * @param config  axios config https://github.com/axios/axios
 *                This config also contain `session` (SessionStore instance)
 *                    for which request need authenticating.
 */
class RestTransport {
  client = null;

  constructor(config = {}) {
    this.client = axios.create(config || {
      timeout: 100000,
    });

    if (config.session && config.session.token.length) {
      this.client.interceptors.request.use((currentConfig) => {
        currentConfig.headers.SToken = `Bearer ${config.session.token}`;
        return currentConfig;
      });
    }

    this.client.interceptors.response.use(
      response => response,
      (error) => {
        // Log error to console before reject with status code differ than 200 and 400
        if (error.response.status !== 400) {
          console.error(error.response.data);
          console.error(error.response.status);
        }

        if (error.response.status === 403 && config.session && config.session.logout) {
          config.session.logout();
        }

        return Promise.reject(error);
      },
    );
  }

  fetch(url) {
    return this.client.get(url);
  }

  create(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  post(url, data, config = {}) {
    return this.client.post(url, data, config);
  }

  get(url) {
    return this.fetch(url);
  }

  update(url, data, config = {}) {
    return this.client.put(url, data, config);
  }

  delete(url) {
    return this.client.delete(url);
  }

  rootUrl() {
    return this.client.defaults.baseURL;
  }

  uploadFile(
    file,
    uploadUrl,
    config = {
      headers: {
        'Content-Type': file.type,
      },
      timeout: 100000,
    },
  ) {
    return axios.put(uploadUrl, file, config);
  }

  getFile(fullUrl) {
    return axios.get(fullUrl);
  }
}

const restTransport = new RestTransport();

export { RestTransport };
export default restTransport;
