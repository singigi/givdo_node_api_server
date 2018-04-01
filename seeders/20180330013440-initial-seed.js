'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'test1.email@email.com',
      created_at: new Date(),
      updated_at: new Date()
      },
      {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'test2.email@email.com',
      created_at: new Date(),
      updated_at: new Date()
      },
      {
      first_name: 'Ted',
      last_name: 'Testy',
      email: 'test3.email@email.com',
      created_at: new Date(),
      updated_at: new Date()
      }
    
    
    ], {});
    
  },

  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    //return queryInterface.dropTable('Users');
    queryInterface.bulkDelete('Users', [
    {first_name :'John'},
    {first_name :'Jane'},
    {first_name :'Ted'}
  ])
  }
};
