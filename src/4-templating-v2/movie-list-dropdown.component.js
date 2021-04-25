// Careful, this code is on purpose not correct.

import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `

<style>
    app-select-item.high-rating {
        background-color: gold;
    }
    
    app-select-item.high-rating.selected {
       text-shadow: 0 0 10px black;
       color: white;
       background-image: repeating-linear-gradient(45deg, black 0%, black 2%, gold 2%, gold 4%, black 4%);
    }
</style>

<app-select>
  <div slot="trigger"></div>
  <div slot="panel"></div>
</app-select>

<template id="item">
  <app-select-item>
    <div class="title"></div>
    <div class="rating"></div>
  </app-select-item>
</template>

<template id="selected-item">
  <img />
</template>
`;

export class MovieListDropdown extends HTMLElement {
  #movieService = new MovieService();

  #panel;
  #trigger;
  #selectedItem;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#panel = this.shadowRoot.querySelector('[slot="panel"]');
    this.#trigger = this.shadowRoot.querySelector('[slot="trigger"]');
  }

  connectedCallback() {
    this.addEventListener('selected', this.onSelect);
    this.#render();
  }

  disconnectedCallback() {
    this.removeEventListener('selected', this.onSelect);
  }

  onSelect = event => {
    this.#selectedItem = event.detail;
    this.#renderTrigger();
  };

  #render() {
    const data = this.#movieService.list();

    this.#panel.innerHTML = '';

    data.forEach(item => {
      const selectItemTemplate = this.shadowRoot.querySelector('#item').content.cloneNode(true);
      const selectItem = selectItemTemplate.querySelector('app-select-item');
      const title = selectItemTemplate.querySelector('.title');
      const rating = selectItemTemplate.querySelector('.rating');

      selectItem.item = item;

      title.innerText = item.title;
      rating.innerText = item.rating;

      if (item.rating > 8) {
        selectItem.classList.add('high-rating');
      }

      this.#panel.appendChild(selectItemTemplate);
    });

    this.#renderTrigger();
  }

  #renderTrigger() {
    if (!this.#selectedItem) {
      this.#trigger.innerText = 'Select Movie';
      return;
    }

    const selectedItemTemplate = this.shadowRoot.querySelector('#selected-item').content.cloneNode(true);
    const img = selectedItemTemplate.querySelector('img');

    img.src = this.#selectedItem.posterImageUrl;

    this.#trigger.innerHTML = '';
    this.#trigger.appendChild(selectedItemTemplate);
  }
}

customElements.define('app-movie-list-dropdown', MovieListDropdown);
