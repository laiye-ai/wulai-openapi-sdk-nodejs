
import { HttpOpts, MsgBody } from './common';

// 获取相似问列表 interface
interface SimilarQuestion {
    knowledge_id: string;
    question: string;
    id: string;
}

interface ListSimilarQuestionsBody {
    knowledge_id: string;
    page: number;
    page_size: number;
    similar_question_id: string;
}
interface ListSimilarQuestionsResponse {
    similar_questions: SimilarQuestion[];
    page_count: number;
}

// 删除相似问 interface
interface DeleteSimilarQuestionBody {
    id: string;
}

// 更新属性组 interface
interface UpdateUserAttributeGroupBody {
    user_attribute_group_item: UserAttributeGroupBodyItem;
}

interface UserAttributeGroupBodyItem {
    user_attribute_user_attribute_value: UserAttributeUserAttributeValue[];
    user_attribute_group: UserAttributeGroup;
}

interface UserAttributeGroup {
    id: string;
    name: string;
}

interface UserAttributeUserAttributeValue {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue;
}

interface UserAttribute {
    id: string;
}

interface UserAttributeValue {
    name: string;
}

// 更新属性组 interface
interface UpdateUserAttributeGroupResponse {
    user_attribute_group_item: UserAttributeGroupResponseItem;
}

interface UserAttributeGroupResponseItem {
    user_attribute_user_attribute_values: UserAttributeUserAttributeResValue[];
    user_attribute_group: UserAttributeRes;
}

interface UserAttributeRes {
    id: string;
    name: string;
}

interface UserAttributeUserAttributeResValue {
    user_attribute: UserAttributeClass;
    user_attribute_value: UserAttributeRes;
}

interface UserAttributeClass {
    value_type: string;
    use_in_user_attribute_group: boolean;
    type: string;
    id: string;
    name: string;
}

// 创建相似问 interface
interface CreateSimilarQuestionBody {
    similar_question: SimilarQuestion;
}
// 查询知识点列表 interface
interface ListKnowledgeItemsBody {
    page: number;
    page_size: number;
}

interface ListKnowledgeItemsResponse {
    page_count: number;
    knowledge_items: KnowledgeItem[];
}

interface KnowledgeItem {
    knowledge_tag: KnowledgeTag;
    similar_questions: SimilarQuestion[];
    knowledge: KnowledgeClass;
}

interface KnowledgeClass {
    status: boolean;
    update_time: string;
    maintained_by_user_attribute_group: boolean;
    standard_question: string;
    create_time: string;
    respond_all: boolean;
    id: string;
}

interface KnowledgeTag {
    parent_knowledge_tag_id: string;
    id: string;
    name: string;
}

// 创建知识点 interface
interface CreateKnowledgeTagKnowledgeBody {
    knowledge_tag_knowledge: KnowledgeTagKnowledgeBody;
}

interface KnowledgeTagKnowledgeBody {
    knowledge: KnowledgeCreate;
    knowledge_tag_id: string;
}

interface KnowledgeCreate {
    status: boolean;
    standard_question: string;
    respond_all: boolean;
    id: string;
    maintained_by_user_attribute_group: boolean;
}

interface CreateKnowledgeTagKnowledgeResponse {
    knowledge_tag_knowledge: KnowledgeTagKnowledgeRes;
}

interface KnowledgeTagKnowledgeRes {
    knowledge: KnowledgeClass;
    knowledge_tag_id: string;
}

// 获取知识点分类列表 interface
interface ListKnowledgeTagsBody {
    page: number;
    page_size: number;
    parent_k_tag_id: string;
}

interface ListKnowledgeTagsResponse {
    knowledge_tags: KnowledgeTag[];
    page_count: number;
}

// 更新知识点 interface
interface UpdateKnowledgeBody {
    knowledge: KnowledgeCreate;
}
interface UpdateKnowledgeResponse {
    knowledge: KnowledgeClass;
}

// 删除属性组回复 interface
interface DeleteUserAttributeGroupAnswerBody {
    id: string;
}

// 创建/更新属性组回复 interface
interface CreateUserAttributeGroupAnswerBody {
    user_attribute_group_answer: UserAttributeGroupAnswer;
}
interface CreateUserAttributeGroupAnswerResponse extends CreateUserAttributeGroupAnswerBody { }
interface UserAttributeGroupAnswer {
    answer: Answer;
    user_attribute_group_id: string;
}
interface Answer {
    knowledge_id: string;
    msg_body: MsgBody;
    id: string;
}

// 查询属性组及属性列表 interface
interface ListUserAttributeGroupItemsBody {
    page: number;
    page_size: number;
}
interface ListUserAttributeGroupItemsResponse {
    page_count: number;
    user_attribute_group_items: UserAttributeGroupItem[];
}

interface UserAttributeGroupItem {
    user_attribute_user_attribute_values: UserAttributeUserAttributeValueRes[];
    user_attribute_group: UserAttributeGroup;
}

interface UserAttributeUserAttributeValueRes {
    user_attribute: UserAttributeClass;
    user_attribute_value: UserAttributeGroup;
}

// 查询属性组回复列表 interface
interface ListUserAttributeGroupAnswersBody {
    filter: Filter;
    page: number;
    page_size: number;
}

interface Filter {
    knowledge_id: string;
    user_attribute_group_id: string;
}

interface ListUserAttributeGroupAnswersResponse {
    user_attribute_group_answers: UserAttributeGroupAnswer[];
    page_count: number;
}

export interface UserAttributeGroupAnswer {
    answer: Answer;
    user_attribute_group_id: string;
}

export interface Answer {
    knowledge_id: string;
    msg_body: MsgBody;
    id: string;
}
export declare namespace Knowledge {
    /**
	 * 获取相似问列表
	 * @param {ListSimilarQuestionsBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListSimilarQuestions = (body: ListSimilarQuestionsBody, options: HttpOpts) => Promise<ListSimilarQuestionsResponse>;
    /**
	 * 删除相似问
	 * @param {DeleteSimilarQuestionBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type DeleteSimilarQuestion = (body: DeleteSimilarQuestionBody, options: HttpOpts) => Promise<{}>;
    /**
	 * 更新属性组
	 * @param {UpdateUserAttributeGroupBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type UpdateUserAttributeGroup = (body: UpdateUserAttributeGroupBody, options: HttpOpts) => Promise<UpdateUserAttributeGroupResponse>;
    /**
	 * 创建相似问
	 * @param {CreateSimilarQuestionBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateSimilarQuestion = (body: CreateSimilarQuestionBody, options: HttpOpts) => Promise<CreateSimilarQuestionBody>;
    /**
	 * 更新相似问
	 * @param {CreateSimilarQuestionBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type UpdateSimilarQuestion = (body: CreateSimilarQuestionBody, options: HttpOpts) => Promise<CreateSimilarQuestionBody>;
    /**
	 * 查询知识点列表
	 * @param {ListKnowledgeItemsBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListKnowledgeItems = (body: ListKnowledgeItemsBody, options: HttpOpts) => Promise<ListKnowledgeItemsResponse>;
    /**
	 * 创建知识点
	 * @param {CreateKnowledgeTagKnowledgeBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateKnowledgeTagKnowledge = (body: CreateKnowledgeTagKnowledgeBody, options: HttpOpts) => Promise<CreateKnowledgeTagKnowledgeResponse>;
    /**
	 * 更新知识点
	 * @param {UpdateKnowledgeBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type UpdateKnowledge = (body: UpdateKnowledgeBody, options: HttpOpts) => Promise<UpdateKnowledgeResponse>
    /**
	 * 查询知识点分类列表
	 * @param {ListKnowledgeTagsBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListKnowledgeTags = (body: ListKnowledgeTagsBody, options: HttpOpts) => Promise<ListKnowledgeTagsResponse>;
    /**
	 * 删除属性组回复
	 * @param {DeleteUserAttributeGroupAnswerBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type DeleteUserAttributeGroupAnswer = (body: DeleteUserAttributeGroupAnswerBody, options: HttpOpts) => Promise<{}>;
    /**
	 * 创建属性组回复
	 * @param {CreateUserAttributeGroupAnswerBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateUserAttributeGroupAnswer = (body: CreateUserAttributeGroupAnswerBody, options: HttpOpts) => Promise<CreateUserAttributeGroupAnswerResponse>;
    /**
	 * 更新属性组回复
	 * @param {CreateUserAttributeGroupAnswerBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type UpdateUserAttributeGroupAnswer = (body: CreateUserAttributeGroupAnswerBody, options: HttpOpts) => Promise<CreateUserAttributeGroupAnswerResponse>;
    /**
	 * 查询属性组及属性列表
	 * @param {ListUserAttributeGroupItemsBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListUserAttributeGroupItems = (body: ListUserAttributeGroupItemsBody, options: HttpOpts) => Promise<ListUserAttributeGroupItemsResponse>;
    /**
	 * 查询属性组回复列表
	 * @param {ListUserAttributeGroupAnswersBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListUserAttributeGroupAnswers = (body: ListUserAttributeGroupAnswersBody, options: HttpOpts) => Promise<ListUserAttributeGroupAnswersResponse>;
    /**
	 * 创建属性组
	 * @param {UpdateUserAttributeGroupBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateUserAttributeGroup = (body: UpdateUserAttributeGroupBody, options: HttpOpts) => Promise<UpdateUserAttributeGroupResponse>
}