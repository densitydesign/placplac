export const url = `/api`;
export const DOC_URL = `${process.env.NX_DOC_URL}`;
export const MAX_FILE_SIZE = parseInt(
  process.env.NX_MAX_FILE_SIZE ? process.env.NX_MAX_FILE_SIZE : '0'
);
