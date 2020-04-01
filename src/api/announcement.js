/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, baseUrl} from 'config/index'
// 获取其他单位的api
export function getAnnouncement(params) {
  return fetch(`${baseUrl}/wechatNotice/findNoticeByPage`, params)
}
// 根据id查询通知通告详情
export function getAnnouncementDetail(params) {
  return fetch(`${baseUrl}/wechatNotice/findOne`, params)
}
// 获取机构单位
export function getPageTags(params) {
  return fetch(`${baseUrl}/wechatNotice/getPageTags`, params)
}
//  查标签下面的分类
export function findByOrgType(params) {
  return fetch(`${baseUrl}/wechatNotice/findByOrgType`, params)
}
//  获取绩效反馈指标详情
export function queryIndexByINdexId(indexId) {
  return fetch(`${baseUrl}/wechatNotice/queryIndexByINdexId/${indexId}`)
}
// 获取绩效考核指标详情
export function queryBatchByBatchId(indexId) {
  return fetch(`${baseUrl}/wechatNotice/queryBatchByBatchId/${indexId}`)
}
//  获取社会评价tab
export function wechatSocieGetOrgType(params) {
  return fetch(`${baseUrl}wechatNotice/wechatSocieGetOrgType`, params)
}
//  绩效考核的评论
export function batchInstruction(params) {
  return fetch(`${baseUrl}wechatNotice/batchInstruction`, params)
}
// 指标管理评论
export function indexInstruction(params) {
  return fetch(`${baseUrl}wechatNotice/indexInstruction`, params)
}
// 根据社会评价的tab 拿到对应的数据
export function wechatSocieGetList(params) {
  return fetch(`${baseUrl}wechatNotice/wechatSocieGetList`, params)
}
//  根据id 获得具体的题目
export function wechatSocieGetSurveyInfo(surveyId) {
  return fetch(`${baseUrl}wechatNotice/wechatSocieGetSurveyInfo/${surveyId}`)
}
//  绩效改进通过页签得到要改进的列表
export function wechatInformProveOrgList(params) {
  return fetch(`${baseUrl}wechatNotice/wechatInformProveOrgList`, params)
}
// 绩效改进-根据机构分采集机构得到数据列表
export function wechatInformProveOrgInproList(params) {
  return fetch(`${baseUrl}wechatNotice/wechatInformProveOrgInproList`, params)
}
// 绩效改进得到采集单位的指标详情
export function wechatInformProveGetProveListByOrgId(params) {
  return fetch(`${baseUrl}wechatNotice/wechatInformProveGetProveListByOrgId`, params)
}
// 绩效改进的反馈列表
export function wechatInformProveGetInstrucTree(surveyId) {
  return fetch(`${baseUrl}wechatNotice/wechatInformProveGetInstrucTree/${surveyId}`)
}
// 绩效改进反馈批示
export function wechatInformProveSubSurvey(params) {
  return fetch(`${baseUrl}wechatNotice/wechatInformProveSubSurvey`, params)
}
// 社会评价反馈列表
export function wechatSocieGetInstrucTree(surveyId) {
  return fetch(`${baseUrl}wechatNotice/wechatSocieGetInstrucTree/${surveyId}`)
}
// 社会评价反馈批示
export function wechatSocieSubSurvey(params) {
  return fetch(`${baseUrl}wechatNotice/wechatSocieSubSurvey`, params)
}
// // 根据机构id获取管理人员信息
// export function getUserListByOrgId(orgId) {
//   return fetch(`${baseUrl}/percenter/getUserListByOrgId/${orgId}`)
// }
