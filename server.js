const http = require('http');
const os = require('os');
const PORT = 3000;

// Function to simulate asynchronous operation with random delay
function simulateAsyncOperation() {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 3000; // Random delay up to 3 seconds
    setTimeout(() => {
      resolve();
    }, randomDelay);
  });
}

const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'GET') {

    await simulateAsyncOperation();
    
    const cpuInfo = os.cpus();
    const osInfo = {
      platform: os.platform(),
      release: os.release(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      userInfo: os.userInfo()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ cpuInfo, osInfo }));

} else {

    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');

}
});


server.listen(PORT, () => {
  console.log(`Server is listening on port 127.0.0.1:${PORT}`);
});
