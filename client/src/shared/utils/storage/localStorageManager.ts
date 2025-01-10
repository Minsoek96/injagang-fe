type StorageOptions = {
  expirationDate?: number;
};

class LocalStorageManager {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get<T>(): T | null {
    const item = localStorage.getItem(this.key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (parsed?.expires && Date.now() > parsed.expires) {
      this.delete();
      return null;
    }
    return parsed.data ?? parsed;
  }

  save<T>(data: T, options?: StorageOptions) {
    const item = options?.expirationDate
      ? {
        data,
        expires: Date.now() + options.expirationDate * 24 * 60 * 60 * 1000,
      }
      : data;

    localStorage.setItem(this.key, JSON.stringify(item));
  }

  delete() {
    localStorage.removeItem(this.key);
  }
}

export default LocalStorageManager;
