export class IHasRecordRes {
  hasRecord!: boolean;
  isPasswordless!: boolean;
  record!: IDsr | null;
}
export class ICheckPassRes {
  status!: number;
  recordFound!: boolean;
  dsrData!: CheckPassResUnion
}

export type CheckPassResUnion = IDsr | ICheckPassRes | null // union type

export type ICheckPassResMessUnion = ICheckPassRes | IResponse | null // union type

export class IDsr {
  _id!: string;
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
