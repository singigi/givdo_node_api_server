/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('games', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		creator_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
		finished_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		single_player: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: "1"
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		organization_id: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'games',
		freezeTableName: true,
		underscored: true
	});
};
