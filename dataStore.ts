import * as fs from 'fs/promises';
import { config } from './config';

interface ClientData {
  claimId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  promoDateTime: string;
  callTimestamp: string;
}

export class DataStore {
  private data: ClientData[] = [];

  async load() {
    try {
      const content = await fs.readFile(config.dataFile, 'utf-8');
      this.data = JSON.parse(content);
    } catch (e) {
      this.data = [];
    }
  }

  async save(client: ClientData) {
    this.data.push(client);
    await fs.writeFile(config.dataFile, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  getAll(): ClientData[] {
    return this.data;
  }
}

export const dataStore = new DataStore();
