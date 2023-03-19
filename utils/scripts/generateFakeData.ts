// Using faker.js to generate fake data for testing purposes
// import fs from "fs";
import { faker } from "@faker-js/faker";
import {
  collection,
  getDocs,
  addDoc,
  DocumentData,
  doc,
} from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, GeoPoint, DocumentReference } from "firebase/firestore";
import { cats, dogs, kids, elderlies, adults } from "../../data/images.json";

import type { Bounty } from "./types";

const app = initializeApp({
  apiKey: "AIzaSyBXsjCLQQ6mVcNcnMsyRJPH7dhGem4O9bk",
  authDomain: "bitebuddies-38265.firebaseapp.com",
  projectId: "bitebuddies-38265",
  storageBucket: "bitebuddies-38265.appspot.com",
  messagingSenderId: "593368800511",
  appId: "1:593368800511:web:beb728eb236aa1dfee80ca",
});

const db = getFirestore(app);

// const saveToJson = (data: string, filePath: string) => {
//   fs.writeFile(filePath, data, err => {
//     if (err) throw err;
//   });
//   console.log("Data saved to " + filePath);
// };

const getNElementsFromArray = (arr: any[], n: number) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(arr[faker.datatype.number({ min: 0, max: arr.length - 1 })]);
  }

  return [...new Set(result)];
};

const getRandomImages = (category: string) => {
  let images: string[] = [];
  switch (category) {
    case "child":
      images = getNElementsFromArray(
        kids,
        faker.datatype.number({ min: 1, max: 5 })
      );
      break;
    case "elderly":
      images = getNElementsFromArray(
        elderlies,
        faker.datatype.number({ min: 1, max: 5 })
      );
      break;
    case "adult":
      images = getNElementsFromArray(
        adults,
        faker.datatype.number({ min: 1, max: 5 })
      );
      break;
    case "pet":
      images =
        Math.random() > 0.5
          ? getNElementsFromArray(
              cats,
              faker.datatype.number({ min: 1, max: 5 })
            )
          : getNElementsFromArray(
              dogs,
              faker.datatype.number({ min: 1, max: 5 })
            );
      break;
    default:
      break;
  }
  return images;
};

const getRandomAge = (category: string) => {
  switch (category) {
    case "child":
      return faker.datatype.number({ min: 2, max: 12 });
    case "elderly":
      return faker.datatype.number({ min: 60, max: 80 });
    case "adult":
      return faker.datatype.number({ min: 13, max: 59 });
    case "pet":
      return faker.datatype.number({ min: 1, max: 20 });
    default:
      return faker.datatype.number({ min: 2, max: 80 });
  }
};

const getUserRefs = async () => {
  try {
    const userCollection = collection(db, "User");
    const docs = await getDocs(userCollection);
    return docs.docs.map(doc => doc.ref);
  } catch (err) {
    throw err;
  }
};

const categories = ["child", "elderly", "adult", "pet"];
const genders = ["male", "female", "other"];

export const generateBounty = ({
  clientId,
  userRefs,
}: {
  clientId?: string;
  userRefs?: DocumentReference<DocumentData>[];
}): Bounty => {
  const category = categories[faker.datatype.number({ min: 0, max: 3 })] as
    | "child"
    | "elderly"
    | "adult"
    | "pet";
  const breed =
    category === "pet"
      ? Math.random() > 0.5
        ? faker.animal.cat()
        : faker.animal.dog()
      : undefined;

  const coordinates = faker.address.nearbyGPSCoordinate(
    [1.3707654763250605, 103.84643473592251],
    10000,
    true
  );

  const location = new GeoPoint(
    parseFloat(coordinates[0]),
    parseFloat(coordinates[1])
  );

  const client = userRefs
    ? userRefs[faker.datatype.number({ min: 0, max: userRefs.length - 1 })]
    : doc(db, "User", clientId);

  const bounty: Bounty = {
    name: faker.name.firstName(),
    description: faker.lorem.paragraph(),
    appearance: faker.lorem.paragraph(),
    additionalInfo: faker.lorem.paragraph(),
    location: location,
    radius: 1000,
    reward: faker.datatype.number({ min: 100, max: 1000 }),
    active: true,
    client: client,
    category: category,
    age: getRandomAge(category),
    gender: genders[faker.datatype.number({ min: 0, max: 2 })] as
      | "male"
      | "female"
      | "other",
    images: getRandomImages(category),
    lastSeen: faker.date.recent(),
    hunters: [],
    createdAt: new Date(),
  };

  // Add breed if it is not undefined
  if (breed) {
    bounty.breed = breed;
  }

  return bounty;
};

const main = async () => {
  // Write bounty data to firestore collection at Bounty
  const bountyCollection = collection(db, "Bounty");

  try {
    const userRefs = await getUserRefs();
    [...Array(1)].map(async () => {
      const bounty = generateBounty({ userRefs });
      const bountyDoc = await addDoc(bountyCollection, bounty);
      console.log("Bounty added", bountyDoc.id);
      console.log(bounty.name);
    });
  } catch (error) {
    console.log(error);
  }
};

// only run main if this file is run directly
if (require.main === module) {
  main()
    .then(() => console.log("Done"))
    .catch(err => console.log(err));
}
