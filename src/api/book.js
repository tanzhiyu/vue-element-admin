import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/show_books',
    method: 'get'
  })
}

export function addbook(book_name) {
  return request({
    url: '/api/add_book',
    method: 'get',
    params: { book_name }
  })
}
