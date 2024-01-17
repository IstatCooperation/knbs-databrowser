type TypeRestResponse = {
    code?: number,
    message?: string,
    data?: any
}

export class RestResponse {
    public static RESPONSE_OK = 1;
    public static RESPONSE_NO_RESULT = 0;           
    public static RESPONSE_ERROR = -1;    

    code: number;
    message: string;
    data: any;

    constructor(options: TypeRestResponse) {
        this.code = options.code;
        this.message = options.message;
        this.data = options.data;
    }
}
