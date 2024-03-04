const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');


router.get('/:id',warehouseController.getProductsByWarehouseId)
router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getAllWarehouses);


module.exports = router;
