import cheerio from 'cheerio';

export function parseProduct(html, url) {
const $ = cheerio.load(html);

const title = $('h1.product-name, .itemName, .item-title').first().text().trim() || null;
const price =
$('span.price, .itemPrice, .price-value').first().text().trim() || null;
const description =
$('div.description, #description, .item-desc').first().text().trim() || null;
const imageUrl =
$('img.main-image, .item-image img, #mainImage').first().attr('src') || null;
const category =
$('nav.breadcrumb a').last().text().trim() || null;

return {
title,
url,
price,
description,
imageUrl,
category
};
}