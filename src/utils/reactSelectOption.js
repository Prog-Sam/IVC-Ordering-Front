import _ from 'lodash';

export function getSelectOptions(options) {
  return options.map((opt) => ({
    label: opt.name || opt.type || opt.colorName || opt.modelName,
    value: opt.id,
  }));
}

export function getSelectedOption(id, options) {
  const item = _.find(options, { id });
  return { label: item.name || item.type, label: item.id };
}
