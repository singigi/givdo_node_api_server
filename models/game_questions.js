/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('game_questions', {
		game_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'games',
				key: 'id'
			}
		},
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'questions',
				key: 'id'
			}
		}
	}, {
		tableName: 'game_questions',
		freezeTableName: true,
		underscored: true
	});
};
