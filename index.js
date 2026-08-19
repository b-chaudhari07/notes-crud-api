import http from "http";

let notes = [];
let nextid = 1;

function getid(pathname) {
  let noteid = -1;
  let params = pathname.split("/");
  for (let i = 0; i < params.length; i++) {
    if (params[i] == "notes" && i != params.length - 1)
      return (noteid = parseInt(params[i + 1], 10));
  }
  return -1;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}${req.url}`);

  const pathname = url.pathname;
  const method = req.method;

  if (method == "POST" && pathname == "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const parsed = JSON.parse(body);

      const newnote = {
        id: nextid,
        text: parsed.text,
      };

      nextid++;
      notes.push(newnote);
      res.writeHead(201, { "content-type": "application/json" });
      res.end(JSON.stringify(newnote));
    });
  } else if (method == "GET" && pathname == "/notes") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(notes));
  } else if (method == "GET") {
    let noteid = getid(pathname);
    if (noteid != -1) {
      const note = notes.find((element) => element.id == noteid);

      if (note != undefined) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(note));
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ status: "Note not found" }));
      }
    }
  } else if (method == "PUT") {
    let noteid = getid(pathname);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newnote = JSON.parse(body);
      const oldnote = notes.find((n) => n.id === noteid);

      if (oldnote) {
        oldnote.text = newnote.text;
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(oldnote));
      } else {
        res.writeHead(404, { "conetent-type": "application/json" });
        res.end(JSON.stringify({ status: "Note not found to edit" }));
      }
    });
  } else if (method == "DELETE") {
    let noteid = getid(pathname);

    const noteindex = notes.findIndex((n) => n.id === noteid);
    if (noteindex != -1) {
      notes.splice(noteindex, 1);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "Note deleted successfully" }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "Note not found to delete" }));
    }
  }
});

server.listen(3000, () => {
  console.log("server is listening on port http://localhost:3000");
});
