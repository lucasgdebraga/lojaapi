const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/produto/novoProduto.js');
const validacao = ajv.compile(schema);
const schemaUpdate = require('../schemas/produto/atualizaProduto.js');
const validacaoUpdate = ajv.compile(schemaUpdate);
const models = require('../models');
const produto = models.produto;


exports.findAll = (request, response) => {
  produto.findAll()
    .then((data) => {
      return response.status(200).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.findOne = (request, response) => {
  let id = request.params.id;
  produto.findByPk(id)
    .then((data) => {
      if (data) {
        return response.status(200).json(data);
      } else {
        return response.status(404).json({
          message: 'Produto nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.store = (request, response) => {
  let validacoes = validacao(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacao.errors[0].message,
    });
  }
  produto.create(request.body)
    .then((data) => {
      return response.status(201).json(data);
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server' + erro.message,
      });
    });
};

exports.update = (request, response) => {
  let id = request.params.id;
  let validacoes = validacaoUpdate(request.body);
  if (!validacoes) {
    return response.status(400).json({
      message: validacaoUpdate.errors[0].message,
    });
  }
  produto.findByPk(id)
    .then((data) => {
      if (data) {
        produto.update(request.body, { where: { id: id } }).then((result) => {
          if (result) {
            produto.findByPk(id).then((resultSearch) => {
              return response.status(200).json(resultSearch);
            });
          }
        });
      } else {
        return response.status(404).json({
          message: 'Produto nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};

exports.delete = (request, response) => {
  let id = request.params.id;
  produto.findByPk(id)
    .then((data) => {
      if (data) {
        data.destroy();
        return response.status(200).json({
          message: 'Produto excluido com sucesso',
        });
      } else {
        return response.status(404).json({
          message: 'Produto nao encontrado',
        });
      }
    })
    .catch((erro) => {
      return response.status(500).json({
        message: 'erro no server ' + erro.message,
      });
    });
};
