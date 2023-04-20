export const CLIPBOARD_DATA_TYPES = [
  "text/plain",
  "text/uri-list",
  "text/csv",
  "text/css",
  "text/html",
  "application/xhtml+xml",
  //"image/png",
  //"image/jpg, image/jpeg",
  //"image/gif",
  "image/svg+xml",
  "application/xml, text/xml",
  "application/javascript",
  "application/json",
  "application/octet-stream",
];

export const formatters: { [key: string]: (content: string) => string } = {
  "application/json": (content: string) => {
    return JSON.stringify(JSON.parse(content), null, 2);
  },
};

export const formatText = (content: string, type: string) => {
  if (!formatters[type]) return content;
  try {
    return formatters[type](content);
  } catch (e) {
    console.warn(e);
    return content;
  }
};
