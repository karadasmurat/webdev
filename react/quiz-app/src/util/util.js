const timeUnits = {
  MILLISECONDS: 0,
  SECONDS: 1,
  MINUTES: 2,
  HOURS: 3,
  DAYS: 4,
  WEEKS: 5,
};

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;

const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
const SECONDS_IN_WEEK = DAYS_IN_WEEK * SECONDS_IN_DAY;

function toQueryString(obj, applicableFilters) {
  let query = "";
  let queryItemsProcessed = 0;

  for (const property of Object.keys(obj)) {
    if (applicableFilters && !applicableFilters.includes(property)) {
      continue;
    }

    console.log("property:", property);
    if (queryItemsProcessed == 0) {
      query += "?";
    } else {
      query += "&";
    }
    query += `${property}=${encodeURIComponent(obj[property])}`;

    ++queryItemsProcessed;
  }

  return query;
}

const formatDigits = (t) => {
  if (t < 10) {
    return `0${t}`;
  } else {
    return `${t}`;
  }
};

// Simple conversion of seconds to other time units.
// convertSeconds(18002, timeUnits.MINUTES) = 300
const parseSeconds = (duration, isCumulative = true) => {
  let seconds = duration;
  let minutes = Math.floor(duration / SECONDS_IN_MINUTE);
  let hours = Math.floor(duration / SECONDS_IN_HOUR);
  let days = Math.floor(duration / SECONDS_IN_DAY);
  let weeks = Math.floor(duration / SECONDS_IN_WEEK);

  if (isCumulative) {
    seconds = seconds % SECONDS_IN_MINUTE;
    minutes = minutes % MINUTES_IN_HOUR;
    hours = hours % HOURS_IN_DAY;
    days = days % DAYS_IN_WEEK;
  }

  return { seconds, minutes, hours, days, weeks };
};

// ie 140 seconds
// the remaining seconds after whole minutes
// trimTime(140, MINUTES) is 2 hours and 20 minutes: cut 2 hours, return 20 minutes
const trimTime = (duration, unit) => {
  switch (unit) {
    case timeUnits.SECONDS:
      return duration % SECONDS_IN_MINUTE;

    case timeUnits.MINUTES:
      return duration % MINUTES_IN_HOUR;

    case timeUnits.HOURS:
      return duration % HOURS_IN_DAY;

    case timeUnits.DAYS:
      return duration % DAYS_IN_WEEK;

    default:
      break;
  }
};

// type="module"
// ECMAScript modules (ESM)
// With ESM, you use the import and export syntax to work with modules.
export { toQueryString, parseSeconds, formatDigits, timeUnits };

// type = "commonjs"
// module.exports = toQueryString;

// testing purposes
// const settings = { a: 1, level: "easy" };
// console.log("query:", toQueryString(settings));

// console.log(parseSeconds(0));
