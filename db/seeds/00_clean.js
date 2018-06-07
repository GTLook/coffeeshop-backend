exports.seed = function(knex, Promise) {

  const tablesToClean = ['users','shops','products','product_option_size','product_option_milk','product_option_extra','product_with_options','order_ledger', 'order_product', 'user_favorite_shops', 'user_favorite_products'].reverse()

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
