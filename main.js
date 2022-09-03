var express = require("express");
var prompt = require("prompt-sync")();
const fs = require("fs");
var clc = require("cli-color");

//cores dos alertas no termnal
const { red, bgBlack, bgYellow } = require("cli-color");
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

//Servidor
var app = express();

//Definir a porta do servidor
var PORT = prompt(notice("DEFINA A PORTA DO SERVIDOR (Ex:8080): "));
app.use(express.json());

//Função de verificação de existencia de arquivos
const checkFileExists = async (file) => {
  try {
    await fs.promises.access(file, fs.constants.F_OK);
    return true;
  } catch (e) {
    fs.writeFile(file, JSON.stringify({}), function (erro) {
      if (erro) {
        throw erro;
      }
    });
    return false;
  }
};

//verificar se o arduivo arduino.json existe
checkFileExists("./arduino.json");

//requisição da páguina de teste
app.get("/Test", (req, res) => {
  res.send("OK");
  const type = req.query.type;
  if (type == undefined) {
    const type = "web";
    console.log(
      clc.bgYellow(clc.white("Aviso:")) +
        " => " +
        clc.cyan("tipo de requisição: " + type) +
        " => " +
        clc.bgGreen(clc.white("Sucesso!")) +
        "\n"
    );
  } else {
    console.log(
      clc.bgYellow(clc.white("Aviso:")) +
        " => " +
        clc.cyan("tipo de requisição: " + type) +
        " => " +
        clc.bgGreen(clc.white("Sucesso!")) +
        "\n"
    );
  }
});

//definir as chaves e valores do arquivos arduino.json
app.get("/setLights", (req, res) => {
  const switchs = req.query;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(switchs));
  const data = switchs;
  fs.writeFile("./arduino.json", JSON.stringify(data), function (erro) {
    if (erro) {
      throw erro;
    }
    console.log(
      clc.bgYellow(clc.white("Aviso:")) +
        " => " +
        clc.cyan(
          "Tipo de requisição => " +
            clc.bgYellow(clc.white("Criar/Alterar arquivos"))
        ) +
        " => " +
        clc.magenta("arduino.json") +
        " => " +
        clc.bgGreen(clc.white("Sucesso!")) +
        "\n"
    );
  });
});

//responder com os dados do arquivo arduino.json
app.get("/getLights", (req, res) => {
  var jsonData = fs.readFileSync("./arduino.json", "utf8");
  console.log(
    clc.bgYellow(clc.white("Aviso:")) +
      " => " +
      clc.cyan(
        "Tipo de requisição => " +
          clc.bgYellow(clc.white("Leitura de arduivos"))
      ) +
      " => " +
      clc.magenta("arduino.json") +
      " => " +
      clc.bgGreen(clc.white("Sucesso!")) +
      "\n"
  );
  res.send(jsonData);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(
    clc.yellow("----------------------------------------------------")
  );
  console.log(
    clc.bgMagenta(clc.white("Servidor status") + " => ") +
      clc.bgGreen(clc.white("OK"))
  );
  console.log(
    clc.bgMagenta(clc.white("Porta") + " => ") + clc.bgGreen(clc.white(PORT))
  );
  console.log('\n')

  console.log(
    clc.yellow("----------------------------------------------------")
  );



  console.log("\n\n");
});
