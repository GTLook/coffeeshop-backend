exports.seed = function(knex, Promise) {

  const tablesToClean = ['users','shops','products','product_option_size','product_option_milk','product_option_extra','product_with_options','order_ledger', 'order_product', 'user_shop_favorites', 'user_product_favorites'].reverse()

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
