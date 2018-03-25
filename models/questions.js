/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('questions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		question: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'question_categories',
				key: 'id'
			}
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'questions',
		freezeTableName: true,
		underscored: true
	});
};
