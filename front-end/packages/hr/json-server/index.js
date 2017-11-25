const Chance = require('chance');
const chance = new Chance();

module.exports = function() {
  const data = {
    patients: [],
    contacts: []
  };

  for (let i = 0; i < 100; i++) {
    data.patients.push({
      id: i,
      name: chance.name(),
      dob: chance.birthday({ string: true }),
      pastMedication: chance.paragraph(),
      tags: (function() {
        return [1, 2, 3, 4, 5].map(function() {
          return chance.word();
        });
      })(),
      isPlanningPregnancy: chance.bool(),
      planPregnancy: chance.paragraph(),
      updatedAt: chance.date({ string: true })
    });
  }

  for (let j = 0; j < 100; j++) {
    data.contacts.push({
      id: j,
      address: chance.address(),
      postalCode: chance.zip(),
      email: chance.email(),
      phone: chance.phone(),
      patientId: chance.integer({ min: 0, max: 99 })
    });
  }

  return data;
};
