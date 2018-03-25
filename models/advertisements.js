/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('advertisements', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		link: {
			type: DataTypes.STRING,
			allowNull: true
		},
		impressions: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: "0"
		},
		clicks: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
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
		image_file_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		image_content_type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		image_file_size: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		image_updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		default: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: "0"
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: "1"
		}
	}, {
		tableName: 'advertisements',
		freezeTableName: true,
		underscored: true
	});
};
