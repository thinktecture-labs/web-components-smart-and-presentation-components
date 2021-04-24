// Careful, this code is on purpose not correct.

import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        position: relative;
    }
    
    .trigger {
        cursor: pointer;
    }

    .panel {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        border: 1px solid black;
        width: 320px;
        z-index: 1;
    }

    .panel.visible {
        display: block;
    }
    
    .row {
        cursor: pointer;
        padding: 0.25rem 1rem;
    }
    
    .row.selected {
        background-color: black;
        color: white;
    }
    
    .panel .row + .row {
        border-top: 1px solid black;
    }
    
    .title {
        font-weight: bolder;
    }
</style>

<div class="trigger"></div>

<div class="panel">
  
</div>

<template id="table-row">
  <div class="row">
    <div class="title"></div>
    <div class="rating"></div>
  </div>
</template>
`;

export class MovieListDropdown extends HTMLElement {
  #movieService = new MovieService();

  #rowTemplate;
  #triggerButton;
  #panel;

  #selectedItem;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#rowTemplate = this.shadowRoot.querySelector('#table-row');
    this.#triggerButton = this.shadowRoot.querySelector('.trigger');
    this.#panel = this.shadowRoot.querySelector('.panel');
  }

  connectedCallback() {
    this.#render();

    this.#triggerButton.addEventListener('click', () => this.#toggle());
    document.addEventListener('click', this.#forceClose);
  }

  disconnectedCallback() {
    this.#triggerButton.removeEventListener('click');
    document.addEventListener('click', this.#forceClose, { capture: true });
  }

  #forceClose = event => {
    if (!this.contains(event.target)) {
      this.#panel.classList.remove('visible');
    }
  };

  #toggle() {
    this.#panel.classList.toggle('visible');
  }

  #render() {
    const data = this.#movieService.list();

    this.#panel.innerHTML = '';

    data.forEach(item => {
      const rowTemplate = this.#rowTemplate.content.cloneNode(true);
      const row = rowTemplate.querySelector('.row');
      const title = rowTemplate.querySelector('.title');
      const rating = rowTemplate.querySelector('.rating');

      title.innerText = item.title;
      rating.innerText = item.rating;

      row.addEventListener('click', event => {
        this.#selectedItem = item;
        this.#render();
        this.#forceClose(event);

        this.dispatchEvent(new CustomEvent('selected', { detail: item }));
      });

      if (item === this.#selectedItem) {
        row.classList.add('selected');
      }

      this.#panel.appendChild(rowTemplate);
    });

    this.#renderTrigger();
  }

  #renderTrigger() {
    this.#triggerButton.innerText = this.#selectedItem ? this.#selectedItem.title : 'Select Movie';
  }
}

customElements.define('app-movie-list-dropdown', MovieListDropdown);
