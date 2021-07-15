// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api'

// imports
import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';

const MUSIC = {
    audioUrl: './audio/tema-sw.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}

play(MUSIC, document.body);

// EXERCICIO 2
function romanize(number) {
    const OPTIONS = {
        1: 'I  ',
        2: 'II ',
        3: 'III',
        4: 'IV ',
        5: 'V  ',
        6: 'VI '
    }

    return OPTIONS[number];
}

fetch(`${API_ENDPOINT}/films`)
.then(response => response.json())
.then(json => {
    // array of movies sorted by episode (OPCIONAL ${romanize(4)})
    const MOVIES = json.results.sort((i, j) => 
        (i.episode_id > j.episode_id) ? 1 : -1
    );
    console.log(MOVIES)
    const MOVIES_LIST = document.querySelector('#filmes ul');
    for (let movie of MOVIES) {
        console.log(movie);
        const NEW_MOVIE = document.createElement('li');
        NEW_MOVIE.innerHTML = `EPISODE ${romanize(movie.episode_id)} - ${movie.title.toUpperCase()}`;
        // EXERCICIO 3
        NEW_MOVIE.addEventListener('click', event => {
            const INTRODUCTION = document.querySelector('pre.introducao');
            INTRODUCTION.innerHTML = `Episode ${romanize(movie.episode_id).trim()}
            ${movie.title.toUpperCase()}
            
            ${movie.opening_crawl}`;
            restartAnimation(INTRODUCTION);
        });
        MOVIES_LIST.appendChild(NEW_MOVIE);
    }

});