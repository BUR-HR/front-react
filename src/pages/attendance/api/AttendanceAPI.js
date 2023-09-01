import { call } from "../../../apis/service"

export const startWork = () => {
    return call("/api/v1/attendance/start", "Post")
}

export const endWork = () => {
    return call("/api/v1/attendance/end", "Put")
}