module.exports = (sequelize, DataTypes) => {
    const produto = sequelize.define('produto', {
        nome: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        preco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return produto;
};
