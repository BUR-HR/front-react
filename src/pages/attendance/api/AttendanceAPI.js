import { call } from "../../../apis/service"

export const startWork = (AttendanceDTO) => {
    return call("/api/v1/attendance/start", "Post", AttendanceDTO)
}

export const endWork = (AttendanceDTO) => {
    return call("/api/v1/attendance/end", "Put", AttendanceDTO)
}