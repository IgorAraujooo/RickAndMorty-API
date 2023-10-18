const urlApi = "https://rickandmortyapi.com/api/character";
const listaPersonagens = document.getElementById('list');
let urlProxima = '';
let urlAnterior = '';

async function buscarPersonagens(url, nome = '') {
    const resposta = await fetch(nome ? `${url}?name=${nome}` : url);
    const dados = await resposta.json();
    urlProxima = dados.info.next;
    urlAnterior = dados.info.prev;
    exibirPersonagens(dados.results);
}

function pesquisarPersonagens(evento) {
    evento.preventDefault();
    const nomePersonagem = document.querySelector('#input').value;
    buscarPersonagens(urlApi, nomePersonagem);
}

function exibirPersonagens(personagens) {
    listaPersonagens.innerHTML = '';

    personagens.forEach(personagem => {
        const statusClass = personagem.status === 'Dead' ? 'morto' : '';

        listaPersonagens.insertAdjacentHTML('beforeend', `
            <div class='card ${statusClass}' onclick="mostrarInfo(this)">
                <div class="card-header">
                    <p class='card-title'>${personagem.name}</p>
                </div>
                <div class="card-img">
                    <img src="${personagem.image}" alt='${personagem.name}'/>
                </div>
                <div class="card-body" style="display: none;">
                    <p><b>Gênero:</b> ${personagem.gender}</p>
                    <p><b>Espécie:</b> ${personagem.species}</p>
                    <p><b>Origem:</b> ${personagem.origin.name}</p>
                </div>
            </div>
        `);
    });
}

function mostrarInfo(card) {
    const cardBody = card.querySelector('.card-body');
    cardBody.style.display = cardBody.style.display === 'none' ? 'block' : 'none';
}

function proximaPagina() {
    buscarPersonagens(urlProxima);
}

function paginaAnterior() {
    buscarPersonagens(urlAnterior);
}

buscarPersonagens(urlApi);
