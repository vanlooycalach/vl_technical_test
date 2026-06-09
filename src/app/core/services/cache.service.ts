import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly prefix = 'itx_cache_';
  private readonly ttlMs = 60 * 60 * 1000;

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(this.prefix + key);

    if (!raw) {
      return null;
    }

    try {
      const entry = JSON.parse(raw) as CacheEntry<T>;

      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }

      return entry.data;
    } catch {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
  }

  set<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + this.ttlMs,
    };

    localStorage.setItem(this.prefix + key, JSON.stringify(entry));
  }

  clear(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
