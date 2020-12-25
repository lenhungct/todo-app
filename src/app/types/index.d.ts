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
