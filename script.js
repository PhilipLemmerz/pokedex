let currentPokemon;
let allPokemons = [];
let pokedex = document.getElementById('pokedex');
let pokedexIndex = document.getElementById('pokedexIndex');
requestPokemon('');


async function requestPokemon(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    /**
     * we call the request function without parameter to fill the index.html
     */
    if (pokemon == '') {
        loadPokemonNamesInArray();
    }
    else {
        openPokemonCard();
    }
}

function loadPokemonNamesInArray() {
    let results = currentPokemon['results'];

    for (let i = 0; i < results.length; i++) {
        pokemonName = results[i]['name'];
        allPokemons.push(pokemonName);
    }
    loadAllPokemonNamesAndPictures();
}

/**
 * load the individual json for each pokemon to get Image and Name
 */
async function loadAllPokemonNamesAndPictures() {
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(url);
        indexPokemon = await response.json();
        insertNamesAndPicturesInIndexHTML(indexPokemon);
    }
}

function insertNamesAndPicturesInIndexHTML(indexPokemon) {
    let pokadexDiv = document.getElementById('pokedexIndex');
    let name = indexPokemon["name"];
    let img = indexPokemon["sprites"]["other"]["dream_world"]["front_default"];
    let card = document.createElement('card');
    /**
     * set the onclick Attribute that open the pokemon detail div
     */
    card.setAttribute('onclick', `requestPokemon('${name}')`);
    card.innerHTML = `
        <h1 id="pokemonNameIndex">${name}</h1>
        <img id="pokemonImgIndex" src="${img}">
        `;
    pokadexDiv.appendChild(card);
    console.log(indexPokemon);
}

function openPokemonCard() {
    showPokemon();
    insertPokemonName();
    insertPokemonTypes();
    insertImg();
    getPokemonData();
    insertStats();
}

function insertPokemonName() {
    document.getElementById('name').textContent = currentPokemon['name'];
}

function insertPokemonTypes() {
    let typesOfPokemon = currentPokemon['types'];
    let htmlDiv = document.getElementById('pokemonTypes');
    htmlDiv.innerHTML = '';
    for (let i = 0; i < typesOfPokemon.length; i++) {
        let indexTypes = typesOfPokemon[i];
        let type = indexTypes['type']['name'];
        htmlDiv.innerHTML += `
            <div id="type">
                ${type} 
            </div>
        `;
    }
}

function insertImg() {
    let imgPokemon = currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
    let imgDiv = document.getElementById('pokemonImg');
    imgDiv.src = imgPokemon;
}

function getPokemonData() {
    let species = currentPokemon['species']['name'];
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    let abilities = currentPokemon['abilities'];
    insertData(species, height, weight, abilities);
}

function insertData(species, height, weight, abilities) {
    document.getElementById('speciesValue').textContent = species;
    document.getElementById('heightValue').textContent = height;
    document.getElementById('weightValue').textContent = weight;
    document.getElementById('abilitiesValue').textContent = '';
    for (i = 0; i < abilities.length; i++) {
        let ability = abilities[i]['ability']['name'];
        document.getElementById('abilitiesValue').textContent += `${ability} `;
    }
}

function insertStats() {
    let stats = currentPokemon['stats'];
    let div = document.getElementById('stats');
    div.innerHTML = '';
    for (i = 0; i < stats.length; i++) {
        let statName = stats[i]['stat']['name'];
        let statValue = stats[i]['base_stat'];
        insertHtmlToStatDiv(statName,statValue, div);        
        changeColorofStatBar(i, statValue);
    }
}

function insertHtmlToStatDiv(statName, statValue, div){
    div.innerHTML += `
            <div class="statItem">
                <p class="statName"> ${statName} </p>
                <p> ${statValue} </p>
                <div class="statBackground">
                    <div id="bar" class="bar" style="width: ${statValue}%;"></div>
                </div>                        
            </div>
        `;    
}

function changeColorofStatBar(index, statValue) {
    let bar = document.getElementsByClassName('bar');

    if (statValue > 60) {
        bar[index].style.backgroundColor = 'green';
    } else if (statValue < 60 && statValue > 45) {
        bar[index].style.backgroundColor = 'orange';
    } else if (statValue < 46) {
        bar[index].style.backgroundColor = 'rgb(243, 54, 54)';
    }
}


/**
 * Menu Pokemon-Card
 */
document.getElementById('liStats').onclick = displayStats;
function displayStats() {
    let about = document.getElementById('dataBox');
    let stats = document.getElementById('stats');
    let linkAbout = document.getElementById('liAbout');
    let linkStats = document.getElementById('liStats');

    if (about) {
        about.style.display = 'none';
        stats.style.display = 'block';
        linkAbout.style.borderBottom = 'solid 2px transparent';
        linkStats.style.borderBottom = 'solid 2px #78d4b1b9'
    }
}

document.getElementById('liAbout').onclick = displayAbout;
function displayAbout() {
    let about = document.getElementById('dataBox');
    let stats = document.getElementById('stats');
    let linkAbout = document.getElementById('liAbout');
    let linkStats = document.getElementById('liStats');

    if (stats) {
        about.style.display = 'block';
        stats.style.display = 'none';
        linkAbout.style.borderBottom = 'solid 2px #78d4b1b9';
        linkStats.style.borderBottom = 'solid 2px transparent'
    }
}

function showPokemon() {
    pokedex.classList.remove('dpNone');
    pokedexIndex.classList.add('dpNone');
}

/**
 * Cross at the top - back to pokemonselection.
 */
document.getElementById('backToSelectSite').addEventListener('click', showPokemonSelection);
function showPokemonSelection() {
    pokedexIndex.classList.remove('dpNone');
    pokedex.classList.add('dpNone');
}


