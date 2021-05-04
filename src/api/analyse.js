import request from '@/utils/request'
import { getToken } from "@/utils/auth";

const token=getToken()

export function fetchList(query) {
  return request({
    url: '/bank-enterprise',
    method: 'get',
    params: query
  })
}

export function deleteArticle(id) {
  return request({
    url: `/bank-enterprise/${id}`,
    method: 'delete',
  })
}

export function fetchArticle(id) {
  return request({
    url: '/bank-enterprise/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/bank-enterprise/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/bank-enterprise',
    method: 'post',
    data,
    token,
  })
}

export function updateArticle(data) {
  return request({
    url: '/bank-enterprise',
    method: 'put',
    data,
    token,
  })
}
