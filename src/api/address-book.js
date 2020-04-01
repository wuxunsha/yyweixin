/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 所在单位通讯录列表
export function getUserListByUserOrgId(params) {
  return fetch(`${baseUrl}/percenter/getUserListByUserOrgId`, params)
}
// 获取其他单位的api
export function getOrgTypeListForRest(params) {
  return fetch(`${baseUrl}/percenter/getOrgTypeListForRest`, params)
}
// 根据机构id获取管理人员信息
export function getUserListByOrgId(orgId) {
  return fetch(`${baseUrl}/percenter/getUserListByOrgId/${orgId}`)
}
// 根据机构类型查机构列表
export function getOrgListByOrgTypeOrgId(params) {
  return fetch(`${baseUrl}percenter/getOrgListByOrgTypeOrgId`, params)
}
// 根据orgid获取第三级机构列表
export function getOrgListByParentId(parentId) {
  return fetch(`${baseUrl}percenter/getOrgListByParentId/${parentId}`)
}
