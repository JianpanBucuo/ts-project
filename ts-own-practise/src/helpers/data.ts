import {isDate,isPlainObject} from './util'
import  {stringify} from 'qs'

export function transfromRequest(data: any) :any {
    if(isPlainObject(data)) {
        return JSON.stringify(data)
    } else {
        return data
    }
}
export function transformResponse(data: any): any {
    if(typeof data == 'string') {
        try{
            data = JSON.parse(data)
        }
        catch(e) {

        }
    }
    return data
}