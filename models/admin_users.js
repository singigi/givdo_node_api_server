/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin_users', {
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		encrypted_password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		reset_password_token: {
			type: DataTypes.STRING,
			allowNull: true
		},
		reset_password_sent_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sign_in_count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: "0"
		},
		current_sign_in_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_sign_in_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		current_sign_in_ip: {
			type: DataTypes.STRING,
			allowNull: true
		},
		last_sign_in_ip: {
			type: DataTypes.STRING,
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
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		tableName: 'admin_users',
		freezeTableName: true,
		underscored: true
	});
};
