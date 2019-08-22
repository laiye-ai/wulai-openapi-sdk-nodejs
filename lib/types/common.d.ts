interface MsgBody {
  text?: {
    content: string;
  };
  image?: {
    resource_url: string;
  };
  custom?: {
    content: string;
  };
  video?: {
    resource_url: string;
    thumb?: string;
    description?: string;
    title?: string;
  };
  file?: {
    file_name?: string;
    resource_url: string;
  };
  voice?: {
    resource_url: string;
    type?: "AMR" | "PCM" | "WAV" | "OPUS" | "SPEEX" | "MP3";
    recognition?: string;
  };
  event?: {
    fields?: Object;
    event_type?: "EVENT_TYPE_DEFAULT" | "CUSTOM_EVENT" | "ENTER";
  };
  share_link?: {
    description?: string;
    destination_url: string;
    cover_url: string;
    title: string;
  };
}
