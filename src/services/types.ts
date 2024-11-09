export class IHasRecordRes {
  hasRecord!: boolean;
  isPasswordless!: boolean;
}
export class ICheckPassRes {
  status!: number;
  recordFound!: boolean;
  dsrData!: object | null;
  // dsrData!: IDsr | null; // enquire if this is possible or I explore UnionTypes
}

export class IDsr {
  _id!: object;
  code!: string;
  password!: string;
  accounId!: string;
  shareFrom!: number;
  shareTo!: number;
  practionerEmails!: string[];
  expireOn!: number;
  isPasswordless!: boolean;
}

export class IResponse {
  status!: number;
  message!: string
}
