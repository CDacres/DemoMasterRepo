import axios from 'axios';
import { saveAs } from 'file-saver';

export const downloadOriginal = (url: string, name: Ref, auth: string) => {
  axios({
    responseType: 'blob',
    headers: {
      Authorization: `bearer ${auth}`,
    },
    method: 'GET',
    url: url,
    validateStatus: () => true,
  }).then(response => {
    const newFile = new File([response.data], `${name}.jpg`, { type: 'image/jpeg' });
    saveAs(newFile, newFile.name);
  }).catch(error => {
    throw new Error(error);
  });
};
