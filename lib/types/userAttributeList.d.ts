declare interface UserAttributeListParams {
  filter?: Filter;
  page: number;
  page_size: number;
}

interface Filter {
  use_in_user_attribute_group: boolean;
}

declare interface UserAttributeValueResult {
  page_count: number;
  user_attribute_user_attribute_values: UserAttributeUserAttributeValue[];
}

interface UserAttributeUserAttributeValue {
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
