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

export function isExternalLink(url: string) {
  const tmp = document.createElement('a');
  tmp.href = url;
  return tmp.host !== window.location.host;
}
export function getRealPath(url: string) {
  if (isExternalLink(url)) return url;
  return `${process.env.NX_BASE_PATH ? process.env.NX_BASE_PATH : ''}${url}`;
}
