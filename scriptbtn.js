const btn = document.querySelector("#req");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pegaAlt,
  });
});
const btn2 = document.querySelector("#teste2");
btn2.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: selecionaArea,
  });
});

function selecionaArea() {
  let i = chrome.storage.sync.get((data) => {
    let arroba = document.querySelector(".XBGH5 h2").innerText;
    let existe = data.arroba.findIndex((e) => e.nome === arroba);
    if (existe >= 0) {
      i = data.arroba[existe].qntItem | 0;
      console.log("valor de I foi inserido", i);
    } else {
      i = 0;
      console.log(data);
      chrome.storage.sync.set(
        {
          arroba: [
            ...data.arroba,
            {
              nome: arroba,
              qntItem: i,
            },
          ],
        },
        () => console.log("criou  mais um arroba")
      );
    }
    let pegouAlt;
    let confirmacao;
    let qnt = 0;
    let imagens = document.querySelectorAll(
      '.eLAPa .KL4Bh img[style*="cover"]'
    );
    console.log(imagens);
    if (i < imagens.length) {
      ++qnt;
      if (qnt === 1) {
        imagens[i].click();
        let link;
        let temporizador;
        temporizador = setInterval(() => {
          link = document.querySelector("a.c-Yi7");
          if (link) {
            clearInterval(temporizador);
            link.click();
            let intervaloLink;
            intervaloLink = setTimeout(() => {
              pegouAlt = pegaAlt();
              clearTimeout(intervaloLink);
              if (pegouAlt) {
                confirmacao = confirm("Quer continuar?");
                if (confirmacao === false) {
                  i = imagens.length;
                  qnt = 0;
                } else {
                  i++;
                  let indexArroba = data.arroba.findIndex(
                    (element) => element.nome === arroba
                  );
                  if (data.arroba[indexArroba].nome === arroba) {
                    chrome.storage.sync.set({
                      arroba: [
                        {
                          nome: arroba,
                          qntItem: i,
                        },
                      ],
                    });
                  }
                  selecionaArea();
                }
              }
            }, 3000);
          }
        }, 1000);
      }
    }
    function pegaAlt() {
      let areaImagens = document.querySelector('[role="presentation"]');
      let liBase = areaImagens.querySelector(".vi798 li");
      let numero;
      let iniciou = false;
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
        if (!!imagem[i] && imagem[i].alt) {
          textos.push(imagem[i].alt.split("says")[1]);
        } else {
          textos.push("Provavelmente é um vídeo ou não contém alt");
        }
        const btn = document.querySelector("._6CZji");
        next(btn);
      }
      let url = `URL: ${window.location.href}\n\n`;
      let descricao =
        "\n\n\nLegenda:\n\n\n " +
        document.querySelector(".C4VMK > span").innerText;
      let textoCompleto = url + textos.join("\n\n") + descricao;
      if (textos[0]) {
        titulo = textos[0].split(" ");
        download(`${titulo[2] + titulo[3] + titulo[4]}.txt`, textoCompleto);
        return true;
      } else {
        download(`titulo.txt`, textoCompleto);
        return true;
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
          window.history.back();
          window.history.back();
        } else {
          pom.click();
        }
      }
    }
  });
}

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
