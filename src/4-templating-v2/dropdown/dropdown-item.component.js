// Careful, this code is on purpose not correct.

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        cursor: pointer;
        padding: 0.25rem 1rem;
    }
</style>

<slot></slot>
`;

export class DropdownItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
  }

  #dispatchEventOnClick = () => {
    this.dispatchEvent(this.createClickEvent());
  }

  createClickEvent() {
    return new CustomEvent('dropdown-item-click', { bubbles: true, composed: true, cancelable: true });
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.#dispatchEventOnClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.#dispatchEventOnClick);
  }
}

customElements.define('app-dropdown-item', DropdownItem);
