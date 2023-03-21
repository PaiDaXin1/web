import { GET, POST_FORM, POST_BASE64, POST_FORMDATA, PUT, DELETE } from './app';


export async function GetReportPayorder(params: any) {
    console.log("🚀 ~ file: fpService.ts:201 ~ GetReportPayorder ~ params", params)
    return POST_FORM<any>('https://www.fastmock.site/mock/25598054f29999bfb08a6cb9ba4279c4/shangdiandian/biz/reportPayorder/page', params);
  }

  
export async function GetReportPage(params: any) {
    console.log("🚀 ~ file: fpService.ts:201 ~ GetReportPayorder ~ params", params)
    return POST_FORM<any>('https://www.fastmock.site/mock/25598054f29999bfb08a6cb9ba4279c4/shangdiandian/biz/report/page', params);
}
