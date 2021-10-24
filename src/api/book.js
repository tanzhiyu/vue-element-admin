import request from '@/utils/request'

export function getList() {
  return request({
    url: '/vue-element-admin/book/list',
    method: 'get'
  })
}

export function addbook(book_name) {
  return request({
    url: '/vue-element-admin/book/add',
    method: 'post',
    data: { name: book_name }
  })
}
