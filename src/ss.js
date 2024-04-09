const { spawn } = require('child_process');
const path = require('path');
const pythonExecutablePath = path.join(__dirname, './app');
function startClipboardMonitor(callback) {
  const pythonProcess = spawn(pythonExecutablePath);

  pythonProcess.stdout.on('data', (data) => {
    const clipboardData = data.toString().trim();
    callback(null, clipboardData);
  });

  pythonProcess.stderr.on('data', (data) => {
    callback(new Error(`Python process error: ${data.toString()}`));
  });

  pythonProcess.on('close', (code) => {
    callback(new Error(`Python process exited with code ${code}`));
  });
}
module.exports = { startClipboardMonitor };
