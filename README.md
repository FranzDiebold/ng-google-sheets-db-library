# ng-google-sheets-db - Angular Google Sheets DB

[![Test, lint, build and deploy](https://github.com/FranzDiebold/ng-google-sheets-db-library/workflows/Test,%20lint,%20build%20and%20deploy/badge.svg)](https://github.com/FranzDiebold/ng-google-sheets-db-library/actions)
[![demo: app](https://img.shields.io/badge/demo-app-2ca467.svg)](https://franzdiebold.github.io/ng-google-sheets-db-library/)
[![demo: StackBlitz](https://img.shields.io/badge/demo-StackBlitz-1389fd.svg)](https://stackblitz.com/edit/ng-google-sheets-db-demo)
[![Angular: v9](https://img.shields.io/badge/Angular-v9-DD0031.svg)](./projects/ng-google-sheets-db/package.json)
[![npm](https://img.shields.io/npm/v/ng-google-sheets-db.svg)](https://www.npmjs.com/package/ng-google-sheets-db)
[![npm](https://img.shields.io/npm/dm/ng-google-sheets-db.svg)](https://www.npmjs.com/package/ng-google-sheets-db)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)

Use [Google Sheets](https://en.wikipedia.org/wiki/Google_Sheets) as your (read-only) backend for your Angular app!

[![Google Sheets Table](./images/google-sheets-table.png)](https://docs.google.com/spreadsheets/d/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA)

```typescript
const attributesMapping = {
  id: 'ID',
  name: 'Name',
  email: 'Email Address',
  contact: {
    _prefix: 'Contact',
    street: 'Street',
    streetNumber: 'Street Number',
    zip: 'ZIP',
    city: 'City'
  },
  skills: {
    _prefix: 'Skill',
    _listField: true
  }
};
```

```ts
googleSheetsDbService.get('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping)
  .subscribe((characters: object[]) => {
    // Use the characters here
  });
```

## Installation

```bash
ng add ng-google-sheets-db
```

or

```bash
npm install ng-google-sheets-db
```

## Usage

### Google Sheets

1. Create a [Google Sheet](https://docs.google.com/spreadsheets):
    - The first row **must** be the header.
    - The following rows are your entries, one entry per row.
    - You may have an *active* column, with which you can enable or disable rows/entries.
    - A Google Sheets demo spreadsheet is available [here](https://docs.google.com/spreadsheets/d/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA).
2. Share your sheet:
    - [File] -> [Publish to the web] -> [Publish]
    - Get the *Spreadsheet ID* (i.e. `1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA`): It is part of the Google spreadsheet URL.
    - Get the *Worksheet ID*: The Worksheet IDs are increasing numbers, starting at 1.

### Angular

Add `GoogleSheetsDbService` to your app's module as a provider and Angular's `HttpClientModule` to the imports:

```typescript
import { HttpClientModule } from '@angular/common/http';

import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@NgModule({
  ...
  imports: [
    HttpClientModule,
    ...
  ],
  providers: [ GoogleSheetsDbService ],
  ...
})
export class AppModule { }
```

Import and inject into your component's constructor:

```typescript
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@Component({
  ...
})
export class YourComponent implements OnInit {
  characters$: Observable<Character[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { }

  ngOnInit(): void {
    this.characters$ = this.googleSheetsDbService.get<Character>('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, characterAttributesMapping);
  }
```

### Attributes Mapping

The `attributesMapping` maps the Google spreadsheet columns to to your outcome object.

```typescript
const attributesMapping = {
  id: 'ID',
  name: 'Name',
  email: 'Email Address',
  contact: {
    _prefix: 'Contact',
    street: 'Street',
    streetNumber: 'Street Number',
    zip: 'ZIP',
    city: 'City'
  },
  skills: {
    _prefix: 'Skill',
    _listField: true
  }
};
```

For example, the Google spreadsheet column *Email Address* is mapped to the outcome object attribute `email`.

#### Nested objects

`contact` is an example of a nested object. You may define a `_prefix` as a prefix for all columns of the nested object.

#### Lists

`skills` is an example of a list. You need to set `_listField` and a `_prefix` for all columns of the list. In this example, all columns starting with *Skill* and an increasing number are part of the list, i.e. *Skill 1*, *Skill 2*, etc.

## Methods

### get<T>(spreadsheetId: string, worksheetId: string | number, attributesMapping: object | string[]): Observable<T[]>

```typescript
const allCharacters$: Observable<Character> = googleSheetsDbService.get<Character>('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping);
```

Get all rows from the Google spreadsheet as an `Observable` of objects or a given type as type variable `T`.

### getActive<T>(spreadsheetId: string, worksheetId: string | number, attributesMapping: object | string[], isActiveColumnName: string = 'is_active', activeValues: string[] | string = null): Observable<T[]>

```typescript
const activeCharacters$: Observable<Character> = googleSheetsDbService.getActive<Character>('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping, 'Active');
```

Get "active" rows from the Google spreadsheet as an `Observable` of objects or a given type as type variable `T`. You may have an *active* column with name `isActiveColumnName`, with which you can enable or disable rows/entries.
"Active" rows have the value `true`, `1` or `yes`. You may also define your own `activeValues`.

## Demo Application

Want to see an example of how to use `ng-google-sheets-db`? Check out the demo application in [projects/demo](./projects/demo) or on [StackBlitz](https://stackblitz.com/edit/ng-google-sheets-db-demo).

## License

[MIT](./LICENSE)
