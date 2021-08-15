/* tslint:disable:no-string-literal */

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { GoogleSheetsDbService } from './google-sheets-db.service';
import { googleSheetsMockResponseData } from './google-sheets-db.service.mock-data';

describe('GoogleSheetsDbService', () => {
  let service: GoogleSheetsDbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GoogleSheetsDbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert column names', () => {
    expect(service.getJsonColumnName('test')).toBe('test');
    expect(service.getJsonColumnName('  test  ')).toBe('test');
    expect(service.getJsonColumnName('test-2')).toBe('test-2');
    expect(service.getJsonColumnName('test_2')).toBe('test2');
    expect(service.getJsonColumnName('test 2')).toBe('test2');
    expect(service.getJsonColumnName('  As_dö1+l-?r#^2  t=e*s$t  ')).toBe(
      'asdö1l-r2test'
    );
    expect(
      service.getJsonColumnName(
        ' AbCdEfghij klMNOPqrstuvWxYZ^1234567890ß´+#-.,<>;:_*`?=) (/&%$§' +
          '"!° @end  '
      )
    ).toBe('abcdefghijklmnopqrstuvwxyz1234567890ß-.end');
    expect(service.getJsonColumnName('TÍTULO')).toBe('título');
    expect(service.getJsonColumnName('ESPECIFICAÇÃO da TECNOLOGIA')).toBe(
      'especificaçãodatecnologia'
    );
    expect(
      service.getJsonColumnName(
        ' abcxyz?!012789-.äëïöüÿßàèìòùâêîôûæœáéíóúãõñç¿¡åø () =§$'
      )
    ).toBe('abcxyz012789-.äëïöüÿßàèìòùâêîôûæœáéíóúãõñçåø');
  });

  const attributesMapping = {
    id: 'ID',
    name: 'Name',
    email: 'Email Address',
    contact: {
      _prefix: 'Contact',
      street: 'Street',
      streetNumber: 'Street Number',
      zip: 'ZIP',
      city: 'City',
    },
    skills: {
      _prefix: 'Skill',
      _listField: true,
    },
  };

  it('should read Google sheet and return all entries', (done: DoneFn) => {
    service
      .get('1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA', 1, attributesMapping)
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
      'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values?alt=json';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsMockResponseData);
  });

  it('should read Google sheet and return active entries', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        2,
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
      'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/2/public/values?alt=json';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsMockResponseData);
  });

  it('should read Google sheet and return active entries with custom activeValues list', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        3,
        attributesMapping,
        'Active',
        ['no']
      )
      .subscribe((data) => {
        expect(data.length).toBe(2);

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
      'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/3/public/values?alt=json';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsMockResponseData);
  });

  it('should read Google sheet and return active entries with custom activeValue', (done: DoneFn) => {
    service
      .getActive(
        '1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA',
        4,
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
      'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/4/public/values?alt=json';
    const mockRequest: TestRequest = httpMock.expectOne(expectedRequestUrl);
    mockRequest.flush(googleSheetsMockResponseData);
  });
});
