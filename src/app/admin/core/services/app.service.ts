import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  public static isUndefinedOrNull(value): boolean {
    return (
      _.isUndefined(value) ||
      _.isNull(value) ||
      _.isEmpty(value) ||
      value.length === 0
    );
  }

  public static isNotUndefinedAndNull(value): boolean {
    return !this.isUndefinedOrNull(value);
  }
}
