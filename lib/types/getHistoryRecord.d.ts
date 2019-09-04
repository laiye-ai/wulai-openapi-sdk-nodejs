import { MsgBody } from "./common";
export interface GetHistoryRecordParams {
  direction: string;
  msg_id: string;
  user_id: string;
  num: number;
}

export interface GetHistoryRecordResult {
  msg: Msg[];
  has_more: boolean;
}

interface Msg {
  direction: string;
  sender_info: SenderInfo;
  msg_type:
    | "TEXT" // 文本消息
    | "IMAGE" // 图文消息
    | "VOICE" // 音频消息
    | "NOTICE" // 通知消息
    | "FILE" // 文件消息
    | "SHARELINK" // 分享链接消息
    | "VIDEO" // 视频消息
    | "CUSTOM" // 用户自定义消息
    | "PUBLIC_EVENT" // 微信公众号的事件消息
    | "NONSUPPORT" // 不支持的消息类型
    | "EVENT" // 事件孝
    | "CALLBACK_NOTICE"; 
  extra: string;
  msg_id: string;
  msg_ts: string;
  user_info: UserInfo;
  msg_body: MsgBody;
}

interface SenderInfo {
  avatar_url: string;
  nickname: string;
  real_name: string;
}

interface UserInfo {
  avatar_url: string;
  nickname: string;
}
