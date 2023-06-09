export interface Todo {
  userId?: number;
  _id?: string;
  title: string;
  completed?: boolean;
  status?: string;
  category?: string;
  priority?: string;
  due?: Date;
}
