produtos.forEach(produto => {
  const variante = produto.variantes?.[0];

  // Ignora produtos incompletos
  if (!variante || !variante.preco || !produto.imagem?.fonte) return;

  const item = alimentador.ele('item');
  item.ele('id', produto.id);
  item.ele('title', produto.titulo || '');
  item.ele('link', `${DOMINIO_DA_LOJA}/produtos/${produto.lidar}`);
  item.ele('description').dat(produto.corpo_html || '');
  item.ele('guid', String(produto.id));
  item.ele('pubDate', new Date(produto.publicado_em).toUTCString());
  item.ele('price', `${variante.preco} BRL`);
  item.ele('image_link', produto.imagem.fonte);
  item.ele('availability', variante.disponível ? 'in stock' : 'out of stock');
  item.ele('condition', 'new');
});
