import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface GoogleSpreadsheetsResponse {
  feed: { entry: object[] };
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsDbService {
  defaultActiveValues: any[] = ['true', '1', 'yes'];

  constructor(private http: HttpClient) { }

  public get<T>(spreadsheetId: string, worksheetId: string | number, attributesMapping: object | string[]): Observable<T[]> {
    return this.getEntries(spreadsheetId, worksheetId).pipe(
      map(entries => entries.map(entry => this.getObjectFromEntry(entry, attributesMapping) as T))
    );
  }

  public getActive<T>(spreadsheetId: string, worksheetId: string | number, attributesMapping: object | string[],
                      isActiveColumnName: string = 'is_active', activeValues: string[] | string = null): Observable<T[]> {
    if (activeValues === null) {
      activeValues = this.defaultActiveValues;
    } else if (!Array.isArray(activeValues)) {
      activeValues = [activeValues];
    }
    return this.getEntries(spreadsheetId, worksheetId).pipe(
      map((objects: object[]) => objects
        .filter(entry => activeValues.includes(this.getValueFromEntry(entry, isActiveColumnName).toLowerCase()))
      ),
      map(entries => entries.map(entry => this.getObjectFromEntry(entry, attributesMapping) as T)),
    );
  }

  private getSpreadsheetUrl(spreadsheetId: string, worksheetId: string | number): string {
    return 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/' + worksheetId + '/public/values?alt=json';
  }

  private getEntries(spreadsheetId: string, worksheetId: string | number): Observable<object[]> {
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, worksheetId);

    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map(jsonRes => jsonRes.feed.entry),
      catchError(this.handleError),
    );
  }

  public getJsonColumnName(columnName: string): string {
    return columnName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-.äëïöüÿßàèìòùâêîôûæœáéíóúãõñçåø]/g, '');
  }

  private arrayToObject(array: string[]): object {
    return array.reduce((acc, cur) => {
      acc[cur] = cur;
      return acc;
    }, {});
  }

  private getObjectFromEntry(entry: object, attributesMapping: object | string[]): unknown {
    if (Array.isArray(attributesMapping)) {
      attributesMapping = this.arrayToObject(attributesMapping);
    }

    return this.getObjectFromEntryObject(entry, attributesMapping);
  }

  private getObjectFromEntryObject(entry: object, attributesMapping: object, columnNamePrefix: string = ''): object {
    const obj: object = {};
    for (const attr in Object(attributesMapping)) {
      if (attributesMapping.hasOwnProperty(attr) && !['_prefix', '_listField'].includes(attr)) {
        if (typeof attributesMapping[attr] === 'string') {
          obj[attr] = this.getValueFromEntry(entry, columnNamePrefix + attributesMapping[attr]);
        } else if (typeof attributesMapping[attr] === 'object') {
          let columnName = '';
          if (attributesMapping[attr].hasOwnProperty('_prefix')) {
            columnName = attributesMapping[attr]._prefix;
          }

          if (attributesMapping[attr]._listField) {
            obj[attr] = this.getListFromEntry(entry, columnNamePrefix + columnName);
          } else {
            obj[attr] = this.getObjectFromEntryObject(entry, attributesMapping[attr], columnNamePrefix + columnName);
          }
        } else {
          console.log(`Unknown type for ${attr}`);
        }
      }
    }

    return obj;
  }

  private getValueFromEntry(entry: object, attribute: string): string {
    attribute = this.getJsonColumnName(attribute);

    if (entry.hasOwnProperty(`gsx$${attribute}`) && entry[`gsx$${attribute}`].hasOwnProperty('$t')) {
      return entry[`gsx$${attribute}`].$t;
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
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
