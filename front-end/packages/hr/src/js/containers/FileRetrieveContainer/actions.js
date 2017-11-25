import transport from 'shared/transport';

export const postToContract = data => transport.post('contract/retrieve', data);
