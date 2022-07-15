import _ from 'lodash';

export function whitelisted(inclusion, user) {
  if (!user) return false;
  if (inclusion.length == 0) return true;
  return _.includes(inclusion, parseInt(user.access)) ? true : false;
}

export function blacklisted(exclusion, user) {
  if (!user) return true;
  if (exclusion.length == 0) return false;
  return _.includes(exclusion, parseInt(user.access)) ? false : true;
}

export function showIf(component, user = {}, inclusion = [], exclusion = []) {
  if (!user) return null;

  if (inclusion) {
    return whitelisted(inclusion, user) ? component : null;
  }

  if (exclusion) {
    return blacklisted(exclusion, user) ? null : component;
  }

  return component;
}
