//Seletores e Vetor com o Cardápio
let cardapio = document.querySelector("#cardapio");
let formCriarPrato = document.querySelector("#inserirPrato");
let listaCardapio = [];

//Atualiza o Cardápio
updateCardapio = () => {
  cardapio.innerHTML = "";
  listaCardapio.forEach((element) => {
    let item = createItem(element);
    cardapio.appendChild(item);
  });
};
createItem = (element) => {
  let h1, h2, p, preco;
  let item = document.createElement("li");

  h1 = document.createElement("h1");
  let text = document.createTextNode(element.prato);
  h1.appendChild(text);
  item.appendChild(h1);

  h2 = document.createElement("h2");
  text = "Ingredientes: " + element.ingredientes;
  text = document.createTextNode(text);
  h2.appendChild(text);
  item.appendChild(h2);

  if(element.descricao != ""){
    p = document.createElement("p");
    text = "Desc.: " + element.descricao;
    text = document.createTextNode(text);
    p.appendChild(text);
    item.appendChild(p);
  }
  
  preco = document.createElement("h3");
  text = "R$ " + element.preco + ".00";
  text = document.createTextNode(text);
  preco.appendChild(text);
  preco.classList.add("preco");
  item.appendChild(preco);

  return item;
};

//Evento criar novo Prato
formCriarPrato.addEventListener("submit", (event) => {
  let prato = document.querySelector("#prato").value;
  let ingredientes = document.querySelector("#ingredientes").value;
  let descricao = document.querySelector("#descricao").value;
  let preco = document.querySelector("#preco").value;
  let object = {};
  object.prato = prato;
  object.descricao = descricao;
  object.ingredientes = ingredientes;
  object.preco = preco;
  listaCardapio.push(object);
  saveOnLocalStorage();
  updateCardapio();
});

//Salva o cardápio na memória
saveOnLocalStorage = () => {
  localStorage.setItem("cardapio", JSON.stringify(listaCardapio));
};

//Lida com o informações salvas na memória
getItemsOnLocalStorage = () => {
  let localStorageData = JSON.parse(localStorage.getItem("cardapio"));
  if (localStorageData != null) {
    localStorageData.forEach((element) => {
      listaCardapio.push(element);
    });
  } else {
    let prato = {
      prato: "Baião de Dois",
      ingredientes: "Arroz, Feijão Verde, Leite, Queijo",
      descricao: "Comida típica Nordestina",
      preco: 10
    };
    let prato2 = {
      prato: "Camarão Alho e Óleo",
      ingredientes: "Camarão, Alho, Óleo",
      descricao: "Camarão frito no alho e óleo",
      preco: 30
    };
    listaCardapio.push(prato);
    listaCardapio.push(prato2);
    localStorage.setItem("cardapio", JSON.stringify(listaCardapio));
  }
};

//Chama o método inicial
getItemsOnLocalStorage();
updateCardapio();

//Efeito Fresquinho
let elementosDoCardapio = document.querySelectorAll("li");
elementosDoCardapio.forEach(element => {
  element.addEventListener("mouseenter", (event) => {
    event.target.childNodes[1].style = "display: flex;";
    event.target.childNodes[2].style = "display: flex;";
    event.target.childNodes[3].style = "display: flex;";
  });
});
elementosDoCardapio.forEach(element => {
  element.addEventListener("mouseleave", (event) => {
    event.target.childNodes[1].style = "display: none;";
    event.target.childNodes[2].style = "display: none;";
    event.target.childNodes[3].style = "display: none;";
  });
});

//Search bar
let userInput = document.querySelector("#search");
userInput.addEventListener("keyup", (event) => {
  console.log(event.target.value);
  filtrarCardapio(event.target.value);
});

//Filtrar Cardápio
filtrarCardapio = (userInput) => {
  userInput = userInput.toUpperCase();
  let pratos = document.querySelectorAll("li");
  pratos.forEach(element => {
    let text = element.textContent.toUpperCase();
    if(text.indexOf(userInput) < "0"){
      element.style = "display: none;";
    } else {
      element.style = "display: flex";
    }
  });
}