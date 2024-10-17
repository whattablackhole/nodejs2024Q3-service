import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseClientService {
  storage = new Map<string, any>();

  add(key, value) {
    this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }
  getAll(
    key,
    filter?: {
      where: { [K in keyof unknown]?: unknown[K] };
    },
  ) {
    const result = [];
    for (const [k, value] of this.storage.entries()) {
      if (key === k.split(':').slice(0, -1).join(':')) {
        if (
          !filter ||
          Object.entries(filter).every((entry) => {
            if (entry[0] === 'where') {
              return Object.entries(entry[1]).every(([k, v]) => {
                return v === value[k];
              });
            }
            return true;
          })
        ) {
          result.push(value);
        }
      }
    }
    return result;
  }

  delete(key) {
    return this.storage.delete(key);
  }

  put(key, value) {
    if (!this.storage.has(key)) {
      return false;
    }
    this.storage.set(key, value);
    return true;
  }
}
