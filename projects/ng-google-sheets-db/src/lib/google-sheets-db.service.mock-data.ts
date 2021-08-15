/* tslint:disable:object-literal-key-quotes */

export const googleSheetsMockResponseData = {
  version: '1.0',
  encoding: 'UTF-8',
  feed: {
    xmlns: 'http://www.w3.org/2005/Atom',
    xmlns$openSearch: 'http://a9.com/-/spec/opensearchrss/1.0/',
    xmlns$gsx: 'http://schemas.google.com/spreadsheets/2006/extended',
    id: {
      $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values',
    },
    updated: {
      $t: '2020-05-08T21:07:18.495Z',
    },
    category: [
      {
        scheme: 'http://schemas.google.com/spreadsheets/2006',
        term: 'http://schemas.google.com/spreadsheets/2006#list',
      },
    ],
    title: {
      type: 'text',
      $t: 'Characters',
    },
    link: [
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://docs.google.com/spreadsheets/d/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/pubhtml',
      },
      {
        rel: 'http://schemas.google.com/g/2005#feed',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values',
      },
      {
        rel: 'http://schemas.google.com/g/2005#post',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values',
      },
      {
        rel: 'self',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values?alt=json',
      },
    ],
    author: [
      {
        name: {
          $t: 'Your Name',
        },
        email: {
          $t: 'your.name@gmail.com',
        },
      },
    ],
    openSearch$totalResults: {
      $t: '5',
    },
    openSearch$startIndex: {
      $t: '1',
    },
    entry: [
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cokwr',
        },
        updated: {
          $t: '2020-05-08T21:07:18.495Z',
        },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list',
          },
        ],
        title: {
          type: 'text',
          $t: 'no',
        },
        content: {
          type: 'text',
          $t: 'id: 1, name: Lisa, emailaddress: lisa.s@test.com, contactstreet: Evergreen Terrace, contactstreetnumber: 742, contactzip: 58008, contactcity: Springfield, skill1: saxophone, skill2: art, skill3: science, irrelevantcolumn: this',
        },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cokwr',
          },
        ],
        gsx$active: {
          $t: 'no',
        },
        gsx$id: {
          $t: '1',
        },
        gsx$name: {
          $t: 'Lisa',
        },
        gsx$emailaddress: {
          $t: 'lisa.s@test.com',
        },
        gsx$contactstreet: {
          $t: 'Evergreen Terrace',
        },
        gsx$contactstreetnumber: {
          $t: '742',
        },
        gsx$contactzip: {
          $t: '58008',
        },
        gsx$contactcity: {
          $t: 'Springfield',
        },
        gsx$skill1: {
          $t: 'saxophone',
        },
        gsx$skill2: {
          $t: 'art',
        },
        gsx$skill3: {
          $t: 'science',
        },
        gsx$irrelevantcolumn: {
          $t: 'this',
        },
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cpzh4',
        },
        updated: {
          $t: '2020-05-08T21:07:18.495Z',
        },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list',
          },
        ],
        title: {
          type: 'text',
          $t: 'yes',
        },
        content: {
          type: 'text',
          $t: 'id: 2, name: Marge, contactstreet: Evergreen Terrace, contactstreetnumber: 742, contactzip: 58008, contactcity: Springfield, skill1: painting, skill2: bowling, irrelevantcolumn: should',
        },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cpzh4',
          },
        ],
        gsx$active: {
          $t: 'yes',
        },
        gsx$id: {
          $t: '2',
        },
        gsx$name: {
          $t: 'Marge',
        },
        gsx$emailaddress: {
          $t: '',
        },
        gsx$contactstreet: {
          $t: 'Evergreen Terrace',
        },
        gsx$contactstreetnumber: {
          $t: '742',
        },
        gsx$contactzip: {
          $t: '58008',
        },
        gsx$contactcity: {
          $t: 'Springfield',
        },
        gsx$skill1: {
          $t: 'painting',
        },
        gsx$skill2: {
          $t: 'bowling',
        },
        gsx$skill3: {
          $t: '',
        },
        gsx$irrelevantcolumn: {
          $t: 'should',
        },
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cre1l',
        },
        updated: {
          $t: '2020-05-08T21:07:18.495Z',
        },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list',
          },
        ],
        title: {
          type: 'text',
          $t: 'no',
        },
        content: {
          type: 'text',
          $t: 'id: 3, name: Homer, contactstreet: Evergreen Terrace, contactstreetnumber: 742, contactzip: 58008, contactcity: Springfield, skill1: beer, skill2: donuts, irrelevantcolumn: not',
        },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/cre1l',
          },
        ],
        gsx$active: {
          $t: 'no',
        },
        gsx$id: {
          $t: '3',
        },
        gsx$name: {
          $t: 'Homer',
        },
        gsx$emailaddress: {
          $t: '',
        },
        gsx$contactstreet: {
          $t: 'Evergreen Terrace',
        },
        gsx$contactstreetnumber: {
          $t: '742',
        },
        gsx$contactzip: {
          $t: '58008',
        },
        gsx$contactcity: {
          $t: 'Springfield',
        },
        gsx$skill1: {
          $t: 'beer',
        },
        gsx$skill2: {
          $t: 'donuts',
        },
        gsx$skill3: {
          $t: '',
        },
        gsx$irrelevantcolumn: {
          $t: 'not',
        },
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/chk2m',
        },
        updated: {
          $t: '2020-05-08T21:07:18.495Z',
        },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list',
          },
        ],
        title: {
          type: 'text',
          $t: 'yes',
        },
        content: {
          type: 'text',
          $t: 'id: 4, name: Bart, emailaddress: el.barto@smail.com, contactstreet: Evergreen Terrace, contactstreetnumber: 742, contactzip: 58008, contactcity: Springfield, skill1: eat my shorts, skill2: skateboarding, irrelevantcolumn: be',
        },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/chk2m',
          },
        ],
        gsx$active: {
          $t: 'yes',
        },
        gsx$id: {
          $t: '4',
        },
        gsx$name: {
          $t: 'Bart',
        },
        gsx$emailaddress: {
          $t: 'el.barto@smail.com',
        },
        gsx$contactstreet: {
          $t: 'Evergreen Terrace',
        },
        gsx$contactstreetnumber: {
          $t: '742',
        },
        gsx$contactzip: {
          $t: '58008',
        },
        gsx$contactcity: {
          $t: 'Springfield',
        },
        gsx$skill1: {
          $t: 'eat my shorts',
        },
        gsx$skill2: {
          $t: 'skateboarding',
        },
        gsx$skill3: {
          $t: '',
        },
        gsx$irrelevantcolumn: {
          $t: 'be',
        },
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/ciyn3',
        },
        updated: {
          $t: '2020-05-08T21:07:18.495Z',
        },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list',
          },
        ],
        title: {
          type: 'text',
          $t: 'yes',
        },
        content: {
          type: 'text',
          $t: 'id: 5, name: Ralph, emailaddress: ralphie@test-mail.com, contactstreet: Main Street, contactstreetnumber: 1234, contactzip: 58008, contactcity: Springfield, irrelevantcolumn: visible',
        },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA/1/public/values/ciyn3',
          },
        ],
        gsx$active: {
          $t: 'yes',
        },
        gsx$id: {
          $t: '5',
        },
        gsx$name: {
          $t: 'Ralph',
        },
        gsx$emailaddress: {
          $t: 'ralphie@test-mail.com',
        },
        gsx$contactstreet: {
          $t: 'Main Street',
        },
        gsx$contactstreetnumber: {
          $t: '1234',
        },
        gsx$contactzip: {
          $t: '58008',
        },
        gsx$contactcity: {
          $t: 'Springfield',
        },
        gsx$skill1: {
          $t: '',
        },
        gsx$skill2: {
          $t: '',
        },
        gsx$skill3: {
          $t: '',
        },
        gsx$irrelevantcolumn: {
          $t: 'visible',
        },
      },
    ],
  },
};
