// Careful, this code is on purpose not correct.

import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `

<style>
    app-dropdown-item.high-rating {
        background-color: gold;
    }
    
    app-dropdown-item.high-rating.selected {
       text-shadow: 0 0 10px black;
       color: white;
       background-image: repeating-linear-gradient(45deg, black 0%, black 2%, gold 2%, gold 4%, black 4%);
    }
</style>

<app-dropdown>
  <div slot="trigger"></div>
  <div slot="panel"></div>
</app-dropdown>

<template id="item">
  <app-dropdown-item>
    <div class="title"></div>
    <div class="rating"></div>
  </app-dropdown-item>
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
    this.#render();
  }

  #render() {
    const data = this.#movieService.list();

    this.#panel.innerHTML = '';

    data.forEach(item => {
      const dropdownItemTemplate = this.shadowRoot.querySelector('#item').content.cloneNode(true);
      const dropdownItem = dropdownItemTemplate.querySelector('app-dropdown-item');
      const title = dropdownItemTemplate.querySelector('.title');
      const rating = dropdownItemTemplate.querySelector('.rating');

      title.innerText = item.title;
      rating.innerText = item.rating;

      dropdownItem.addEventListener('dropdown-item-click', () => {
        this.#selectedItem = item;
        this.#render();
      });

      if (this.#selectedItem === item) {
        dropdownItem.classList.add('selected');
      }

      if (item.rating > 8) {
        dropdownItem.classList.add('high-rating');
      }

      this.#panel.appendChild(dropdownItemTemplate);
    });

    if (this.#selectedItem) {
      const selectedItemTemplate = this.shadowRoot.querySelector('#selected-item').content.cloneNode(true);
      const img = selectedItemTemplate.querySelector('img');

      img.src = this.#selectedItem.posterImageUrl;

      this.#trigger.innerHTML = '';
      this.#trigger.appendChild(selectedItemTemplate);
    } else {
      this.#trigger.innerText = 'Select Movie';
    }
  }
}

customElements.define('app-movie-list-dropdown', MovieListDropdown);
