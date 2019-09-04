## 给用户添加属性值

该接口用于给用户添加或修改用户属性，包括系统属性和临时属性。

`client.userAttributeCreate(params)`

**params** Object-required

```js
{
  // Array of object (属性列表。重复创建的用户属性会被覆盖。临时属性默认30min有效期。) non-empty
  "user_attribute_user_attribute_value": [
    {
      // object (用户属性), required
      "user_attribute": {
         // string <uint64> (属性id) >= 1, required
        "id": "string"
      },
      // object (用户属性值), required
      "user_attribute_value": {
        // string (属性值) [ 1 .. 128 ] characters, required
        "name": "string"
      }
    }
  ],
  // string (用户id作为用户的唯一识别。) [ 1 .. 128 ] characters, required
  "user_id": "string"
}
```



**response**

```
{}
```