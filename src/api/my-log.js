/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 获取我的所有日志
export function getMyLogList(params) {
  return fetch(`${baseUrl}wechatWorkLog/findWorkLogByPage`, params)
}
// 获取成员的所有日志
export function getMyMemberLogList(params) {
  return fetch(`${baseUrl}wechatWorkLog/findLeaderWorkLogByPage`, params)
}
// 查看日志详情的/wechatWorkLog/findLeaderByKey
export function findLeaderByKey(params) {
  return fetch(`${baseUrl}wechatWorkLog/findLeaderByKey`, params)
}
// 点击编写个人日志
export function editMyLog(params) {
  return fetch(`${baseUrl}wechatWorkLog/add`, params)
}
//  批示反馈或者回复
export function reply(params) {
  return fetch(`${baseUrl}/wechatWorkLog/reply`, params)
}
// // 根据机构id获取管理人员信息
// export function getUserListByOrgId(orgId) {
//   return fetch(`${baseUrl}/percenter/getUserListByOrgId${orgId}`)
// }
