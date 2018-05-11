/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_badges', {
		
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		badge_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'badges',
				key: 'id'
			}
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: "1"
		}
	}, {
		tableName: 'user_badges',
		freezeTableName: true,
		underscored: true
	});
};
