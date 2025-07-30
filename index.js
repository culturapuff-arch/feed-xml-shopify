const express = require('express');
const axios = require('axios');
const xmlbuilder = require('xmlbuilder');

const app = express();
const PORT = process.env.PORT || 3000;

const SHOP_ID = '295773-4a'; // ID da loja
const SHOP_DOMAIN = `https://${SHOP_ID}.myshopify.com`;
const PRODUCTS_JSON_URL = `${SHOP_DOMAIN}/products.json`;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(PRODUCTS_JSON_URL);
    const products = response.data.products;

    const feed = xmlbuilder.create('rss', { encoding: 'UTF-8' })
      .att('version', '2.0')
      .ele('channel')
      .ele('title', 'Produtos da Loja Shopify').up()
      .ele('link', SHOP_DOMAIN).up()
      .ele('description', 'Feed XML de produtos da Shopify');

    products.forEach(product => {
      const item = feed.ele('item');
      item.ele('title', product.title);
      item.ele('link', `${SHOP_DOMAIN}/products/${product.handle}`);
      item.ele('description', product.body_html || '');
      item.ele('image_link', product.image?.src || '');
      item.ele('price', product.variants?.[0]?.price || '');
    });

    res.set('Content-Type', 'application/xml');
    res.send(feed.end({ pretty: true }));
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar feed XML');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
