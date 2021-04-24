// Careful, this code is on purpose not correct.

import { CdService } from '../0-shared/cd.service.js';

const template = document.createElement('template');
template.innerHTML = `

<style>
  .title {
    font-weight: bolder;
  }
</style>

<app-dropdown>
  <div slot="trigger"></div>
  <div slot="panel"></div>
</app-dropdown>

<template id="item">
  <app-dropdown-item>
    <div class="title"></div>
    <div class="interpret"></div>
  </app-dropdown-item>
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
    this.#render();
  }

  #render() {
    const data = this.#cdService.list();

    this.#panel.innerHTML = '';

    data.forEach(item => {
      const dropdownItemTemplate = this.shadowRoot.querySelector('#item').content.cloneNode(true);
      const dropdownItem = dropdownItemTemplate.querySelector('app-dropdown-item');
      const title = dropdownItemTemplate.querySelector('.title');
      const interpret = dropdownItemTemplate.querySelector('.interpret');

      title.innerText = item.title;
      interpret.innerText = item.interpret;

      dropdownItem.addEventListener('dropdown-item-click', () => {
        this.#selectedItem = item;
        this.#render();
      });

      if (this.#selectedItem === item) {
        dropdownItem.classList.add('selected');
      }

      this.#panel.appendChild(dropdownItemTemplate);
    });

    this.#trigger.innerText = this.#selectedItem ? this.#selectedItem.title : 'Select CD';
  }
}

customElements.define('app-cd-list-dropdown', CdListDropdown);
