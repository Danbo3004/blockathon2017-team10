import { observable, computed, action } from 'mobx';
import { lazyObservable } from 'mobx-utils';

import transport from '@meditrak/common/src/transports';

const urlRoot = '/auth';

class SessionStore {
  @observable
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJwaWxvdCIsInVzZXIiOnsiaWQiOiIxMDIiLCJyb2xlIjoiZW1wbG95ZWUiLCJlbWFpbCI6ImFhcm9uNzRAaG90bWFpbC5jb20iLCJhbGlhcyI6IjE1WUFra0ZJd24iLCJmdWxsX25hbWUiOiJLYXlsZWUgQ29sZSBJSSJ9LCJpYXQiOjE1MTExNTA5NTQsIm5iZiI6MTUxMTE1MDk1NCwiZXhwIjoxNTEyMTUwOTUzfQ.DT2FLyJUMA3UvO1D3twmg-s2x9Uw0uz1Uy0-vvfbvhQ';

  constructor() {}

  @computed
  get isLogged() {
    return this.token && this.token.length;
  }
}

const session = new SessionStore();

export default session;
export { SessionStore };
