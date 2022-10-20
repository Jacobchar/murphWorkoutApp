const timeDiff = (totalTime: string, runStartTime: string) => {
  // Split the time by the separator
  if (totalTime != null && runStartTime != null) {
    var totalTimeSplit: string[] = totalTime.split(':');
    var runStartTimeSplit: string[] = runStartTime.split(':');

    // Compare and subtract each value (assuming that total time is always the greater of the two)
    var totalTimeInSec: number =
      Number(totalTimeSplit[0]) * 60 * 60 +
      Number(totalTimeSplit[1]) * 60 +
      Number(totalTimeSplit[2]);
    var runStartTimeInSec: number =
      Number(runStartTimeSplit[0]) * 60 * 60 +
      Number(runStartTimeSplit[1]) * 60 +
      Number(runStartTimeSplit[2]);

    var timeDiffInSec: number = totalTimeInSec - runStartTimeInSec;

    var hours: string = minTwoDigits(Math.floor((timeDiffInSec % 3600) / 3600));
    var mins: string = minTwoDigits(Math.floor((timeDiffInSec % 3600) / 60));
    var seconds: string = minTwoDigits(Math.floor(timeDiffInSec % 60));
    return `${hours}:${mins}:${seconds}`;
  }
  return '0';
};

const minTwoDigits = (num: number) => {
  return (num < 10 ? '0' : '') + num.toString();
};

export {timeDiff};
