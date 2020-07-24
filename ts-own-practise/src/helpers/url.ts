import {isDate,isPlainObject} from './util'
function enCode(val:string):string {
    return encodeURIComponent(val)
            .replace(/%40/g,'@')
            .replace(/%3A/ig,':')
            .replace(/%24/g,'$')
            .replace(/%2C/ig,',')
            .replace(/%20/g,'+')
            .replace(/%5B/ig,'[')
            .replace(/%5D/ig,']')
}
export function buildUrl(url: string, params?:any) :string {
    if(!params) {
        return url
    }
    const parts: string[] = []
    Object.keys(params).forEach((key) => {
        const val = params[key]
        if(val === null || val === undefined) {
            return
        }
        let values = []
        if(Array.isArray(val)) {
            values = val
            key+= '[]'
        } else {
            values = [val]
        }
        values.forEach((v,i,a) => {
            if(isDate(v)) {
                v = v.toISOString()
            } else if (isPlainObject(v)) {
                v = JSON.stringify(v)
            }
            parts.push(`${enCode(key)}=${enCode(v)}`)
        })
    })
    let serializedParams = parts.join('&')
    if(serializedParams) {
        const markIndex = url.indexOf('#')
        if(markIndex !== -1) {
            url = url.slice(0,markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') +  serializedParams
    }
    return url
}