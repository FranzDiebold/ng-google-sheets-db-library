/* tslint:disable:no-string-literal */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { API_KEY, GoogleSheetsDbService } from './google-sheets-db.service';
import { googleSheetsAPIMockResponseData } from './google-sheets-db.service.mock-data';

describe('GoogleSheetsDbService', () => {
  let service: GoogleSheetsDbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_KEY,
          useValue: '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        },
      ],
    });
    service = TestBed.inject(GoogleSheetsDbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert rows to entries', () => {
    const rows = [
      ['Test Column Name 1', ' Other colum   ', ' THIRD_column'],
      ['One', 'TWO', '3'],
      ['', '2'],
    ];
    const entries = [
      { 'Test Column Name 1': 'One', 'Other colum': 'TWO', THIRD_column: '3' },
      { 'Test Column Name 1': '', 'Other colum': '2', THIRD_column: '' },
    ];
    expect(service.rowsToEntries(rows)).toEqual(entries);
  });

  it('should cleant column names', () => {
    expect(service.cleanColumnName('test')).toBe('test');
    expect(service.cleanColumnName('  test  ')).toBe('test');
    expect(service.cleanColumnName('test-2')).toBe('test-2');
    expect(service.cleanColumnName('test_2 ')).toBe('test_2');
    expect(service.cleanColumnName(' Test 2')).toBe('Test 2');
    expect(service.cleanColumnName('  As_dö1+l-?r#^2  t=e*s$t  ')).toBe(
      'As_dö1+l-?r#^2  t=e*s$t'
    );
    expect(service.cleanColumnName('TÍTULO')).toBe('TÍTULO');
    expect(service.cleanColumnName('ESPECIFICAÇÃO da TECNOLOGIA')).toBe(
      'ESPECIFICAÇÃO da TECNOLOGIA'
    );
  });

  const attributesMapping = {
    id: 'ID',
    name: 'Name',
    email: 'Email Address',
    contact: {
      _prefix: 'Contact ',
      street: 'Street',
      streetNumber: 'Street Number',
      zip: 'ZIP',
      city: 'City',
    },
    skills: {
      _prefix: 'Skill ',
      _listField: true,
    },
  };

  it('should read Google sheet and return all entries', (done: DoneFn) => {
    service
      .get(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        'Characters',
        attributesMapping
      )
      .subscribe((data) => {
        expect(data.length).toBe(5);

        expect(data[0]['id']).toBe('1');
        expect(data[0]['name']).toBe('Lisa');
        expect(data[0]['email']).toBe('lisa.s@test.com');
        expect(data[0]['contact']['street']).toBe('Evergreen Terrace');
        expect(data[0]['contact']['streetNumber']).toBe('742');
        expect(data[0]['contact']['zip']).toBe('58008');
        expect(data[0]['contact']['city']).toBe('Springfield');
        expect(data[0]['skills'].length).toBe(3);
        expect(data[0]['skills']).toContain('saxophone');
        expect(data[0]['skills']).toContain('art');
        expect(data[0]['skills']).toContain('science');
        expect(data[0]['isactive']).toBeFalsy();
        expect(data[0]['notvisible']).toBeFalsy();

        done();
      });

    const expectedRequestUrl =
      'https://sheets.googleapis.com/v4/spreadsheets/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/values/Characters?key=1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsAPIMockResponseData);
  });

  it('should read Google sheet and return active entries', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        'Characters2',
        attributesMapping,
        'Active'
      )
      .subscribe((data) => {
        expect(data.length).toBe(3);

        expect(data[0]['id']).toBe('2');
        expect(data[0]['name']).toBe('Marge');
        expect(data[0]['email']).toBe('');
        expect(data[0]['contact']['street']).toBe('Evergreen Terrace');
        expect(data[0]['contact']['streetNumber']).toBe('742');
        expect(data[0]['contact']['zip']).toBe('58008');
        expect(data[0]['contact']['city']).toBe('Springfield');
        expect(data[0]['skills'].length).toBe(2);
        expect(data[0]['skills']).toContain('painting');
        expect(data[0]['skills']).toContain('bowling');
        expect(data[0]['isactive']).toBeFalsy();
        expect(data[0]['notvisible']).toBeFalsy();

        expect(data[2]['skills']).toEqual([]);

        done();
      });

    const expectedRequestUrl =
      'https://sheets.googleapis.com/v4/spreadsheets/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/values/Characters2?key=1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsAPIMockResponseData);
  });

  it('should read Google sheet and return active entries with custom activeValues list', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        'Characters Test',
        attributesMapping,
        'Active',
        ['no']
      )
      .subscribe((data) => {
        expect(data.length).toBe(2);
        console.log(data[1]);
        expect(data[1]['id']).toBe('3');
        expect(data[1]['name']).toBe('Homer');
        expect(data[1]['email']).toBe('');
        expect(data[1]['contact']['street']).toBe('Evergreen Terrace');
        expect(data[1]['contact']['streetNumber']).toBe('742');
        expect(data[1]['contact']['zip']).toBe('58008');
        expect(data[1]['contact']['city']).toBe('Springfield');
        expect(data[1]['skills'].length).toBe(2);
        expect(data[1]['skills']).toContain('beer');
        expect(data[1]['skills']).toContain('donuts');
        expect(data[1]['isactive']).toBeFalsy();
        expect(data[1]['notvisible']).toBeFalsy();

        expect(data[0]['skills'].length).toBe(3);

        done();
      });

    const expectedRequestUrl =
      'https://sheets.googleapis.com/v4/spreadsheets/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/values/Characters%20Test?key=1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsAPIMockResponseData);
  });

  it('should read Google sheet and return active entries with custom activeValue', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        'Characters äöü',
        attributesMapping,
        'Active',
        'no'
      )
      .subscribe((data) => {
        expect(data.length).toBe(2);

        expect(data[0]['id']).toBe('1');
        expect(data[0]['name']).toBe('Lisa');
        expect(data[1]['id']).toBe('3');
        expect(data[1]['name']).toBe('Homer');

        done();
      });

    const expectedRequestUrl =
      'https://sheets.googleapis.com/v4/spreadsheets/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/values/Characters%20%C3%A4%C3%B6%C3%BC?key=1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsAPIMockResponseData);
  });
});
