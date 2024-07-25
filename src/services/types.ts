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

export interface TaskItem {
  id: string;
  label: string;
  description: string;
  user: string;
  date: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  items: TaskItem[];
}

export interface Columns {
  [key: string]: Column;
}

export type TaskStatusColProps = {
  title: string;
  color: string;
  items: TaskItem[];
};

export interface UserProcedures {
  _id: string;
  userName: string;
  __v: number;
}

export interface labelProcedures {
  _id: string;
  labelName: string;
  __v: number;
}

export interface UpdateProcedureParams {
  _id: string;
  column: string;
}
export interface createProceduesParam {
  title: string;
  user: string;
  label: string[];
  column: string;
  startDate: string;
  endDate: string;
  createAt?: string;
  dueDate?: string;
}
