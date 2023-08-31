/**
 * This file includes code modified from the following source:
 * https://github.com/toss/slash/blob/main/packages/common/utils/src/Numbers.ts
 *
 * Copyright (c) 2021 Viva Republica, Inc
 *
 * MIT License
 * https://github.com/toss/slash/blob/main/LICENSE
 */

const units = [
  '',
  '십',
  '백',
  '천',
  '만',
  '십',
  '백',
  '천',
  '억',
  '십',
  '백',
  '천',
  '조',
  '십',
  '백',
  '천',
  '경',
];

function chunk(value: number | string, byDigits: number) {
  const result: number[] = [];
  const source = String(value);

  for (let end = source.length; end >= 1; end = end - byDigits) {
    const start = Math.max(end - byDigits, 0);
    const slice = source.slice(start, end);

    result.push(Number(slice));
  }

  return result;
}

function createNumberFormatterBy(formatter: (_: number) => number) {
  return function formatNumber(value: number, unit: number) {
    if (unit < 1) {
      // 부동소수점 오류 때문에 unit < 1인 경우 특별 처리
      const reciprocal = 1 / unit;

      return formatter(value * reciprocal) / reciprocal;
    }

    return formatter(value / unit) * unit;
  };
}

export const ceilToUnit = createNumberFormatterBy(Math.ceil);
export const floorToUnit = createNumberFormatterBy(Math.floor);
export const roundToUnit = createNumberFormatterBy(Math.round);

function formatThousands(num: number) {
  const numString = String(num)
    .split('')
    .reverse()
    .map((digit, index) => {
      return digit !== '0' ? `${digit !== '1' ? digit : ''}${units[index]}` : '';
    })
    .reverse()
    .join('');
  return numString;
}

function commaizeNumber(value: string | number) {
  const numStr = String(value);
  const decimalPointIndex = numStr.indexOf('.');
  const commaizeRegExp = /(\d)(?=(\d\d\d)+(?!\d))/g;

  return decimalPointIndex > -1
    ? numStr.slice(0, decimalPointIndex).replace(commaizeRegExp, '$1,') +
        numStr.slice(decimalPointIndex)
    : numStr.replace(commaizeRegExp, '$1,');
}

export function formatToKoreanNumber(
  value: number,
  options: { floorUnit?: number; formatAllDigits?: boolean } = {},
) {
  const flooredVal = floorToUnit(value, options.floorUnit || 1);

  if (flooredVal === 0) {
    return '0';
  }

  return chunk(flooredVal, 4)
    .reduce((prevFormatted, currChunkNum, index) => {
      if (currChunkNum === 0) {
        return prevFormatted;
      }

      const val = options.formatAllDigits
        ? formatThousands(currChunkNum)
        : commaizeNumber(currChunkNum);
      const unit = units[index * 4];

      return `${val}${unit} ${prevFormatted}`;
    }, '')
    .trim();
}

export function formatToKoreanNumberWithUnit(
  value: number,
  unit: string,
  options: {
    // default: true
    shouldHaveSpaceBeforeUnit?: boolean;
    floorUnit?: number;
    ceilUnit?: number;
    formatAllDigits?: boolean;
  } = {},
) {
  const flooredVal = floorToUnit(value, options.floorUnit || 1);
  const ceiledVal = ceilToUnit(flooredVal, options.ceilUnit || 1);

  if (flooredVal === 0) {
    return '0';
  }

  const formattedVal = formatToKoreanNumber(ceiledVal, {
    floorUnit: options.floorUnit,
    formatAllDigits: options.formatAllDigits,
  });

  return options.shouldHaveSpaceBeforeUnit === true
    ? `${formattedVal} ${unit}`
    : `${formattedVal}${unit}`;
}
