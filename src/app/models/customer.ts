import { Project } from "./project";

export interface Customer {
    id?: number;
    name: string;
    contact: string;
    creationDate?: Date;
    projects?: Project[];
  }