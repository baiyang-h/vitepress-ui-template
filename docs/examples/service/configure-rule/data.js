// 详情接口，用于回显相关表单，已创建的数据
export const data1 = {
  "code": 1,
  "data": {
    // 表单数据
    "defaultAutoCreateRule": {
      "aaaaaaaa": true,  // 交付信息更新
      "bbbbbbbb": true,  // 售后信息更新
      "cccccccc": false  // 服务单信息更新
    },
    // 列表树中第一级为 业务列表， 创建时选择的业务列表， 这里是第一级需要反显的业务数据
    "businessAutoCreateRules": [{
      "aaaaaaaa": false,
      "bbbbbbbb": false,
      "cccccccc": true,
      "businessId": 5150598112985105,
    }],
    // 这里是第2、3、4等需要反显的分类数据
    "categoryAutoCreateRules": [{
      "categoryId": 91004038913646675,
      "aaaaaaaa": false,
      "bbbbbbbb": true,
      "cccccccc": false
    }, {
      "categoryId": 91009962428522505,
      "aaaaaaaa": true,
      "bbbbbbbb": false,
      "cccccccc": true
    }]
  },
  "message": "Success."
}

// 列表树数据，第一级为业务数据，业务数据的子集children下的数据才是分类数据
export const data2 = {
  "code": 1,
  "data": [
    {
      // 一级时业务
      "categoryTreeNodeList": [
        {
          "value": 91009962428522505,
          "parentId": -1,
          "children": [],
          "name": "123",
          "enabled": true,
          "createdAt": "2023-03-16T08:53:51.712Z"
        },
        {
          "value": 91004038913646675,
          "parentId": -1,
          "children": [],
          "name": "异常商品分类",
          "enabled": true,
          "createdAt": "2023-03-16T08:30:19.436Z"
        },
        {
          "value": 90643201160564750,
          "parentId": -1,
          // 二级是分类
          "children": [
            {
              "value": 90643268688859247,
              "parentId": 90643201160564750,
              "children": [],
              "name": "229分类2",
              "enabled": true,
              "createdAt": "2023-03-15T08:36:45.111Z"
            }
          ],
          "name": "229分类",
          "enabled": true,
          "createdAt": "2023-03-15T08:36:29.011Z"
        }
      ],
      "businessId": 5150598112985105,
      "businessName": "直充"
    }
  ],
  "message": "Success."
}
