/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('donations', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		item_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'donation_items',
				key: 'id'
			}
		},
		organization_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'organizations',
				key: 'id'
			}
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
		is_monetary: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'donations',
		freezeTableName: true,
		underscored: true
	});
};
