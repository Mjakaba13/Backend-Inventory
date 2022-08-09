import { faker } from "@faker-js/faker";

export const signUpObj = {
  fullName: faker.name.fullName(),
  email: faker.internet.email(),
  shopName: faker.company.name,
  password: faker.random.alphaNumeric(8),
};

export const logInObj = {
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(8),
};
