const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getProducts);

router.get('/slow', controller.slow);

router.get('/:product_id/styles', controller.getStyles);

router.get('/:product_id/related', controller.getRelatedProducts);

router.get('/:product_id', controller.getProduct);

module.exports = router;
