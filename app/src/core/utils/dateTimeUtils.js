import moment from 'moment';

const dateTime2String = (value, format='DD/MM/YYYY HH:MM:SS') => {
  return moment(value).format(format);
};

function dateToTimeAgo(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const now = new Date(Date.now());
  const difftime = now.getTime() - date.getTime();
  const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
  const [sec, min, hr, day, month] = [
    diffDate.getSeconds(),
    diffDate.getMinutes(),
    diffDate.getHours(),
    diffDate.getDate() - 1,
    diffDate.getMonth(),
  ];
  const f = (property, end) => {
    // console.log(property,end)
    return `${property} ${end}${property > 1 ? "s" : ""} ago`;
  }
  // console.log(diffDate.toLocaleString());
  return month >= 1
    ? f(month, "month")
    : day >= 1
      ? f(day, "day")
      : hr >= 1
        ? f(hr, "hr")
        : min >= 1
          ? f(min, "min")
          : day >= 1
            ? f(sec, "sec")
            : "";


  throw new Error("Date To time ago not implmented");
}

export { dateTime2String, dateToTimeAgo };
