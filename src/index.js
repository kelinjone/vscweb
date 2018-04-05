var vscode = require("vscode");
var server = require("./server.js");
var commands = require("./commands.js");

var workspace = vscode.workspace;

exports.activate = function activate(context) {
  console.log("activate");

  openWebFolders(workspace.workspaceFolders);   // 为每个工作区的项目创建 Web Server

  workspace.onDidChangeWorkspaceFolders(function (event) {
    closeWebFolders(event.removed);
    openWebFolders(event.added);
  });

  var disposes = commands();
  context.subscriptions.push(...disposes);
}

exports.deactivate = function deactivate(context) {
  closeWebFolders(workspace.workspaceFolders);
  console.log("deactivate");
}

function openWebFolders(folders) {
  if (folders)
    for (var i = 0; i < folders.length; i++) {
      var folder = folders[i];
      folder.server = server(folder.uri.fsPath);
    }
}

function closeWebFolders(folders) {
  if (folders)
    for (var i = 0; i < folders.length; i++) {
      var folder = folders[i];
      if (folder.server) {
        folder.server.close();
      }
    }
}