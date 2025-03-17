export interface themeType {
  title?: TitleType
  xAxis: {
    show: Boolean
    name?: String
    nameGap?: Number
    nameTextStyle?: defalutType
    inverse?: Boolean
    axisLabel?: {
      show?: Boolean
      fontSize?: Number
      color?: String
      rotate?: Number
    }
    position?: String
    axisLine?: {
      show?: Boolean
      lineStyle?: {
        color: String
        width?: Number
      }
      onZero?: Boolean
    }
    axisTick?: {
      show?: Boolean
      length?: Number
    }
    splitLine?: {
      show?: Boolean
      lineStyle?: {
        color?: String
        width?: Number
        type?: String
      }
    }
  }
  yAxis?: yAxisType | yAxisType[]
  legend: {
    show?: Boolean
    top?: String
    textStyle: {
      color?: String
    }
  }
  grid: {
    show?: Boolean
    left?: String
    top?: String
    right?: String
    bottom?: String
  }
}

type TitleType = {
  show?: Boolean
  textStyle: {
    color?: String
    fontSize?: Number
  }
  subtextStyle: {
    color?: String
    fontSize?: Number
  }
}

type defalutType = {
  color?: String
  fontSize?: Number
}

type yAxisType = {
  show?: Boolean
  name?: String
  nameGap?: Number
  nameTextStyle: defalutType
  inverse?: Boolean
  axisLabel?: {
    show?: Boolean
    fontSize?: Number
    color?: String
    rotate?: Number
  }
  position?: String
  axisLine?: {
    show?: Boolean
    lineStyle: {
      color?: String
      width?: String
    }
    onZero?: Boolean
  }
  axisTick?: {
    show?: Boolean
    length?: Number
  }
  splitLine: {
    show?: Boolean
    lineStyle: {
      color?: String
      width?: Number
      type?: String
    }
  }
}
