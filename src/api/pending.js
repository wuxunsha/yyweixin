/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 所有待处理列表
export function getToDoList(params) {
  return fetch(`${baseUrl}percenter/getToDoList`, params)
}
// 获取创新创优列表
export function getInnovateToDoList(params) {
  return fetch(`${baseUrl}/percenter/getInnovateToDoList`, params)
}
// 创新创优审核通过
export function updateInnovateStatusPass(id) {
  return fetch(`${baseUrl}/percenter/updateInnovateStatusPass/${id}`)
}
// 创新创优审核驳回
export function updateInnovateStatusTurn(id) {
  return fetch(`${baseUrl}/percenter/updateInnovateStatusTurn/${id}`)
}
