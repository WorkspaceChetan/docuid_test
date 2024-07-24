export interface User {
  _id: string;
  userName: string;
}

export interface Label {
  [key: string]: any;
}

export interface GetProcedures {
  _id: string;
  title: string;
  user: User;
  label: Label[];
  column: string;
  dueDate: string;
  createAt: string;
  __v: number;
}
