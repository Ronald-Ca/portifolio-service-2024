export default class InternalError extends Error {
    message: string
    statusCode?: number
    erros?: string | string[] | object | object[]
    keyValue?: object
    code?: number

    constructor(message: string, statusCode?: number, errors?: string | string[] | object | object[] | undefined) {
        super(message)
        this.message = message
        this.statusCode = statusCode

        if (errors) {
            this.erros = errors
        }
    }
}
