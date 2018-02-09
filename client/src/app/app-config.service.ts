import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
@Injectable()
export class ConfigService {
  private config: Object;
  private env: Object;

  constructor(private http: HttpClient) {}

  /**
   *  loads the appropriate configuration file - development or production
   */
  load(mode: string) {
    return this.http
      .get('./assets/config/' + mode + '.json')
      .pipe(
        tap(data => {
          this.config = data;
        })
      )
      .toPromise();
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key
   */
  get(key: any) {
    return this.config[key];
  }
}
