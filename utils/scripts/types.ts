import {
  GeoPoint,
  DocumentReference,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

export type Bounty = {
  createdAt: Date;
  active: boolean;
  client: DocumentReference<DocumentData>;
  name: string;
  description: string;
  appearance: string;
  location: GeoPoint;
  lastSeen: Date;
  category: "child" | "elderly" | "adult" | "pet";
  gender: "male" | "female" | "other";
  images: string[];
  hunters: string[];
  additionalInfo?: string;
  radius: number;
  reward?: number;
  breed?: string;
  age?: number;
};
