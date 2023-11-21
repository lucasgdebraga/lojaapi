module.exports = function (models) {
  models.produto.hasMany(models.venda, {
    foreignKey: 'id_produto',
    onDelete: 'CASCADE',
  });
  models.venda.belongsTo(models.produto, {
    foreignKey: 'id_produto',
    onDelete: 'CASCADE',
  });
};
