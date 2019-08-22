declare interface GetHistoryRecordParams {
  direction: string;
  msg_id:    string;
  user_id:   string;
  num:       number;
}


declare interface GetHistoryRecordResult {
  msg:      Msg[];
  has_more: boolean;
}

interface Msg {
  direction:   string;
  sender_info: SenderInfo;
  msg_type:    string;
  extra:       string;
  msg_id:      string;
  msg_ts:      string;
  user_info:   UserInfo;
  msg_body:    MsgBody;
}

interface SenderInfo {
  avatar_url: string;
  nickname:   string;
  real_name:  string;
}

interface UserInfo {
  avatar_url: string;
  nickname:   string;
}
