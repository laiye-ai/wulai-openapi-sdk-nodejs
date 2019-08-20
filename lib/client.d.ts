export = Client;
declare class Client {
  constructor(config: Client.Config);
  userCreate: (data: {
    nickname: string;
    avatar_url?: string;
    user_id: string;
  }) => Promise<any>;
  userAttributeCreate: (
    data: {
      user_attribute_user_attribute_value: [
        {
          user_attribute: {
            id: string;
          };
          user_attribute_value: {
            name: string;
          };
        }
      ];
      user_id: string;
    }
  ) => Promise<any>;
  userAttributeList: (
    data: {
      filter: {
        use_in_user_attribute_group: boolean;
      };
      page: number;
      page_size: number;
    }
  ) => Promise<any>;
  getHistoryRecord: (
    data: {
      direction: "BACKWARD" | "FORWARD";
      msg_id: string;
      user_id: string;
      num: number;
    }
  ) => Promise<any>;
  getBotResponse: (
    data: {
      msg_body: {
        text: {
          content: string;
        };
      };
      user_id: string;
      extra: string;
    }
  ) => Promise<any>;
  getKeywordBotResponse: (
    data: {
      msg_body: {
        text: {
          content: string;
        };
      };
      user_id: string;
      extra: string;
    }
  ) => Promise<any>;
  getTaskBotResponse: (
    data: {
      msg_body: {
        text: {
          content: string;
        };
      };
      user_id: string;
      extra: string;
    }
  ) => Promise<any>;
  getQABotResponse: (
    data: {
      msg_body: {
        text: {
          content: string;
        };
      };
      user_id: string;
      extra: string;
    }
  ) => Promise<any>;
  request: (action: string, params: Object, opts: Object) => Promise<any>;
}
declare namespace Client {
  export interface Config {
    endpoint: string;
    apiVersion: string;
    pubkey: string;
    secret: string;
  }
}
