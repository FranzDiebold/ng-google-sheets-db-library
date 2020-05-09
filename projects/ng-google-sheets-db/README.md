# NgGoogleSheetsDb - Angular Google Sheets DB

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
this.ngGoogleSheetsDbService.getActive('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping, 'Active')
  .subscribe((characters: object[]) => {
    // ...
  });
```

## Installation

...

## Usage

1. Create a [Google Sheet](https://docs.google.com/spreadsheets):
    - The first row **must** be the header.
    - The following rows are your entries.
    - You may have an *active* column, with which you can enable or disable rows.
2. Share your sheet:
    - [File] -> [Publish to the web] -> [Publish]
    - Get the *Spreadsheet ID* (i.e. `1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA`).
3. Add `NgGoogleSheetsDbService` to your module.
4. Use `NgGoogleSheetsDbService`.
