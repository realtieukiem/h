import { toolkits, sideProjects } from '../config/extras';
import { categories, games } from '../config/games';
import { privacy } from '../config/privacy';
import { site } from '../config/site';
import { skills } from '../config/skills';
import type { SiteData } from './types';

export interface DataSource {
  load(): Promise<SiteData>;
}

export const staticSource: DataSource = {
  load: async () => ({ site, categories, games, skills, toolkits, sideProjects, privacy }),
};

export const dataSource: DataSource = staticSource;
