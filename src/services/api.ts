import DsrGraph from "./graph";
import { ICheckPassRes, IDsr, IHasRecordRes, IResponse } from "./types";

export default class DsrAPI {
  static defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  static graphQLApiEndpoint = "http://localhost:8080/dsr-g";

  static async hasRecord(code: string): Promise<IHasRecordRes> {
    const query = DsrGraph.hasRecord;
    const variables = { code };

    const data = await this.apiFetch<{ hasRecord: IHasRecordRes | null }>(
      query,
      variables
    );
    const hasRecord = data?.hasRecord?.hasRecord || false;
    const isPasswordless = data?.hasRecord?.isPasswordless || false;

    return { hasRecord, isPasswordless };
  }

  static fetchPassApi = async (
    code: string,
    password: string
  ): Promise<ICheckPassRes> => {
    const query = DsrGraph.matchRecordPass;
    const variables = { code, password };

    const data = await this.apiFetch<{ search: ICheckPassRes }>(
      query,
      variables
    );

    const dsrData = data?.search || null;
    const status = data?.search?.status || 404;
    const recordFound = dsrData ? true : false;

    return { status, recordFound, dsrData };
  };

  static fetchDsrRecord = async (
    code: string,
    password?: string
  ): Promise<IDsr | IResponse> => {
    const query = DsrGraph.getDsrRecord;
    const variables = { code, password };

    const data = await this.apiFetch<{ getDsrRecord: IDsr | IResponse }>(
      query,
      variables
    );

    return data?.getDsrRecord ?? { status: 404, message: "Record Not found" };
  };

  /**
   * << GENERIC TYPES >>
   * @param query => Our graph Query parameter - string
   * @param variables => variable options passed with our graph query
   * @returns generic Type T passed to it
   */
  static async apiFetch<T>(
    query: string,
    variables: object
  ): Promise<T | null> {
    const options = {
      ...this.defaultOptions,
      body: JSON.stringify({ query, variables }),
    };

    try {
      const result = await fetch(this.graphQLApiEndpoint, options);
      const { data } = await result.json();

      return data as T;
    } catch (error) {
      console.error("Error (apiFetch) => ", error);
      return null;
    }
  }
}
