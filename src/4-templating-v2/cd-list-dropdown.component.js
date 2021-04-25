// Careful, this code is on purpose not correct.

import { CdService } from '../0-shared/cd.service.js';

const template = document.createElement('template');
template.innerHTML = `

<style>
  .title {
    font-weight: bolder;
  }
</style>

<app-select>
  <div slot="trigger"></div>
  <div slot="panel"></div>
</app-select>

<template id="item">
  <app-select-item>
    <div class="title"></div>
    <div class="interpret"></div>
  </app-select-item>
</template>
`;

export class CdListDropdown extends HTMLElement {
  #cdService = new CdService();

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
    const data = this.#cdService.list();

    this.#panel.innerHTML = '';

    data.forEach(item => {
      const selectItemTemplate = this.shadowRoot.querySelector('#item').content.cloneNode(true);
      const selectItem = selectItemTemplate.querySelector('app-select-item');
      const title = selectItemTemplate.querySelector('.title');
      const interpret = selectItemTemplate.querySelector('.interpret');

      selectItem.item = item;

      title.innerText = item.title;
      interpret.innerText = item.interpret;

      this.#panel.appendChild(selectItemTemplate);
    });

    this.#renderTrigger();
  }

  #renderTrigger() {
    this.#trigger.innerText = this.#selectedItem ? this.#selectedItem.title : 'Select CD';
  }
}

customElements.define('app-cd-list-dropdown', CdListDropdown);
