
import { AxiosRequestConfig,AxiosPromise, AxiosResponse } from '../types/index'
import {buildUrl} from '../helpers/url'
import xhr from './xhr'
import { transfromRequest,transformResponse} from '../helpers/data'
import {processHeaders} from  '../helpers/headers'
function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res)
    }) 
}

function processConfig(config:AxiosRequestConfig):void {
    config.headers = transformHeaders(config)
    config.url = transformUrl(config)
    config.data = transformRequestData(config )
}

function transformUrl(config:AxiosRequestConfig):string {
    const {url, params} = config
    return buildUrl(url!,params)
}

function transformRequestData(config:AxiosRequestConfig):any {
    const {headers = {},data} = config
    console.log(headers)
    return transfromRequest(data)

}
function transformHeaders(config:AxiosRequestConfig) :any {
    const {headers = {},data} = config
    return processHeaders(headers,data) 
}
function transformResponseData(res: AxiosResponse):AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}

export default axios