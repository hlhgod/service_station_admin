import request from '@/utils/request'

export function getSwiperList() {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get'
  })
}
