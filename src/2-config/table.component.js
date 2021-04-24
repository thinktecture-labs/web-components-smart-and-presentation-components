// Careful, this code is on purpose not correct.

const template = document.createElement('template');
template.innerHTML = `<table>
  <thead>
  </thead>
  <tbody>
  </tbody>
</table>
`;

export class Table extends HTMLElement {
  #data = [];
  #config = {};

  #tableHeader;
  #tableBody;

  set data(value) {
    this.#data = value || [];
    this.#render();
  }

  set config(value) {
    this.#config = value || {};
    this.#render();
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#tableHeader = this.shadowRoot.querySelector('thead');
    this.#tableBody = this.shadowRoot.querySelector('tbody');
  }

  #render() {
    const { fields } = this.#config;

    if (!fields) {
      return;
    }

    this.#tableHeader.innerHTML = '';
    this.#tableHeader.appendChild(this.#createHeader(fields));

    this.#tableBody.innerHTML = '';
    this.#data.forEach(item => this.#tableBody.appendChild(this.#createRow(item, fields)));
  }

  #createHeader(fields) {
    const row = document.createElement('tr');

    fields.forEach(field => {
      const column = document.createElement('th');
      column.innerText = field.name;
      row.appendChild(column);
    });

    return row;
  }

  #createRow(item, fields) {
    const row = document.createElement('tr');

    fields.forEach(field => {
      const column = document.createElement('td');

      if (field.type === 'button') {
        const button = document.createElement('button');
        button.innerText = field.name;
        button.addEventListener('click', () => field.callback(item));
        column.appendChild(button);
      } else if (field.type === 'link') {
        const a = document.createElement('a');
        a.target = '_blank';
        a.innerText = field.name;
        a.href = item[field.key];
        column.appendChild(a);
      } else {
        let text = item[field.key];

        if (field.renderCallback) {
          text = field.renderCallback(item);
        }

        column.innerText = text;
      }

      row.appendChild(column);
    });

    return row;
  }
}

customElements.define('app-table', Table);
