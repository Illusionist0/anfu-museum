import request from '@/utils/request'
// //根据藏品id查询相关信息
// export  function getInfoById(id){
//   return request({
//     url: '/afxCollection/afxCollectionCategory/' + id,
//     method:'get',
//   })
// }

//查询藏品分类信息列表
export function listAfxCollectionCategory(query){
  return request({
    url: '/afxCollection/afxCollectionCategory/list',
    method:'get',
    params:query
  })
}
export function getQrcode(data){
  return request({
    url: '/afxCollection/afxCollectionCategory/getQrcode',
    method:'post',
    data:data
  })
}

//根据年代和质地查询相关藏品
export  function listAfxCollectionByYearsAnd(query){
  return request({
    url: '/afxCollection/afxCollectionCategory/relateList',
    method:'get',
    params:query
  })
}
export function getInfo(id){
  return request({
    url: '/afxCollection/afxCollectionCategory/' + id,
    method:'get',
  })
}

export function get3dInfo(){
  return request({
    url: '/afxCollection/afxCollectionInfo/findnewidlist',
    method:'get',
  })
}
export  function getInfoapi(query) {
  return request({
    url: '/afxCollection/afxCollectionCategory/getInfo',
    method: 'get',
    params: query
  })
}
