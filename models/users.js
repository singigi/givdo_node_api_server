/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image_link: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		facebook_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		access_token: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false
		},
		has_create_privileges: {
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
			allowNull: false,
			defaultValue: "1"
		}
	}, {
		tableName: 'users',
		freezeTableName: true,
		underscored: true
	});
};
