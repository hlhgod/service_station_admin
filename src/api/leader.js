import request from '@/utils/request'
import { getToken } from "@/utils/auth";

const token=getToken()

export function fetchList(query) {
  return request({
    url: '/leader-team',
    method: 'get',
    params: query
  })
}

export function deleteArticle(id) {
  return request({
    url: `/leader-team/${id}`,
    method: 'delete',
  })
}

export function fetchArticle(id) {
  return request({
    url: '/leader-team/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/leader-team/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/leader-team',
    method: 'post',
    data,
    token,
  })
}

export function updateArticle(data) {
  return request({
    url: '/leader-team',
    method: 'put',
    data,
    token,
  })
}
