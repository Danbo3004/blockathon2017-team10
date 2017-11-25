import transport from 'shared/transport';

export const requestLink = fileType => transport.get(`upload/uploadUrl?fileType=${fileType}`);
export const uploadImage = (file, uploadUrl) => transport.uploadFile(file, uploadUrl);
export const postToContract = data => transport.post('contract/store', data);
