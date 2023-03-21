import { request } from 'umi';
import moment from 'moment';

export const APP_API = {
  App: '/admin/common/app',
  GetUserInfo: '/admin/common/getUserInfo',
  GetAllZdxm: '/admin/common/getAllZdxm',
  LoadJgxx: '/admin/common/loadJgxx',
  LoadCity: '/admin/common/loadCity',
  Upload: '/file/upload',
};

export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  //
  XML = 'application/json;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

// 通用CURD
// form创建
export async function POST_FORM<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    requestType: 'form',
    params: { pageNum: params?.pageNum, pageSize: params?.pageSize },
    data: params,
    ...(options || {}),
  });
}

// form-data创建
export async function POST_FORMDATA<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.POST,
    //headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    processData: false,
    params: { pageNum: params?.pageNum, pageSize: params?.pageSize },
    data: params,
    ...(options || {}),
  });
}

export async function POST_BASE64<T>(
  url: string,
  method?: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: method || MethodEnum.PUT,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    requestType: 'form',
    data: params,
    ...(options || {}),
  });
}

// json创建
export async function POST_JSON<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    requestType: 'json',
    data: params,
    ...(options || {}),
  });
}

// 编辑
export async function PUT<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.PUT,
    data: params,
    ...(options || {}),
  });
}

// 读取
export async function GET<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.GET,
    params,
    ...(options || {}),
  });
}

export async function getShareInfoById<T>(
  url: string,
  headers: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.POST,
    headers: headers,
  });
}
export async function getShareGenSignature<T>(
  url: string,
  headers: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.GET,
    headers: headers,
  });
}

// 删除
export async function DELETE<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.DELETE,
    params,
    data: params,
    ...(options || {}),
  });
}

export async function DOWNLOAD_POST_FORM<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    requestType: 'form',
    responseType: 'blob',
    data: params,
    ...(options || {}),
  });
}
export async function DOWNLOAD_GET<T>(
  url: string,
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<T>(url, {
    method: MethodEnum.GET,
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    requestType: 'form',
    responseType: 'blob',
    params: params,
    ...(options || {}),
  });
}
