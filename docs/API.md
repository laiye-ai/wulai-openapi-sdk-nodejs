# 已实现API

### [用户类](#用户类)

创建用户 `createUser`

创建用户属性 `createUserAttribute`

获取用户属性列表 `listUserAttribute`

### [对话类](#对话类)

查询历史消息 `getMsgHistory`

给用户发消息 `sendMessage`

获取机器人回复 `getBotResponse`

获取关键机器人回复 `getKeywordResponse`

获取任务机器人回复 `getTaskResponse`

获取问答机器人回复 `getQaResponse`

接收用户发的消息 `receiveMessage`

同步发给用户的消息 `syncMessage`

给用户发消息 `sendMessage`

获取用户输入联想 `getUserInputSug`

### [知识点类](#知识点类)

删除相似问 `deleteSimilarQuestion`

更新属性组 `updateUserAttributeGroup`

查询相似问列表 `listSimilarQuestions`

创建相似问 `createSimilarQuestion`

查询知识点列表 `listKnowledgeItems`

更新知识点 `updateKnowledge`

查询知识点分类列表 `listKnowledgeTags`

删除属性组回复 `deleteUserAttributeGroupAnswer`

创建属性组回复 `createUserAttributeGroupAnswer`

创建知识点 `createKnowledgeTagKnowledge`

更新属性组回复 `updateUserAttributeGroupAnswer`

查询属性组及属性列表 `listUserAttributeGroupItems`

查询属性组回复列表 `listUserAttributeGroupAnswers`

更新相似问 `UpdateSimilarQuestion`

创建属性组 `createUserAttributeGroup`

创建知识点分类 `createKnowledgeTag`

更新知识点分类 `updateKnowledgeTag`

删除知识点分类 `deleteKnowledgeTag`

批量添加知识点列表 `batchCreateKnowledgeItems`

### [统计类](#统计类)

查询问答召回数统计列表（知识点粒度，日报） `listQARecallDailyKnowledgeStats`

查询问答召回数统计列表（日报） `listQARecallDailyStats`

添加用户满意度评价 `createQASatisfaction`

查询问答满意度评价统计列表（知识点粒度，日报） `listQASatisfactionDailyKnowledgeStats`

### [词库管理类](#词库管理类)

查询全部实体概要 `listEntities`

查询同义词列表 `listSynonym`

创建意图实体值相似说法 `createIntentEntityValue`

查询一个实体详情 `getEntity`

创建同义词 `createSynonym`

创建枚举实体值 `createEnumerationEntityValue`

更新同义词 `updateSynonym`

创建枚举实体 `createEnumerationEntity`

创建意图实体 `createIntentEntity`

删除同义词 `deleteSynonym`

删除实体 `deleteEntity`

删除枚举实体值 `deleteEnumerationEntityValue`

删除意图实体值相似说法 `deleteIntentEntityValue`
