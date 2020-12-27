interface IUser {
  username: string;
  password: string;
}

interface IApiKey {
  apiKey: string;
}

interface IList {
  name: string;
  id?: number;
}

interface IListDetail {
  id: number;
  name: string;
  items: number;
  tasks?: number;
  actions?: string;
}

interface INewTask {
  name: string;
  completed: boolean;
}

interface ITask {
  name: string;
  completed: boolean;
  listId: number;
}

interface ITaskDetail {
  id: number;
  name: string;
  completed: boolean;
  listId?: number;
  createdAt: string;
  completedAt?: string;
  actions?: string;
  listName?: string;
  list_id?: number;
}
