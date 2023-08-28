export const formattedDate = (time) => {
    if (!time) return;

    const originalDate = new Date(time);

    // 년, 월, 일, 시, 분, 초를 추출
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 패딩
    const day = String(originalDate.getDate()).padStart(2, "0");
    const hours = String(originalDate.getHours()).padStart(2, "0");
    const minutes = String(originalDate.getMinutes()).padStart(2, "0");
    const seconds = String(originalDate.getSeconds()).padStart(2, "0");

    // 원하는 포맷으로 날짜와 시간을 조합
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
};

export const formatElapsedTime = (timeInMiliSeconds) => {
    const timeInSeconds = parseInt(timeInMiliSeconds / 1000);
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};