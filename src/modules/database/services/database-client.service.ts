import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseClientService {
  storage = new Map<any, any>();

  add(key, value) {
    this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }
  getAll(key) {
    let result = [];
    for (let [k, value] of this.storage.entries()) {
      if (key === k.split(':').slice(0, -1).join("")) {
        result.push(value);
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
