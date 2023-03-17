// Using faker.js to generate fake data for testing purposes
import { faker } from "@faker-js/faker";

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

console.log("Generating fake data...");
console.log(randomName, randomEmail);
