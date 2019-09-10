export type MsgBody =
	| Text
	| Image
	| Custom
	| Video
	| File
	| Voice
	| Event
	| ShareLink;

interface Text {
	text: {
		content: string;
	};
}
interface Image {
	image: {
		resource_url: string;
	};
}
interface Custom {
	custom: {
		content: string;
	};
}
interface Video {
	video: {
		resource_url: string;
		thumb?: string;
		description?: string;
		title?: string;
	};
}
interface File {
	file: {
		file_name?: string;
		resource_url: string;
	};
}
interface Voice {
	voice: {
		resource_url: string;
		type?: "AMR" | "PCM" | "WAV" | "OPUS" | "SPEEX" | "MP3";
		recognition?: string;
	};
}

interface Event {
	event: {
		fields?: Object;
		event_type?: "EVENT_TYPE_DEFAULT" | "CUSTOM_EVENT" | "ENTER";
	};
}

interface ShareLink {
	share_link: {
		description?: string;
		destination_url: string;
		cover_url: string;
		title: string;
	};
}

export type BotSource =
	| "DEFAULT_ANSWER_SOURCE"
	| "KEYWORD_BOT" // 关键字机器人
	| "TASK_BOT" // 任务机器人
	| "QA_BOT" // 问答机器人
	| "CHITCHAT_BOT"; // 闲聊机器人
