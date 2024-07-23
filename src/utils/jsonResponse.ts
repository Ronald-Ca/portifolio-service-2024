export function responseSuccess<T>(message: string, data: T | null = null, status = 200) {
    return {
        status,
        message,
        data
    }
}

export function responseError<T>(errors?: string[], data: T | null = null, status = 400) {
    return {
        status,
        errors,
        data
    }
}