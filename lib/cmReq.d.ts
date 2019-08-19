
export = commonRequest;
declare const commonRequest: (config: commonRequest.Config) => Promise<any>;
declare namespace commonRequest {
  export interface Config {
    action: string;
    pubkey: string;
    secret: string;
    query?: Object;
    data?: Object;
    endpoint: string;
    apiVersion: string;
  }
}
