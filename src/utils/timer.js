export default timer = {
  getPrettyTime(milliseconds) {
    const duration = milliseconds / 1000;
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hours * 3600) / 60);
    let seconds = Math.floor(duration - hours * 3600 - minutes * 60);

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    let prettyTime = minutes + ":" + seconds;
    if (hours !== "00") {
      prettyTime = hours + ":" + prettyTime;
    }

    return prettyTime;
  },

  getTime(startTime, endTime) {
    const duration = endTime - startTime;

    return {
      start: startTime,
      end: endTime,
      duration,
      pretty: this.getPrettyTime(duration),
    };
  },
};
