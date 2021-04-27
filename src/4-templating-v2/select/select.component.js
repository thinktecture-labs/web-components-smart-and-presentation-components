const template = document.createElement('template');
template.innerHTML = `

<app-dropdown>
    <slot slot="trigger" name="trigger"></slot>
    <slot slot="panel" name="panel"></slot>
</app-dropdown>
`;

export class SelectComponent extends HTMLElement {
  #dropdown;
  #selectedItem;
  #itemComponents = [];

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#dropdown = this.shadowRoot.querySelector('app-dropdown');

    const panelSlot = this.shadowRoot.querySelector('slot[name="panel"]');
    panelSlot.addEventListener('slotchange', () => {
      const [ slottedPanel ] = panelSlot.assignedNodes();

      if (!slottedPanel) {
        return;
      }

      this.#itemComponents = slottedPanel.querySelectorAll('app-select-item');

      this.#itemComponents.forEach((node, index) => {
        if (!index) {
          return;
        }

        node.classList.add('border-top');
      })
    });
  }

  connectedCallback() {
    this.addEventListener('select-item-click', this.#onItemClick);
  }

  disconnectedCallback() {
    this.removeEventListener('select-item-click', this.#onItemClick);
  }

  #onItemClick = event => {
    event.stopPropagation();
    event.preventDefault();

    if (this.#selectedItem !== event.detail) {
      this.#selectedItem = event.detail;
      this.#updateSelectedState();
      this.#dispatchOnSelect();
    }

    this.#dropdown.close();
  };

  #dispatchOnSelect() {
    this.dispatchEvent(new CustomEvent('selected', {
      detail: this.#selectedItem,
      cancelable: true,
      bubbles: true,
      composed: true,
    }));
  }

  #updateSelectedState() {
    this.#itemComponents.forEach(component => {
      component.classList.remove('selected');

      if (component.item === this.#selectedItem) {
        component.classList.add('selected');
      }
    })
  }
}

customElements.define('app-select', SelectComponent);
