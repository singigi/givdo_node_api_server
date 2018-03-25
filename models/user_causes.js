/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_causes', {
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		cause_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'causes',
				key: 'id'
			}
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: "1"
		}
	}, {
		tableName: 'user_causes',
		freezeTableName: true,
		underscored: true
	});
};
