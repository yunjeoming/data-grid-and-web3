import { faker } from '@faker-js/faker';

const users = Array.from({ length: 500 }).map((_, idx) => ({
  id: faker.string.uuid(),
  name: faker.person.firstName().toLowerCase(),
  age: faker.number.int({ min: 10, max: 50 }),
  phone: faker.phone.number('###########'),
  createdAt: faker.date.past(),
}));

const usersJson = JSON.stringify(users);

// export { users, usersJson };
