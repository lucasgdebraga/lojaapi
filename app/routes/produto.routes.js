const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController.js');
const authMiddleware = require('../middlewares/isAutenticado.js');

router.get('/produto', [authMiddleware.check], produtoController.findAll);

router.post('/produto', [authMiddleware.check], produtoController.store);

router.get('/produto/:id', [authMiddleware.check], produtoController.findOne);

router.put('/produto/:id', [authMiddleware.check], produtoController.update);

router.delete('/produto/:id', [authMiddleware.check], produtoController.delete);

module.exports = router;
