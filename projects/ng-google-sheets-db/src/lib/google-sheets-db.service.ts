import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { InjectionToken, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface GoogleSpreadsheetsResponse {
  values: string[][];
}

export const API_KEY = new InjectionToken<string>('Google Sheets API key');

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsDbService {
  defaultActiveValues: any[] = ['true', '1', 'yes'];

  constructor(
    private http: HttpClient,
    @Inject(API_KEY) public apiKey: string
  ) {}

  public get<T>(
    spreadsheetId: string,
    worksheetName: string,
    attributesMapping: object | string[]
  ): Observable<T[]> {
    return this.getRows(spreadsheetId, worksheetName).pipe(
      map((rows: string[][]) =>
        this.rowsToEntries(rows).map(
          (entry: object) =>
            this.getObjectFromEntry(entry, attributesMapping) as T
        )
      )
    );
  }

  public getActive<T>(
    spreadsheetId: string,
    worksheetName: string,
    attributesMapping: object | string[],
    isActiveColumnName: string = 'is_active',
    activeValues: string[] | string = null
  ): Observable<T[]> {
    if (activeValues === null) {
      activeValues = this.defaultActiveValues;
    } else if (!Array.isArray(activeValues)) {
      activeValues = [activeValues];
    }
    return this.getRows(spreadsheetId, worksheetName).pipe(
      map((rows: string[][]) =>
        this.rowsToEntries(rows)
          .filter((obj: object) =>
            activeValues.includes(obj[isActiveColumnName].toLowerCase())
          )
          .map(
            (entry: object) =>
              this.getObjectFromEntry(entry, attributesMapping) as T
          )
      )
    );
  }

  private getSpreadsheetUrl(
    spreadsheetId: string,
    worksheetName: string
  ): string {
    return (
      'https://sheets.googleapis.com/v4/spreadsheets/' +
      spreadsheetId +
      '/values/' +
      encodeURI(worksheetName) +
      '?key=' +
      this.apiKey
    );
  }

  private getRows(
    spreadsheetId: string,
    worksheetName: string
  ): Observable<string[][]> {
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, worksheetName);

    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map((jsonRes) => jsonRes.values),
      catchError(this.handleError)
    );
  }

  public rowsToEntries(rows: string[][]): object[] {
    const columns: Array<string> = rows[0].map(this.cleanColumnName);
    return rows.slice(1).map((row: Array<string>) =>
      columns.reduce((entry: object, columnName: string, idx: number) => {
        entry[columnName] = row.length > idx ? row[idx] : '';
        return entry;
      }, {})
    );
  }

  public cleanColumnName(columnName: string): string {
    return columnName.trim();
  }

  private arrayToObject(array: string[]): object {
    return array.reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {});
  }

  private getObjectFromEntry(
    entry: object,
    attributesMapping: object | string[]
  ): unknown {
    if (Array.isArray(attributesMapping)) {
      attributesMapping = this.arrayToObject(attributesMapping);
    }

    return this.getObjectFromEntryObject(entry, attributesMapping);
  }

  private getObjectFromEntryObject(
    entry: object,
    attributesMapping: object,
    columnNamePrefix: string = ''
  ): object {
    const obj: object = {};
    for (const attr in Object(attributesMapping)) {
      if (
        attributesMapping.hasOwnProperty(attr) &&
        !['_prefix', '_listField'].includes(attr)
      ) {
        if (typeof attributesMapping[attr] === 'string') {
          obj[attr] = this.getValueFromEntry(
            entry,
            columnNamePrefix + attributesMapping[attr]
          );
        } else if (typeof attributesMapping[attr] === 'object') {
          let columnName = '';
          if (attributesMapping[attr].hasOwnProperty('_prefix')) {
            columnName = attributesMapping[attr]._prefix;
          }

          if (attributesMapping[attr]._listField) {
            obj[attr] = this.getListFromEntry(
              entry,
              columnNamePrefix + columnName
            );
          } else {
            obj[attr] = this.getObjectFromEntryObject(
              entry,
              attributesMapping[attr],
              columnNamePrefix + columnName
            );
          }
        } else {
          console.log(`Unknown type for ${attr}`);
        }
      }
    }

    return obj;
  }

  private getValueFromEntry(entry: object, attribute: string): string {
    attribute = this.cleanColumnName(attribute);
    if (entry.hasOwnProperty(attribute)) {
      return entry[attribute];
    } else {
      return null;
    }
  }

  private getListFromEntry(entry: object, attribute: string): string[] {
    const list: string[] = [];

    let i = 1;
    let curElement: string = this.getValueFromEntry(entry, `${attribute}${i}`);
    while (curElement) {
      list.push(curElement);
      i++;
      curElement = this.getValueFromEntry(entry, `${attribute}${i}`);
    }

    return list;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
