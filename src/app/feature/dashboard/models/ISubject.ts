
export interface ISubjectsRes {
  message: string;
  metadata: Metadata;
  subjects: ISubject[];
}

export interface ISubject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}