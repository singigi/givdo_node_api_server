/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_game_attempts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		game_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'games',
				key: 'id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		score: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		won: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'user_game_attempts',
		freezeTableName: true,
		underscored: true
	});
};
