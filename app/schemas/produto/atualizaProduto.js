module.exports = {
    type: 'object',
    properties: {
      nome: { type: 'string', minLength: 3 },
      preco: { type: 'integer', minimum: 1, maximum: 100 },
    },
    additionalProperties: false,
  };
  