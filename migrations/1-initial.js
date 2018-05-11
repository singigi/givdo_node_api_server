'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "organizations", deps: []
 * createTable "admin_users", deps: []
 * createTable "badges", deps: []
 * createTable "causes", deps: []
 * createTable "donation_items", deps: []
 * createTable "question_categories", deps: []
 * createTable "advertisements", deps: []
 * createTable "games", deps: []
 * createTable "questions", deps: [question_categories]
 * createTable "game_questions", deps: [games, questions]
 * createTable "users", deps: [organizations]
 * createTable "question_options", deps: [questions]
 * createTable "player_response", deps: [questions, question_options]
 * createTable "donations", deps: [users, donation_items, organizations]
 * createTable "user_badges", deps: [badges, users]
 * createTable "user_causes", deps: [users, causes]
 * createTable "user_game_attempts", deps: [games, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2018-03-25T06:03:40.223Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "organizations",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "facebook_id": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },                
                "image_link": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "mission": {
                    "type": Sequelize.TEXT,
                    "allowNull": true
                },
                "street_address": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "city": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "state": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },                
                "zip": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "cached_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "admin_users",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "encrypted_password": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "reset_password_token": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "reset_password_sent_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "sign_in_count": {
                    "type": Sequelize.INTEGER(11),
                    "defaultValue": "0",
                    "allowNull": false
                },
                "current_sign_in_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "last_sign_in_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "current_sign_in_ip": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "last_sign_in_ip": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "allowNull": false,
                    "defaultValue": 1
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "image_link": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "facebook_id": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "has_create_privileges": {
                    "type": Sequelize.INTEGER(4),
                    "defaultValue": "1",
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "badges",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "image_link": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "score": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "causes",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "image_link": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "donation_items",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "category": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },                
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "question_categories",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": true,
                    "unique": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "allowNull": false,
                    "defaultValue": 1
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "advertisements",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "company_name": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "image_link": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "impressions": {
                    "type": Sequelize.INTEGER(11),
                    "defaultValue": "0",
                    "allowNull": true
                },
                "clicks": {
                    "type": Sequelize.INTEGER(11),
                    "defaultValue": "0",
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "image_file_name": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "image_content_type": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "image_file_size": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "image_updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                },
                "default": {
                    "type": Sequelize.INTEGER(4),
                    "defaultValue": "0",
                    "allowNull": true
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "games",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "creator_user_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "single_player": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "finished_at": {
                    "type": Sequelize.DATE,
                    "allowNull": true
                }
                
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "questions",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "question_text": {
                    "type": Sequelize.STRING(256),
                    "allowNull": true,
                    "unique": true
                },
                "category_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "question_categories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "game_questions",
            {
                "game_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "games",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "question_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "questions",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "question_options",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "text": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "question_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "questions",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "is_correct": {
                    "type": Sequelize.INTEGER(4),
                    "defaultValue": "0",
                    "allowNull": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "player_response",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "game_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "games",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "question_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "questions",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "question_option_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "question_options",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "donations",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "item_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "donation_items",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "organization_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "organizations",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
                    "allowNull": false
                },
                "is_monetary": {
                    "type": Sequelize.INTEGER(1),
                    "allowNull": true
                },
                "amount": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_badges",
            {
                "user_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "badge_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "badges",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_causes",
            {
                "user_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "cause_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "causes",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(1),
                    "defaultValue": "1",
                    "allowNull": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "user_game_attempts",
            {
                "id": {
                    "type": Sequelize.INTEGER(11),
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "game_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "games",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER(11),
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "score": {
                    "type": Sequelize.INTEGER(11),
                    "allowNull": true
                },
                "won": {
                    "type": Sequelize.INTEGER(1),
                    "allowNull": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
