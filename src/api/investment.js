import request from '@/utils/request'
import { getToken } from "@/utils/auth";

const token=getToken()

export function fetchList(query) {
  return request({
    url: '/merchant',
    method: 'get',
    params: query
  })
}

export function deleteArticle(id) {
  return request({
    url: `/merchant/${id}`,
    method: 'delete',
  })
}

export function fetchArticle(id) {
  return request({
    url: '/merchant/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/merchant/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/merchant',
    method: 'post',
    data,
    token,
  })
}

export function updateArticle(data) {
  return request({
    url: '/merchant',
    method: 'put',
    data,
    token,
  })
}
