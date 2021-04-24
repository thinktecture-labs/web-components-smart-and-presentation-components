// Careful, this code is on purpose not correct.

import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `<app-dropdown select-text="Select Movie"></app-dropdown>`;

export class MovieListDropdown extends HTMLElement {
  #movieService = new MovieService();

  #dropdown;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#dropdown = this.shadowRoot.querySelector('app-dropdown');
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.#dropdown.data = this.#movieService.list();
    this.#dropdown.config = {
      titleKey: 'title',
      subtitleKey: 'rating',
    };
  }
}

customElements.define('app-movie-list-dropdown', MovieListDropdown);
