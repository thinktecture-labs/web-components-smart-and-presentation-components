// Careful, this code is on purpose not correct.

import { DropdownItem } from '../dropdown/dropdown-item.component.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host-context(.selected) {
        background-color: black;
        color: white;
    }
    
    :host-context(.border-top) {
      border-top: 1px solid black;
    }
</style>
`;

export class SelectItem extends DropdownItem {
  #item;

  get item() {
    return this.#item;
  }

  set item(item) {
    this.#item = item;
  }

  constructor() {
    super();

    this.shadowRoot.append(template.content.cloneNode(true));
  }

  createClickEvent() {
    return new CustomEvent('select-item-click', {
      detail: this.item,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
  }
}

customElements.define('app-select-item', SelectItem);
