class MKButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["label", "disabled", "icon-before", "icon-after"];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector(".mk-button");

    button.addEventListener("click", (e) => {
      if (this.disabled) {
        e.stopImmediatePropagation();
      }
    });

    button.addEventListener("keydown", (e) => {
      if (!this.disabled && (e.key === "Enter" || e.key === " ")) {
        const onClickFn = this.getAttribute("onclick");

        if (onClickFn) {
          new Function(onClickFn).call(this, e);
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link href="./components/MKButton/MKButton.css" rel="stylesheet" />
        <div class="mk-button" 
              role="button"
              aria-disabled="${this.disabled ? "true" : "false"}"
              aria-label="${this.label}"
              tabindex="${this.disabled ? "-1" : "0"}"
              ${this.disabled ? "disabled" : ""}>
              <div class="mk-button__content">
                <slot name="icon-before" class="icon"></slot>
                <span class="label">${this.label}</span>
                <slot name="icon-after" class="icon"></slot>
            </div>
        </div>
    `;
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  get label() {
    return this.getAttribute("label");
  }
}

customElements.define("mk-button", MKButton);
