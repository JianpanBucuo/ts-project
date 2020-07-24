import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from '../types/index'
import {parseHeaders} from '../helpers/headers'
import {createError} from '../helpers/error'
export default function xhr(config:AxiosRequestConfig):AxiosPromise {
    return new Promise((resolve, reject) => {
        let {data = null ,url,method = 'get',headers, responseType,timeout } = config
        method = method.toLowerCase()
        const request = new XMLHttpRequest()
        // if(responseType) {
            request.responseType = <XMLHttpRequestResponseType>responseType 
        // }
        request.open(method.toUpperCase(),url!, true )
 
        if(timeout) {
            request.timeout = timeout
        }
        if(data ==null) {

        } else {
            Object.keys(headers).forEach((name) => {
                request.setRequestHeader(name,headers[name])
            })
        }
        request.send(data)
        request.onreadystatechange = function handleLoad() {
            if(request.readyState !== 4) {
                return 
            }
            if(request.status === 0) {
                return 
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
             
            const responseData = responseType !== 'text' ?  request.response
                                                : request.responseText
            const response:AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            } 
            if(response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(`Request failed with status code ${response.status}`,config,null,request,response))
            }
             

        }
        request.onerror = function() {
            reject(createError('Network error',config,null,request))
        }
        request.ontimeout = function() {
            reject(createError(`timeout of ${timeout}`,config,'ECONNABORTED',request))
        }
    })

}
 