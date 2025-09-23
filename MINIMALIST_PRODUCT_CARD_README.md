# Minimalist Product Card

A clean, modern product card component for Shopify themes with a minimalist design approach.

## Features

- **Clean Design**: Minimalist layout with focus on essential product information
- **Hover Effects**: Subtle animations including image zoom and card lift
- **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- **Accessibility**: Proper ARIA labels and semantic HTML structure
- **Performance**: Optimized with lazy loading and efficient CSS
- **Customizable**: Flexible styling and layout options

## Components

### 1. JavaScript Component (`assets/minimalist-product-card.js`)
- Handles hover effects and interactions
- Manages variant selection and price updates
- Provides smooth navigation to product pages
- Includes image zoom functionality

### 2. Liquid Template (`snippets/minimalist-product-card.liquid`)
- Renders the complete product card structure
- Includes image, title, brand, price, and add-to-cart button
- Responsive design with mobile-first approach
- Built-in CSS styles with hover animations

### 3. Demo Template (`templates/minimalist-collection-demo.liquid`)
- Example implementation showing how to use the component
- Grid layout for multiple product cards
- Responsive grid that adapts to different screen sizes

## Usage

### Basic Usage

```liquid
{% render 'minimalist-product-card', product: product %}
```

### With Custom Image Aspect Ratio

```liquid
{% render 'minimalist-product-card', product: product, image_aspect_ratio: '4/5' %}
```

### In a Collection Grid

```liquid
<div class="product-grid">
  {% for product in collection.products %}
    <div class="product-grid__item">
      {% render 'minimalist-product-card', product: product %}
    </div>
  {% endfor %}
</div>
```

## Styling

The component includes comprehensive CSS styling with:

- **Card Design**: Clean white background with subtle shadows
- **Typography**: Modern font weights and sizes
- **Spacing**: Consistent padding and margins
- **Colors**: Neutral color palette with accent colors
- **Animations**: Smooth transitions for hover states

### Customization

You can override the default styles by adding custom CSS:

```css
.minimalist-product-card {
  /* Your custom styles */
}

.minimalist-product-card__title {
  /* Custom title styling */
}
```

## Structure

The component consists of:

1. **Image Container**: Displays product image with aspect ratio control
2. **Content Area**: Contains title, brand, price, and actions
3. **Actions**: Add to cart button or sold out state
4. **Responsive Layout**: Adapts to different screen sizes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports CSS Grid and Flexbox
- Progressive enhancement for older browsers

## Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Performance

- Lazy loading for images
- Efficient CSS with minimal reflows
- Optimized JavaScript with event delegation
- Small bundle size

## Demo

Visit the demo page at `/pages/minimalist-collection-demo` to see the component in action.

## Integration

The component is automatically loaded through the `scripts.liquid` file and doesn't require any additional setup for basic usage.

### Block Integration

The minimalist product card is now integrated into the `_product-card.liquid` block, making it available throughout your theme. The block includes:

- **Image Aspect Ratio Control**: Choose from square, portrait, or landscape ratios
- **Border Radius**: Customizable rounded corners (default: 12px)
- **Gap Settings**: Control spacing between product cards

The block schema has been simplified to focus on the essential minimalist design elements while maintaining the clean, modern aesthetic.
