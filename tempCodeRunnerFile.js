import { log } from "console";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(`request receieved: ${req.method}, ${req.url}`);
  const parseURL= new URL(req.url, `http://${req.headers.host}`);
  let name= parseURL.searchParams.get("name");
  const path= parseURL.pathname;

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello API");
  }
  
  else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a learning project");
  } 
  
  else if (req.method === "POST" && req.url === "/echo") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(`you sended ${body}`);
    });
  } 
  
  else if (req.method === "GET" && req.url === "/favicon.ico") {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("fevicon not inserted yet");
  }
  
  else if (req.method === "GET" && path === "/greet") {

    if(name=="" || name==null) name="stranger";
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({message: `greeting form backend to ${name}`}));
  } 
  
  else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }

});

server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});

console.log(
  "This runs after listen() is called, but doesn't wait for it to finish",
);
