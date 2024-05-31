declare type User = {
  id: number;
  email: string;
};

declare type List = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_on: Date;
  last_updated: Date;
  tasks: Task[];
};

declare type Task = {
  id: number;
  title: string;
  description: string;
  list_id: number;
  created_on: Date;
  last_updated: Date;
  completed: boolean;
};

declare type Conversation = {
  id: number;
  title: string;
};

type ChatObject = {
  role: "user" | "system";
  content: string;
};
