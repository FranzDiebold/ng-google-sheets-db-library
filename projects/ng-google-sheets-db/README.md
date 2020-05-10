# ng-google-sheets-db - Angular Google Sheets DB

[![Test, Lint, Build and Deploy](https://github.com/FranzDiebold/ng-google-sheets-db-library/workflows/Test,%20Lint,%20Build%20and%20Deploy/badge.svg)](https://github.com/FranzDiebold/ng-google-sheets-db-library/actions)
[![demo: online](https://img.shields.io/badge/demo-online-2ca467.svg)](https://franzdiebold.github.io/ng-google-sheets-db-library/)
[![npm](https://img.shields.io/npm/v/ng-google-sheets-db.svg)](https://www.npmjs.com/package/ng-google-sheets-db)
[![npm](https://img.shields.io/npm/dm/ng-google-sheets-db.svg)](https://www.npmjs.com/package/ng-google-sheets-db)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)

Use [Google Sheets](https://en.wikipedia.org/wiki/Google_Sheets) as your (read-only) backend for your Angular app!

![Google Sheets Table](./images/google-sheets-table.png)

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
this.googleSheetsDbService.get('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping)
  .subscribe((characters: object[]) => {
    // Use the characters here
  });
```

## Installation

```bash
npm install ng-google-sheets-db
```

## Usage

### Google Sheets

1. Create a [Google Sheet](https://docs.google.com/spreadsheets):
    - The first row **must** be the header.
    - The following rows are your entries, one entry per row.
    - You may have an *active* column, with which you can enable or disable rows/entries.
2. Share your sheet:
    - [File] -> [Publish to the web] -> [Publish]
    - Get the *Spreadsheet ID* (i.e. `1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA`): It is part of the Google spreadsheet URL.
    - Get the *Worksheet ID*: The Worksheet IDs are increasing numbers, starting at 1.

### Angular

Add `GoogleSheetsDbService` to your app's module as a provider:

```typescript
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@NgModule({
  ...
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
const characters$: Observable<Character> = googleSheetsDbService.get('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping);
```

Get all rows from the Google spreadsheet as an `Observable` of objects.

### getActive<T>(spreadsheetId: string, worksheetId: string | number, attributesMapping: object | string[], isActiveColumnName: string = 'is_active'): Observable<T[]>

```typescript
const characters$: Observable<Character> = googleSheetsDbService.getActive('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping, 'Active');
```

Get "active" rows from the Google spreadsheet as an `Observable` of objects. You may have an *active* column, with which you can enable or disable rows/entries.

## License

[MIT](./LICENSE)
