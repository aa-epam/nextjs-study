export type XHRParams = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: object;
    useXHR?: boolean;
    responseType?: '' | "arraybuffer" | "blob" | "document" | "json" | "text";
}

export type XHRResponse = {
    status: number;
    ok: boolean;
    statusText: string;
    headers: object;
    isXHR: boolean;
    url: string;
    responseXML: Document | null;
    body?: object | String | Number;
    error?: any;
    name?: string;
}