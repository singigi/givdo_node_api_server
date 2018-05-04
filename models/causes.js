/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('causes', {
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
		image_link: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
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
			allowNull: false,
			defaultValue: "1"
		}
	}, {
		tableName: 'causes',
		freezeTableName: true,
		underscored: true
	});
};
