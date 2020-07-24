import dispatchRequest  from './dispathRequest'
import { AxiosRequestConfig, AxiosPromise, Method } from '../types/index'

export default class Axios {
    request(config: AxiosRequestConfig):AxiosPromise {
        return dispatchRequest(config)
    }
    _requestMethodWithoutData(method:Method, url: string, config?: AxiosRequestConfig) {
        let configData = Object.assign(config || {}, {
            method,url
        })
        return this.request(
            configData
        )
    }
    _requestMethodWithData(method:Method, url: string, data:any, config?: AxiosRequestConfig) {
        let configData = Object.assign(config || {}, {
            method,url,data
        })
        return this.request(
            configData
        )        
    }
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
      }
    
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
      }
    
      head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
      }
    
      options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
      }
    
      post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
      }
    
      put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
      }
}
