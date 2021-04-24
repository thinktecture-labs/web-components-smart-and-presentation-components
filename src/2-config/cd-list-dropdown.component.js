// Careful, this code is on purpose not correct.

import { CdService } from '../0-shared/cd.service.js';

const template = document.createElement('template');
template.innerHTML = `<app-dropdown select-text="Select CD"></app-dropdown>`;

export class CdListDropdown extends HTMLElement {
  #cdService = new CdService();

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
    this.#dropdown.data = this.#cdService.list();
    this.#dropdown.config = {
      titleKey: 'title',
      subtitleKey: 'interpret',
    };
  }
}

customElements.define('app-cd-list-dropdown', CdListDropdown);
