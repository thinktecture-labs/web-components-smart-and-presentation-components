// Careful, this code is on purpose not correct.

import { CdService } from '../0-shared/cd.service.js';

const template = document.createElement('template');
template.innerHTML = `<app-table></app-table>`;

export class CdList extends HTMLElement {
  #cdService = new CdService();

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
    this.#table.data = this.#cdService.list();
    this.#table.config = {
      fields: [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'interpret', name: 'Interpret' },
        {
          type: 'button',
          name: 'Delete',
          callback: item => {
            this.#cdService.delete(item.id);
            this.#render();
          },
        },
      ],
    };
  }
}

customElements.define('app-cd-list', CdList);
