import { MovieService } from '../0-shared/movie.service.js';

const template = document.createElement('template');
template.innerHTML = `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Rating</th>
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
      <a target="_blank">IMDB</a>
      <button>Delete</button>
    </td>
  </tr>
</template>
`;

export class MovieList extends HTMLElement {
  #movieService = new MovieService();

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
    this.render();
  }

  render() {
    const data = this.#movieService.list();

    const htmlRows = data.map(item => {
      const row = this.#rowTemplate.content.cloneNode(true);
      const [ id, rating, title, actionsCell ] = row.querySelectorAll('td');
      const button = actionsCell.querySelector('button');
      const imdbLink = actionsCell.querySelector('a');

      id.innerText = item.id;
      rating.innerText = item.rating > 8 ? `**${item.rating}**` : item.rating;
      title.innerText = item.title;
      imdbLink.href = item.imdbUrl;

      button.addEventListener('click', () => {
        this.#movieService.delete(item.id);
        this.render();
      });

      return row;
    });

    this.#tableBody.innerHTML = '';

    htmlRows.forEach(row => this.#tableBody.appendChild(row));
  }
}

customElements.define('app-movie-list', MovieList);
