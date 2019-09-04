import { MsgBody } from "./common";
export interface SyncUserMessageParams {
  msg_body: MsgBody;
  extra:    string;
  user_id:  string;
  msg_ts:   string;
}
export interface SyncUserMessageResult {
  msg_id: string;
}