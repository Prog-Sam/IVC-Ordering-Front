import _ from 'lodash';
import { getLensParam } from './catalogMethods';
import { formatter } from './formatter';

export function getGradeOptions(lensParamKey) {
  if (!lensParamKey) return { sph: [], cyl: [], add: [] };
  const { minSph, maxSph, minCyl, maxCyl, minAdd, maxAdd } =
    getLensParam(lensParamKey);
  let result = {
    sph: generateGradeOption(minSph, maxSph),
    cyl: generateGradeOption(minCyl, maxCyl),
    axis: generateNumberOption(0, 180, 1),
    add: generateGradeOption(minAdd, maxAdd),
  };

  return result;
}

export function generateGradeOption(min, max, stepBy = 0.25) {
  let result = [];
  if (min == '0.00' && max == '0.00') return [];

  for (let i = parseFloat(min); i <= parseFloat(max); i += parseFloat(stepBy)) {
    result.push(
      i == 0
        ? { label: 'PLANO', value: 'PLANO' }
        : {
            label: i.toFixed(2).toString(),
            value: i.toFixed(2).toString(),
          }
    );
  }
  return result || [];
}

export function generateNumberOption(min, max, stepBy) {
  let result = [];

  for (let i = min; i <= max; i += stepBy) {
    result.push({ label: i, value: i });
  }

  return result;
}

export function isTotalPowerValid(totalPower, lensParamKey) {
  const lensParam = getLensParam(lensParamKey);
  const absoluteTP = Math.abs(parseFloat(totalPower));
  return absoluteTP > parseFloat(lensParam.totalPower) ? false : true;
}

export function applyRules(gradeOptions, rules) {
  let localGradeOptions = gradeOptions;
  let ruleObject = JSON.parse(rules);

  for (let r of ruleObject) {
    localGradeOptions = {
      ...localGradeOptions,
      [getStringField(r.field)]: applyRule(
        r.name,
        r.values || r.value,
        localGradeOptions[getStringField(r.field)]
      ),
    };
  }
}

function getStringField(field) {
  if (field == 0) return 'sph';
  if (field == 1) return 'cyl';
  if (field == 2) return 'add';
  return '';
}

function applyRule(ruleType, values, options = []) {
  if (ruleType == 'stpBy') {
    return generateGradeOption(values.min, values.max, values.value);
  }
  if (ruleType == 'specific') {
    return _.map(values.values, (v) => {
      return { id: v, name: v };
    });
  }
  if (ruleType == 'exclude') {
    if (options.length == 0) return options;
    return _.filter(options, (o) => !_.includes(values.values, o.id));
  }
}
