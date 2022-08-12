const { Activity, conn } = require('../../src/db.js');

describe('Activity model', () => {
  beforeAll(async () => {
    await conn.sync({force: true});
    });

  describe('Name and duration', () => {
      it('should not create the activity if the name is not sent', async () => {
        expect.assertions(1);
        try {
          await Activity.create({duration: '10 minutes'});
        } catch (e) {
          expect(e.message).toBeDefined();
        }
      });
      it('should not create the activity if the duration is not sent', async () => {
        expect.assertions(1);
        try {
          await Activity.create({name: 'surf'});
        } catch (e) {
          expect(e.message).toBeDefined();
        }
      });
  });
  
  describe('Seasons and difficulty', () => {
    it('should not create the activity if the seasons are not specified', async () => {
      expect.assertions(1);
      try {
        await Activity.create({name: 'Surf'});
      } catch (e) {
        expect(e.message).toBeDefined();
      }
    });
    it('should not create the activity if the difficulty is not sent', async () => {
      expect.assertions(1);
      try {
        await Activity.create({duration: '2 hours'});
      } catch (e) {
        expect(e.message).toBeDefined();
      }
    });
  });
  
  describe('Create activity', () => {
    it('should create the activity if all properties are sent correctly', async () => {
      const activity = await Activity.create({name: 'Surf', duration: '1 hour', seasons: 'Summer', difficulty: 4});
      expect(activity.toJSON()).toHaveProperty('name', 'Surf');
      expect(activity.toJSON()).toHaveProperty('duration', '1 hour');
      expect(activity.toJSON()).toHaveProperty('seasons', 'Summer');
      expect(activity.toJSON()).toHaveProperty('difficulty', 4);
    });
  });
});



