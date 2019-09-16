
import { MsgBody } from "./common";
export interface ReceiveUserMessageParams {
    msg_body: MsgBody;
    third_msg_id: string;
    user_id: string;
    extra: string;
}

export interface ReceiveUserMessageResult {
    msg_id: string;
}