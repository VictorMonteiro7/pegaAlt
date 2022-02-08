"use strict";

function pegaAlt() {
  let areaImagens = document.querySelector('[role="presentation"]');
  let liBase = areaImagens.querySelector(".vi798 li");
  let numero;
  if (liBase) {
    numero = +liBase.style.transform.split(/[()px]/)[1];
  } else {
    numero = 480;
  }
  const numeroTotal = Math.round(numero / 480);
  let textos = [];
  let imagens = [];
  let titulo;
  for (let i = 0; i < numeroTotal; i++) {
    let imagem = areaImagens.querySelectorAll(".KL4Bh img");
    imagens.push(imagem[i]);
    if (imagem[i].alt) {
      textos.push(imagem[i].alt.split("says")[1]);
    }
    const btn = document.querySelector("._6CZji");
    next(btn);
  }
  let url = `URL: ${window.location.href}\n\n`;
  let descricao =
    "\n\n\nLegenda:\n\n\n " + document.querySelector(".C4VMK > span").innerText;
  let textoCompleto = url + textos.join("\n\n") + descricao;
  if (textos[0]) {
    titulo = textos[0].split(" ");
    download(`${titulo[2] + titulo[3] + titulo[4]}.txt`, textoCompleto);
  } else {
    download(`titulo.txt`, textoCompleto);
  }
  textos = [];
  imagens = [];

  function next(n) {
    if (n) {
      n.click();
    }
  }

  function download(filename, text) {
    const pom = document.createElement("a");
    pom.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    pom.setAttribute("download", filename);

    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  }
}
function setarFuncoes(name, functionName) {
  chrome.storage.sync.set({ [name]: functionName });
}

setarFuncoes("pegaAlt", pegaAlt);
