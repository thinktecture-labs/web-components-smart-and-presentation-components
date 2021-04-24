// Careful, this code is on purpose not correct.

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
    <div class="subtitle"></div>
  </div>
</template>
`;

export class Dropdown extends HTMLElement {
  #data = [];
  #config = {};

  #rowTemplate;
  #triggerButton;
  #panel;

  #selectedItem;

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

    this.#rowTemplate = this.shadowRoot.querySelector('#table-row');
    this.#triggerButton = this.shadowRoot.querySelector('.trigger');
    this.#panel = this.shadowRoot.querySelector('.panel');
  }

  connectedCallback() {
    this.#render();

    this.#triggerButton.addEventListener('click', () => this.#toggle());
    document.addEventListener('click', this.#forceClose, { capture: true });
  }

  disconnectedCallback() {
    this.#triggerButton.removeEventListener('click');
    document.removeEventListener('click', this.#forceClose);
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
    const { titleKey, subtitleKey } = this.#config;

    if (!titleKey || !subtitleKey) {
      return;
    }

    this.#panel.innerHTML = '';

    this.#data.forEach(item => {
      const rowTemplate = this.#rowTemplate.content.cloneNode(true);
      const row = rowTemplate.querySelector('.row');
      const title = rowTemplate.querySelector('.title');
      const subtitle = rowTemplate.querySelector('.subtitle');

      title.innerText = item[titleKey];
      subtitle.innerText = item[subtitleKey];

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
    this.#triggerButton.innerText = this.#selectedItem ? this.#selectedItem.title : this.getAttribute('select-text') ?? 'Select ...';
  }
}

customElements.define('app-dropdown', Dropdown);
