const { onRequest } = require("firebase-functions/v2/https");
const { createServer } = require("next");
const { parse } = require("url");

const nextApp = createServer({
  conf: { distDir: ".next" },
});

exports.nextServer = onRequest(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();
  handle(req, res, parsedUrl);
});