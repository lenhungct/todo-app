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
  list_id: number;
  createAt: string;
  completeAt: string;
  actions?: string;
  listName?: string;
}
