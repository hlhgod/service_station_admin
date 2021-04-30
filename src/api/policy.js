import request from '@/utils/request'
import { getToken } from "@/utils/auth";

const token=getToken()

export function fetchList(query) {
  return request({
    url: '/policies',
    method: 'get',
    params: query
  })
}

export function deleteArticle(id) {
  return request({
    url: `/policies/${id}`,
    method: 'delete',
  })
}

export function fetchArticle(id) {
  return request({
    url: '/policies/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/policies/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/policies',
    method: 'post',
    data,
    token,
  })
}

export function updateArticle(data) {
  return request({
    url: '/policies',
    method: 'put',
    data,
    token,
  })
}
