const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getProducts);

router.get('/:product_id', controller.getProduct);

router.get('/:product_id/styles', controller.getStyles);

router.get('/:product_id/related', controller.getRelatedProducts);

module.exports = router;
