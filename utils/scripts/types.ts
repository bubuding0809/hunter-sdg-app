import {
  GeoPoint,
  DocumentReference,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

export type Bounty = {
  client: DocumentReference<DocumentData>;
  createdAt: Date;
  active: boolean;
  name: string;
  appearance: string;
  location: GeoPoint;
  lastSeen: Date;
  category: "child" | "elderly" | "adult" | "pet";
  gender: "male" | "female" | "other";
  images: string[];
  hunters: DocumentReference<DocumentData>[];
  radius: number;
  description?: string;
  additionalInfo?: string;
  reward?: number;
  breed?: string;
  age?: number;
};
