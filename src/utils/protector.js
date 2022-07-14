import _ from 'lodash';

export function protection(
  component,
  user = {},
  inclusion = [],
  exclusion = []
) {
  if (!user) return null;

  if (inclusion) {
    return _.includes(inclusion, parseInt(user.access)) ? component : null;
  }

  if (exclusion) {
    return _.includes(exclusion, parseInt(user.access)) ? null : component;
  }

  return component;
}
