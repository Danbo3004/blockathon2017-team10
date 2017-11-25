import { RestTransport } from '@meditrak/common/src/transports/RestTransport';

import { configs } from '../config/config-dev';
import sessionStore from 'stores/SessionStore';

export default new RestTransport({
  baseURL: configs.API_URL,
  timeout: 100000,
  session: sessionStore,
});
