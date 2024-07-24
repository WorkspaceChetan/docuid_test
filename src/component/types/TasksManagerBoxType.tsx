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
