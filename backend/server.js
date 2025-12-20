const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Voilà la réponse du second serveur !");
});

// Ici on met le num du port que l'on veut écouter
// Si ce port est pas dispo ==> on met 'process.env.PORT
server.listen(process.env.PORT || 3000);
