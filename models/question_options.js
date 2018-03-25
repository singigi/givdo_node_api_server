/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question_options', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		text: {
			type: DataTypes.STRING,
			allowNull: true
		},
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'questions',
				key: 'id'
			}
		},
		is_correct: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: "0"
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: "1"
		}
	}, {
		tableName: 'question_options',
		freezeTableName: true,
		underscored: true
	});
};
