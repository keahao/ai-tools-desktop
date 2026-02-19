export interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface AppConfig {
  apiKey: string;
  model: string;
}
