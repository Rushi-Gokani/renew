import { Component } from '@theme/component';
import { debounce } from '@theme/utilities';
import { ThemeEvents } from '@theme/events';

/**
 * A custom element that displays a minimalist product card.
 *
 * @typedef {object} MinimalistRefs
 * @property {HTMLAnchorElement} productCardLink - The product card link element.
 * @property {HTMLImageElement} [productImage] - The product image element.
 * @property {HTMLElement} [quickAdd] - The quick add component.
 *
 * @extends {Component<MinimalistRefs>}
 */
export class MinimalistProductCard extends Component {
  requiredRefs = ['productCardLink'];

  get productPageUrl() {
    return this.refs.productCardLink.href;
  }

  /**
   * Gets the currently selected variant ID from the product card
   * @returns {string | null} The variant ID or null if none selected
   */
  getSelectedVariantId() {
    const checkedInput = /** @type {HTMLInputElement | null} */ (
      this.querySelector('input[type="radio"]:checked[data-variant-id]')
    );

    return checkedInput?.dataset.variantId || null;
  }

  /**
   * Gets the product card link element
   * @returns {HTMLAnchorElement | null} The product card link or null
   */
  getProductCardLink() {
    return this.refs.productCardLink || null;
  }

  #fetchProductPageHandler = () => {
    this.refs.quickAdd?.fetchProductPage(this.productPageUrl);
  };

  connectedCallback() {
    super.connectedCallback();

    const link = this.refs.productCardLink;
    if (!(link instanceof HTMLAnchorElement)) throw new Error('Product card link not found');

    this.#handleQuickAdd();
    this.addEventListener(ThemeEvents.variantUpdate, this.#handleVariantUpdate);
    this.addEventListener(ThemeEvents.variantSelected, this.#handleVariantSelected);
    this.addEventListener('click', this.navigateToProduct);

    // Add hover effects for image zoom
    this.#setupImageZoom();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.navigateToProduct);
  }

  /**
   * Handles the quick add event.
   */
  #handleQuickAdd = () => {
    this.removeEventListener('pointerenter', this.#fetchProductPageHandler);
    this.removeEventListener('focusin', this.#fetchProductPageHandler);

    // Enable quick add on desktop
    this.addEventListener('pointerenter', this.#fetchProductPageHandler);
    this.addEventListener('focusin', this.#fetchProductPageHandler);
  };

  /**
   * Handles the variant selected event.
   * @param {VariantSelectedEvent} event - The variant selected event.
   */
  #handleVariantSelected = (event) => {
    if (event.target !== this.variantPicker) {
      this.variantPicker?.updateSelectedOption(event.detail.resource.id);
    }
  };

  /**
   * Handles the variant update event.
   * Updates price and product URL.
   * @param {VariantUpdateEvent} event - The variant update event.
   */
  #handleVariantUpdate = (event) => {
    // Stop the event from bubbling up to the section
    event.stopPropagation();

    this.updatePrice(event);
    this.#updateProductUrl(event);
    this.refs.quickAdd?.fetchProductPage(this.productPageUrl);

    if (event.target !== this.variantPicker) {
      this.variantPicker?.updateVariantPicker(event.detail.data.html);
    }
  };

  /**
   * Updates the DOM with a new price.
   * @param {VariantUpdateEvent} event - The variant update event.
   */
  updatePrice(event) {
    const priceContainer = this.querySelector('product-price');
    const newPriceElement = event.detail.data.html.querySelector('product-price');

    if (newPriceElement && priceContainer) {
      priceContainer.innerHTML = newPriceElement.innerHTML;
    }
  }

  /**
   * Updates the product URL based on the variant update event.
   * @param {VariantUpdateEvent} event - The variant update event.
   */
  #updateProductUrl(event) {
    const anchorElement = event.detail.data.html?.querySelector('product-card a');

    if (anchorElement instanceof HTMLAnchorElement) {
      if (anchorElement.getAttribute('href')?.trim() === '') return;

      const productUrl = anchorElement.href;
      const { productCardLink } = this.refs;

      productCardLink.href = productUrl;
    }
  }

  /**
   * Sets up image zoom functionality on hover
   */
  #setupImageZoom() {
    const image = this.refs.productImage;
    if (!image) return;

    let zoomTimeout;

    this.addEventListener('mouseenter', () => {
      zoomTimeout = setTimeout(() => {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
      }, 100);
    });

    this.addEventListener('mouseleave', () => {
      clearTimeout(zoomTimeout);
      image.style.transform = 'scale(1)';
    });
  }

  /**
   * Gets all variant inputs.
   * @returns {NodeListOf<HTMLInputElement>} All variant input elements.
   */
  get allVariants() {
    return this.querySelectorAll('input[data-variant-id]');
  }

  /**
   * Gets the variant picker component.
   * @returns {VariantPicker | null} The variant picker component.
   */
  get variantPicker() {
    return this.querySelector('variant-picker-component');
  }

  /**
   * Intercepts the click event on the product card anchor.
   * @param {Event} event
   */
  navigateToProduct = (event) => {
    if (!(event.target instanceof Element)) return;

    // Don't navigate if this product card is marked as no-navigation (e.g., in theme editor)
    if (this.hasAttribute('data-no-navigation')) return;

    const interactiveElement = event.target.closest('button, input, label, select, [tabindex="1"]');

    // If the click was on an interactive element, do nothing.
    if (interactiveElement) {
      return;
    }

    const link = this.refs.productCardLink;
    if (!link.href) return;
    const linkURL = new URL(link.href);

    const targetLink = event.target.closest('a');
    // Let the native navigation handle the click if it was on a link.
    if (!targetLink) {
      window.location.href = linkURL.href;
    }
  };
}

if (!customElements.get('minimalist-product-card')) {
  customElements.define('minimalist-product-card', MinimalistProductCard);
}
