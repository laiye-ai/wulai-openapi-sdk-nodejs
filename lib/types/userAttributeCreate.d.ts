export interface CreateUserAttributeParams {
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

interface UserAttributeValue {
	name: string;
}
