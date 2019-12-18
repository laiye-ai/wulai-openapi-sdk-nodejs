
import { HttpOpts } from "./common";

// 创建用户 interface
interface CreateUserBody {
    nickname: string;
    avatar_url: string;
    user_id: string;
}
// 创建用户属性 interface
interface CreateUserAttributeBody {
    user_attribute_user_attribute_value: UserAttributeUserAttributeValue[];
    user_id: string;
}

interface UserAttributeUserAttributeValue {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue;
}

interface UserAttribute {
    id: string;
}

// 用户属性列表 interface
interface Filter {
    use_in_user_attribute_group: boolean;
}
interface ListUserAttributeBody {
    filter: Filter;
    page: number;
    page_size: number;
}

interface ListUserAttributeResponse {
    page_count: number;
    user_attribute_user_attribute_values: UserAttributeUserAttributeValueRes[];
}

interface UserAttributeUserAttributeValueRes {
    user_attribute: UserAttribute;
    user_attribute_value: UserAttributeValue[];
}

interface UserAttribute {
    value_type: string;
    use_in_user_attribute_group: boolean;
    type: string;
    id: string;
    name: string;
}

interface UserAttributeValue {
    id: string;
    name: string;
}

export declare namespace User {
    /**
	 * 创建用户
	 * @param {CreateUserBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateUser = (body: CreateUserBody, options: HttpOpts) => Promise<{}>;
    /**
	 * 给用户添加属性值
	 * @param {CreateUserAttributeBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type CreateUserAttribute = (body: CreateUserAttributeBody, options: HttpOpts) => Promise<{}>;
    /**
	 * 获取用户属性列表
	 * @param {ListUserAttributeBody} body post body
	 * @param {HttpOpts} options http options
	 */
    export type ListUserAttribute = (body: ListUserAttributeBody, options: HttpOpts) => Promise<ListUserAttributeResponse>;
}