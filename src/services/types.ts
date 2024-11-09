export class IHasRecordRes {
  hasRecord!: boolean;
  isPasswordless!: boolean;
}
export class ICheckPassRes {
  status!: number;
  recordFound!: boolean;
  dsrData!: CheckPassResUnion
}

type CheckPassResUnion = IDsr | ICheckPassRes | null // union type

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
