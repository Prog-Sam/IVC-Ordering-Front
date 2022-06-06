export function formatter(item, format) {
  let result = format;
  result = result + item.toString();
  return result.substring(item.toString().length);
}
