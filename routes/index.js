const express = require('express');

const accountRouter = require('./account.router');
const brandRouter = require('./brand.router');
const categoriesRouter = require('./categories.router');
const colorRouter = require('./color.router');
const customerRouter = require('./customers.router');
const orderRouter = require('./orders.router');
const paymentRouter = require('./payment.router');
const paymethodRouter = require('./paymethod.router');
const productsRouter = require('./products.router');
const sizeRouter = require('./size.router');
const subcategoryRouter = require('./subcategory.router');
const usersRouter = require('./users.router');
const stateRouter = require('./state.router');
const authRouter = require('./auth.router');
const entryRouter = require('./entry.router');
const costRouter = require('./cost.router');
const investmentRouter = require('./investment.router');
const investmentAccountHistoryRouter = require('./investment-accountHistory.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/accounts', accountRouter);
  router.use('/brands', brandRouter);
  router.use('/categories', categoriesRouter);
  router.use('/colors', colorRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
  router.use('/payments', paymentRouter);
  router.use('/paymethods', paymethodRouter);
  router.use('/products', productsRouter);
  router.use('/sizes', sizeRouter);
  router.use('/subcategories', subcategoryRouter);
  router.use('/users', usersRouter);
  router.use('/states', stateRouter);
  router.use('/auth', authRouter);
  router.use('/entry', entryRouter);
  router.use('/cost', costRouter);
  router.use('/investment', investmentRouter);
  router.use('/investmentAccountHistory', investmentAccountHistoryRouter);
}

module.exports = routerApi;
