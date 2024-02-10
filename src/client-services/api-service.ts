import { XHRParams, XHRResponse } from "@/src/lib/api";

export default class ApiService {
  constructor() {}

  _executeCall(url, params, authNeeded = false) {
    if (!params) params = {}
    if (!params.method) params.method = 'GET'

    if (authNeeded) {
      if (!params.headers) params.headers = {}
      if (!params.headers.Accept) params.headers.Accept = 'application/json'
    }
    if (params.useXHR) return ApiService._makeXHR(url, params)
    return fetch(url, params).then(response => {
      return response.json()
    })
  }

  static _makeXHR(url: string, params): Promise<XHRResponse> {
    if (!params.method) params.method = 'GET'
    if (!params.responseType) params.responseType = 'json'
    params = params as XHRParams

    let xhr = new XMLHttpRequest()
    xhr.timeout = 15000
    return new Promise((resolve, reject) => {
      xhr.open(params.method, url)
      if (params.headers) {
        for (let header in params.headers) {
          xhr.setRequestHeader(header, params.headers[header])
        }
      }
      xhr.responseType = params.responseType
      xhr.onload = () => {
        const rHeaders = ApiService._parseXHRHeaders(xhr)
        let rBody
        if (params.responseType === 'text') {
          rBody = xhr.responseText ? new String(xhr.responseText) : {}
        } else {
          rBody = xhr.response ? xhr.response : {}
          if (!isNaN(rBody) && !Array.isArray(rBody)) rBody = new Number(rBody)
        }

        let response: XHRResponse = {
          status: xhr.status,
          ok: xhr.status >= 200 && xhr.status < 300,
          statusText: xhr.statusText,
          headers: rHeaders,
          isXHR: true,
          url: xhr.responseURL ? xhr.responseURL : rHeaders['x-request-url'],
          responseXML: xhr.responseType === 'document' ? xhr.responseXML : null,
          body: rBody
        }

        if (!response.ok) {
          reject(response)
        } else {
          resolve(response)
        }
      }
      xhr.ontimeout = function (e) {
        const timeoutError: XHRResponse = {
          error: e,
          status: -1,
          ok: false,
          name: 'HttpTimeouted',
          statusText: 'Request timeout',
          headers: {},
          isXHR: true,
          url: url,
          body: {},
          responseXML: null
        }
        reject(timeoutError)
      }
      xhr.onerror = function (e) {
        let headers = ApiService._parseXHRHeaders(xhr)
        const error: XHRResponse = {
          responseXML: null,
          error: e,
          name: 'HttpErrorResponse',
          status: xhr.status,
          ok: false,
          statusText: xhr.statusText,
          headers: headers,
          isXHR: true,
          url: url,
          body: {}
        }
        reject(error)
      }
      xhr.send(params.body)
    })
  }

  static _parseXHRHeaders(xhr) {
    let arr = xhr.getAllResponseHeaders().replace(/\r?\n[\t ]+/g, ' ')
    let headers = {}
    arr
      .split('\r')
      .map(function (header) {
        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
      })
      .forEach(function (line) {
        let parts = line.split(':')
        let key = parts.shift().trim()
        if (key) {
          let value = parts.join(':').trim()
          headers[key.toLowerCase()] = value
        }
      })
    return headers
  }
}
