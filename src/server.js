var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var parse = url.parse;
var extname = path.extname;

module.exports = function server(root, port) {
  return http.createServer(service)
    .on("listening", function () {
      console.log("Web Server open at http://localhost:" + this.address().port + "/");
    })
    .on("close", function() {
      console.log("Web Server close at http://localhost:" + this.address().port + "/")
    })
    .on("error", function (error) {
      console.log(error);
    })
    .listen(port | 0);

  function service(request, response) {
    try {
      var url = parse(request.url);
      var path = root + url.pathname;
      var stat = fs.statSync(path);
      if (stat.isDirectory()) {
        path += "index.html";
      }

      var ext = extname(path);
      var contentType = mimes[ext] || "text/plain";

      response.setHeader("Content-Type", contentType+"; charset=utf-8");

      fs.createReadStream(path, { flags: "r" })
        .on("error", notfound)
        .pipe(response);
    }
    catch (error) {
      notfound(error);
    }

    function notfound(error) {
      response.statusCode = "404";
      response.end(error.message);
    }
  }
}

var mimes = {
  ".aac": "audio/aac",
  ".abw": "application/x-abiword",
  ".arc": "application/octet-stream",
  ".avi": "video/x-msvideo",
  ".azw": "application/vnd.amazon.ebook",
  ".bin": "application/octet-stream",
  ".bz": "application/x-bzip",
  ".bz2": "application/x-bzip2",
  ".csh": "application/x-csh",
  ".css": "text/css",
  ".csv": "text/csv",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".eot": "application/vnd.ms-fontobject",
  ".epub": "application/epub+zip",
  ".es": "application/ecmascript",
  ".gif": "image/gif",
  ".htm": "text/html",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".ics": "text/calendar",
  ".jar": "application/java-archive",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mpeg": "video/mpeg",
  ".mpkg": "application/vnd.apple.installer+xml",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".oga": "audio/ogg",
  ".ogv": "video/ogg",
  ".ogx": "application/ogg",
  ".otf": "font/otf",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".rar": "application/x-rar-compressed",
  ".rtf": "application/rtf",
  ".sh": "application/x-sh",
  ".svg": "image/svg+xml",
  ".swf": "application/x-shockwave-flash",
  ".tar": "application/x-tar",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".ts": "application/typescript",
  ".ttf": "font/ttf",
  ".vsd": "application/vnd.visio",
  ".wav": "audio/x-wav",
  ".weba": "audio/webm",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xhtml": "application/xhtml+xml",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xml": "application/xml",
  ".xul": "application/vnd.mozilla.xul+xml",
  ".zip": "application/zip",
  ".7z": "application/x-7z-compressed"
}