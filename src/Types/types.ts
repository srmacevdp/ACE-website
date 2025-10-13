// src/types/types.ts

export type EventCategory = "Technical" | "Non-Technical" | "Gaming";

export interface ContactPerson {
  name: string;
  phone: string;
}


export interface EventData {
  name: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  fee: string;
  rules?: string[] | null;
  contactPerson: ContactPerson[];
  registrationLink: string;
  type: EventCategory;
  rounds?:  string[] | null; // Optional structure for multi-round events
  themes?: string[]; // Optional for art/design events
}

export interface ModalState {
  isOpen: boolean;
  event: EventData | null;
}
