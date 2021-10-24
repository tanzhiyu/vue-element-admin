/*
 * @Author: tanzhiyu
 * @Date: 2021-10-24 22:04:16
 * @LastEditors: tanzhiyu
 * @LastEditTime: 2021-10-24 22:50:30
 */

const fs = require('fs');
const path = require('path');

module.exports = [
  {
    url: '/vue-element-admin/book/list',
    type: 'get',
    response: config => {
      try {
        const list = fs.readFileSync(path.resolve(__dirname,'./data.json'), 'utf-8')
          return {
            code: 0,
            list: JSON.parse(list),
            total: 0
          }
      }
      catch(err) {
        console.log(err)
        return {
          code: 10086,
          list: []
        }
      }

    }
  },
  {
    url: '/vue-element-admin/book/add',
    type: 'post',
    response: config => {
      const { name } = config.body;
      let  list = fs.readFileSync(path.resolve(__dirname,'./data.json'), 'utf-8')
      list = JSON.parse(list).sort((a, b) => a.id - b.id);
      const book = list.find((item, index) => item.id === list.length - 1)
      list = [...list, {
        id: book.id + 1,
        name,
        creatTime: new Date().toLocaleDateString()
      }]
      try{
        fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(list))
      }catch (err) {
        return {
          code: 10086,
          error: err
        }
      }
      return {
        code: 0,
        message: "success"
      }
    }
  }

]