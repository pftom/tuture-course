function judgeDataFormat(format) {
  if (dataFormat.includes(format)) {
    return true;
  }
  return false;
}

function judgeChartType(type) {
  if (chartType.includes(type)) {
    return true;
  }
  return false;
}

function judgeValid(type, formt) {
  if (judgeChartType(type) && judgeDataFormat(format)) {
    return true;
  }
  return false;
}

