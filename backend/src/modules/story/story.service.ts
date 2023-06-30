import IStory from 'src/interfaces/IStory';
import IToken from 'src/interfaces/IToken';
import IUser from 'src/interfaces/IUser';

import StoriesType from 'src/types/stories.type';

export interface StoryService {
  createStory(filename: string, { username }: IToken);

  deleteStory(story: IStory);

  getStories({ username }: IToken, storiesType?: StoriesType): Promise<IUser[]>;

  likeStory(story: IStory, { username }: IToken);
}

export const StoryService = Symbol('StoryService');
