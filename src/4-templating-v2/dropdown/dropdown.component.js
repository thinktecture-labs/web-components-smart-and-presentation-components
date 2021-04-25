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
</style>

<div class="trigger">
  <slot name="trigger"></slot>
</div>

<div class="panel">
  <slot name="panel"></slot>
</div>
`;

export class Dropdown extends HTMLElement {
  #trigger;
  #panel;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#trigger = this.shadowRoot.querySelector('.trigger');
    this.#panel = this.shadowRoot.querySelector('.panel');

    const panelSlot = this.#panel.querySelector('slot');
    panelSlot.addEventListener('slotchange', () => {
      const [ slottedPanel ] = panelSlot.assignedNodes();

      if (!slottedPanel) {
        return;
      }

      const nodes = slottedPanel.querySelectorAll('app-dropdown-item');

      nodes.forEach((node, index) => {
        if (!index) {
          return;
        }

        node.classList.add('border-top');
      });
    });
  }

  connectedCallback() {
    this.#trigger.addEventListener('click', () => this.#toggle());
    this.addEventListener('dropdown-item-click', this.#closeOnItemClick);

    document.addEventListener('click', this.#closeOnOutsideClick);
  }

  disconnectedCallback() {
    this.#trigger.removeEventListener('click');
    this.removeEventListener('dropdown-item-click', this.#closeOnItemClick);
    document.removeEventListener('click', this.#closeOnOutsideClick);
  }

  #closeOnOutsideClick = event => {
    if (event.path.indexOf(this) === -1) {
      this.close();
    }
  };

  #closeOnItemClick = () => this.close();

  close() {
    this.#panel.classList.remove('visible');
  }

  #toggle() {
    this.#panel.classList.toggle('visible');
  }
}

customElements.define('app-dropdown', Dropdown);
