import { CommonUser } from '@/types/users';
import { faker } from '@faker-js/faker';

export const UserUtils = {
  getUser: (user: CommonUser, type: 'create' | 'update') => {
    const newUser = {
      ...user,
      age: Number(user.age),
    };

    if (type === 'create') {
      return {
        ...newUser,
        id: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      };
    }

    if (type === 'update') {
      return newUser;
    }

    return newUser;
  },
};
