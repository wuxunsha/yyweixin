/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 登录接口
export function loginUserNo(params) {
  return fetch(`${baseUrl}/root/login/checkMemberLogin`, params)
}
// 获取tab栏
export function tab(params) {
  return fetch(`${baseUrl}wechatInformation/queryListbytype`, params)
}
// 获取首页列表，搜索
export function list(params) {
  return fetch(`${baseUrl}wechatInformation/findByPage`, params)
}
// 获取详情页信息
export function detail(params) {
  return fetch(`${baseUrl}wechatInformation/findOne`, params)
}
// 获取授权的id
export function loginId(params) {
  return fetch(`${baseUrl}wechatlogin/login`, params)
}
// 登录接口
export function loginUser(params) {
  return fetch(`${baseUrl}wechatlogin/bindAccount`, params)
}
// 登录之后获取用户信息
export function getUserInfo(params) {
  return fetch(`${baseUrl}percenter/getMyInfo`, params)
}
// 登录之后获取指标的tab跟身份信息
export function getMyIndex(params) {
  return fetch(`${baseUrl}percenter/getMyIndex`, params)
}
// 获取领导的指标信息
export function getOrgListByOrgType(orgType) {
  return fetch(`${baseUrl}percenter/getOrgListByOrgType/${orgType}`)
}
// 点击指标去往指标详情信息页
export function getIndexListByOrgId(params) {
  return fetch(`${baseUrl}percenter/getIndexListByOrgId`, params)
}
// 获取社会评价
export function getOrgTypeTree(orgId) {
  return fetch(`${baseUrl}socie/getOrgTypeTree/${orgId}`)
}
// /socie/sociaEvalList社会评价机构得分
export function sociaEvalList(params) {
  return fetch(`${baseUrl}socie/sociaEvalList`, params)
}
