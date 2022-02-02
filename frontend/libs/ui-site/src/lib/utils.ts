import JSZipUtils from 'jszip-utils';

export function urlToPromise(url: string) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function getRealPath(url: string) {
  return `${process.env.NX_BASE_PATH ? process.env.NX_BASE_PATH : ''}${url}`;
}
