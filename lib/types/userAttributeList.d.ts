export interface UserAttributeListParams {
  filter?: Filter;
  page: number;
  page_size: number;
}

interface Filter {
  use_in_user_attribute_group: boolean;
}

export interface UserAttributeValueResult {
  page_count: number;
  user_attribute_user_attribute_values: UserAttributeUserAttributeValue[];
}

interface UserAttributeUserAttributeValue {
  user_attribute: UserAttribute;
  user_attribute_value: UserAttributeValue[];
}

interface UserAttribute {
  value_type:
    | "USER_ATTRIBUTE_VALUE_TYPE_DEFAULT" // 默认类型
    | "USER_ATTRIBUTE_VALUE_TYPE_STRING" // 字符串类型
    | "USER_ATTRIBUTE_VALUE_TYPE_ENUM" // 枚举类型
    | "USER_ATTRIBUTE_VALUE_TYPE_TIME" // 时间类型
    | "USER_ATTRIBUTE_VALUE_TYPE_CITY" // 城市类型
    | "USER_ATTRIBUTE_VALUE_TYPE_MULTILINE_STRING" // 多行文本类型
    | "USER_ATTRIBUTE_VALUE_TYPE_INT"; // 整形类型
  use_in_user_attribute_group: boolean;
  type:
    | "USER_ATTRIBUTE_TYPE_DEFAULT" // 默认类型
    | "USER_ATTRIBUTE_TYPE_SYSTEM" // 系统属性
    | "USER_ATTRIBUTE_TYPE_TEMP"; // 临时属性
  id: string;
  name: string;
}

interface UserAttributeValue {
  id: string;
  name: string;
}
