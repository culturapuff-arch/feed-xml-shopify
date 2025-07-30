products.forEach(product => {
  const variant = product.variants?.[0];

  // Ignora produtos incompletos
  if (!variant || !variant.price || !product.image?.src) return;

  const item = feed.ele('item');
  item.ele('id', product.id);
  item.ele('title', product.title || '');
  item.ele('link', `${SHOP_DOMAIN}/products/${product.handle}`);
  item.ele('description').dat(product.body_html || '');
  item.ele('guid', String(product.id));
  item.ele('pubDate', new Date(product.published_at).toUTCString());
  item.ele('price', `${variant.price} BRL`);
  item.ele('image_link', product.image.src);
  item.ele('availability', variant.available ? 'in stock' : 'out of stock');
  item.ele('condition', 'new');
});

