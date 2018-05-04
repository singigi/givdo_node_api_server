/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('organizations', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		facebook_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		picture: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		street: {
			type: DataTypes.STRING,
			allowNull: true
		},
		mission: {
			type: DataTypes.TEXT,
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
		cached_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: "1"
		}
	}, {
		tableName: 'organizations',
		freezeTableName: true,
		underscored: true
	});
};
