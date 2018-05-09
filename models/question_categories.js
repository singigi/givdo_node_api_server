/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question_categories', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		tableName: 'question_categories',
		freezeTableName: true,
		underscored: true
	});
};
