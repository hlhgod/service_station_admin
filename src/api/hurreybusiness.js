import request from '@/utils/request'
import { getToken } from "@/utils/auth";

const token=getToken()

export function fetchList(query) {
  return request({
    url: '/promote-enterprise',
    method: 'get',
    params: query
  })
}

export function deleteArticle(id) {
  return request({
    url: `/promote-enterprise/${id}`,
    method: 'delete',
  })
}

export function fetchArticle(id) {
  return request({
    url: '/promote-enterprise/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/promote-enterprise/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/promote-enterprise',
    method: 'post',
    data,
    token,
  })
}

export function updateArticle(data) {
  return request({
    url: '/promote-enterprise',
    method: 'put',
    data,
    token,
  })
}
