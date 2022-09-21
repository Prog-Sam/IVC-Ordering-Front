import _ from 'lodash';
import { getLensParam } from './catalogMethods';
import { getSelectOptions } from './reactSelectOption';
import { formatter } from './formatter';

export function getGradeOptions(lensParamKey) {
  if (!lensParamKey) return { sph: [], cyl: [], axis: [], add: [] };
  const { minSph, maxSph, minCyl, maxCyl, minAdd, maxAdd } =
    getLensParam(lensParamKey);
  let result = {
    sph: getSelectOptions(generateGradeOption(minSph, maxSph)),
    cyl: getSelectOptions(generateGradeOption(minCyl, maxCyl)),
    axis: getSelectOptions(generateNumberOption(0, 180, 1)),
    add: getSelectOptions(generateGradeOption(minAdd, maxAdd)),
  };

  return result;
}

export function generateGradeOption(min, max, stepBy = 0.25) {
  let result = [{ name: 'N/A', id: '' }];
  if (min == '0.00' && max == '0.00')
    return [
      { name: 'N/A', id: '' },
      { name: '0.00', id: '0.00' },
    ];

  if (parseFloat(min) < parseFloat(max)) {
    for (
      let i = parseFloat(min);
      i <= parseFloat(max);
      i += parseFloat(stepBy)
    ) {
      result.push(
        i == 0
          ? { name: 'PLANO', id: 'PLANO' }
          : {
              name: i.toFixed(2).toString(),
              id: i.toFixed(2).toString(),
            }
      );
    }
  }
  if (parseFloat(max) < parseFloat(min)) {
    for (
      let i = parseFloat(max);
      i <= parseFloat(min);
      i += parseFloat(stepBy)
    ) {
      result.push(
        i == 0
          ? { name: 'PLANO', id: 'PLANO' }
          : {
              name: i.toFixed(2).toString(),
              id: i.toFixed(2).toString(),
            }
      );
    }
  }

  return result || [{ name: 'N/A', id: '' }];
}

export function generateNumberOption(min, max, stepBy) {
  let result = [{ name: 'N/A', id: '' }];

  for (let i = min; i <= max; i += stepBy) {
    result.push({ name: i.toString(), id: i });
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
