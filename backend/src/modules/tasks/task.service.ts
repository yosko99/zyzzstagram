export interface TaksService {
  cleanOldStories(): Promise<void>;

  handleCron();
}

export const TaskService = Symbol('TaskService');
