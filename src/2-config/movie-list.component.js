// Careful, this code is on purpose not correct.

import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `<app-table></app-table>`;

export class MovieList extends HTMLElement {
  #movieService = new MovieService();

  #table;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#table = this.shadowRoot.querySelector('app-table');
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.#table.data = this.#movieService.list();
    this.#table.config = {
      fields: [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'rating', name: 'Rating', renderCallback: item => item.rating > 8 ? `**${item.rating}**` : item.rating },
        { key: 'imdbUrl', name: 'IMDB', type: 'link' },
        {
          type: 'button',
          name: 'Delete',
          callback: item => {
            this.#movieService.delete(item.id);
            this.#render();
          },
        },
      ],
    };
  }
}

customElements.define('app-movie-list', MovieList);
