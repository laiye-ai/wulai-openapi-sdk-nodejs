import { MsgBody } from './common'
export interface BotResponseParams {
	msg_body: MsgBody;
	user_id: string;
	extra: string;
}
