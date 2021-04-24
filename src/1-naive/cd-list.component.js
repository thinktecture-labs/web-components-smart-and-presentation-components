// Careful, this code is on purpose not correct.

import { CdService } from '../0-shared/cd.service.js';

const template = document.createElement('template');
template.innerHTML = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Interpret</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<template id="table-row">
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>
      <button>Delete</button>
    </td>
  </tr>
</template>
`;

export class CdList extends HTMLElement {
  #cdService = new CdService();

  #rowTemplate;
  #tableBody;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#rowTemplate = this.shadowRoot.querySelector('#table-row');
    this.#tableBody = this.shadowRoot.querySelector('tbody');
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    const data = this.#cdService.list();

    const htmlRows = data.map(item => {
      const row = this.#rowTemplate.content.cloneNode(true);
      const [ id, title, interpret, buttonCell ] = row.querySelectorAll('td');
      const button = buttonCell.querySelector('button');

      id.innerText = item.id;
      title.innerText = item.title;
      interpret.innerText = item.interpret;

      button.addEventListener('click', () => {
        this.#cdService.delete(item.id);
        this.#render();
      });

      return row;
    });

    this.#tableBody.innerHTML = '';

    htmlRows.forEach(row => this.#tableBody.appendChild(row));
  }
}

customElements.define('app-cd-list', CdList);
