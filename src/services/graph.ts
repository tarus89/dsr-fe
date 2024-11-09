export default class DsrGraph {
  static hasRecord = `
        query HasRecord($code: String!) {
            hasRecord(code: $code) {
                hasRecord
                isPasswordless
                record{
                      _id
                      code
                      password
                      accounId
                      shareFrom
                      shareTo
                      practionerEmails
                      expireOn
                      isPasswordless
                }
            }
        }
    `;

  static matchRecordPass = `query Search($code: String!, $password: String) {
        search(code: $code, password: $password) {
          ... on Dsr {
            _id
            code
            accounId
            shareFrom
            shareTo
            isPasswordless
          }
          ... on ResponseType {
            status
            message
          }
        }
      }`;

  static getDsrRecord = `query Dsr($code: String!, $password: String) {
  getDsrRecord(code: $code, password: $password) {
    ... on Dsr {
      _id
      code
      password
      accounId
      shareFrom
      shareTo
      practionerEmails
      expireOn
      isPasswordless
    }
    ... on ResponseType {
      status
      message
    }
  }
}`;
}
