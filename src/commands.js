var exec = require("child_process").exec;
var vscode = require("vscode");

module.exports = function commands() {
  return openCommands.map(function (open) {
    return vscode.commands.registerCommand(open.command, open.handler);
  });
}

var openCommands = [
  { command: "vscweb.chrome", handler: browse.bind(chrome) },
  { command: "vscweb.firefox", handler: browse.bind(firefox) },
  { command: "vscweb.opera", handler: browse.bind(opera) },
  { command: "vscweb.safari", handler: browse.bind(safari) },
  { command: "vscweb.edge", handler: browse.bind(edge) }
];

function browse(resource) {
  if (resource) {
    var url, path = resource.path;
    var folders = vscode.workspace.workspaceFolders;
    if (folders) {
      for (var i = 0; i < folders.length; i++) {
        var floder = folders[i], root = floder.uri.path;
        if (path.startsWith(root)) {
          url = path.slice(root.length);
          break;
        }
      }
      if (url && floder.server) {
        this("http://localhost:" + floder.server.address().port + url);
      }
    }
  }
}

function chrome(url) {
  switch (process.platform) {
    case "darwin":
      exec('open -a "/Applications/Google Chrome.app" -n --args ' + url);
      break;
    case "win32":
      exec('start chrome "' + url + '"');
      break;
    case "linux":
      exec('google-chrome ' + url);
      break;
  };
}

function firefox(url) {
  switch (process.platform) {
    case "darwin":
      exec("open -a Firefox " + url);
      break;
    case "win32":
      exec('start firefox "' + url + '"');
      break;
    case "linux":
      exec('firefox ' + url);
      break;
  };
}

function opera(url) {
  switch (process.platform) {
    case "darwin":
      exec("open -a Opera " + url);
      break;
    case "win32":
      exec('start opera "' + url + '"');
      break;
    case "linux":
      exec('opera ' + url);
      break;
  };
}

function safari(url) {
  switch (process.platform) {
    case "darwin":
      exec("open -a Safari " + url);
      break;
    case "win32":
      exec('start safari "' + url + '"');
      break;
  };
}

function edge(url) {
  switch (process.platform) {
    case "win32":
      exec('start microsoft-edge:' + url);
      break;
  };
}