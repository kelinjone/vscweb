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
  { command: "vscweb.safari", handler: browse.bind(safari) }
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
  exec('open -a "/Applications/Google Chrome.app" -n --args ' + url);
}

function firefox(url) {
  exec("open -a Firefox " + url);
}

function opera(url) {
  exec("open -a Opera " + url);
}

function safari(url) {
  exec("open -a Safari " + url);
}