declare interface BotResponseResult {
  is_dispatch:        boolean;
  suggested_response: SuggestedResponse[];
  msg_id:             string;
}

interface SuggestedResponse {
  is_send:     boolean;
  bot:         Bot;
  source:      BotSource;
  score:       number;
  response:    Response[];
  quick_reply: string[];
}

interface Bot {
  qa: QA;
}

interface QA {
  knowledge_id:      number;
  standard_question: string;
  question:          string;
}

interface Response {
  msg_body:         MsgBody;
  similar_response: SimilarResponse[];
  enable_evaluate:  boolean;
  delay_ts:         number;
}

interface SimilarResponse {
  url:    string;
  source: BotSource;
  detail: Bot;
}