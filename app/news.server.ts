import { API_URL, STORIES_NUMBER, STORIES_TYPE } from './config';
import type { Story, NewStoriesData } from './types';
import { http } from './utils/http';

export async function getNewStories(): Promise<Story[]> {
  const url = `${API_URL}/${STORIES_TYPE}.json`;
  const data = await http<NewStoriesData>(url);

  const promises = data.slice(0, STORIES_NUMBER).map((id) => http(`${API_URL}/item/${id}.json`));

  return await Promise.all(promises);
}

export async function getStory(id: string): Promise<Story> {
  const url = `${API_URL}/item/${id}.json`;
  return await http<Story>(url);
}

export async function getComments(commentIds: number[]): Promise<Comment[]> {
  const promises = commentIds.map((id) => http(`${API_URL}/item/${id}.json`));
  return await Promise.all(promises);
}

