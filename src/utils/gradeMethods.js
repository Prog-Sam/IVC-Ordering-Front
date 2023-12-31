export function validateGrade(
  grade,
  stringTp,
  mode = 'normal',
  isContactLens = false
) {
  const id = grade.id;
  const add = isNaN(parseFloat(grade.add)) ? '' : parseFloat(grade.add);
  const axis = isNaN(parseFloat(grade.axis)) ? '' : parseFloat(grade.axis);
  const cyl = isNaN(parseFloat(grade.cyl)) ? '' : parseFloat(grade.cyl);
  const sph = isNaN(parseFloat(grade.sph)) ? '' : parseFloat(grade.sph);
  const pd = isNaN(parseFloat(grade.pd)) ? 0 : parseFloat(grade.pd);
  const qty = isNaN(parseFloat(grade.qty)) ? 0 : parseFloat(grade.qty);
  const tp = isNaN(parseFloat(stringTp)) ? 0 : parseFloat(stringTp);
  let result = { id };

  if (qty == 0 && mode == 'normal') return result;

  if (qty == 0 && mode == 'strict')
    result.qty = `Please check Qty of ID: ${id}`;

  if (sph != '') {
    if (qty == 0)
      result.qty = `Quantity of ID: ${id} can't be empty while SPH has a value`;
  }

  if (cyl != '') {
    if (axis === '')
      result.axis = `Axis of ID: ${id} can't be empty while CYL has a value`;
  }

  if (!validateTp(sph, cyl, add, tp, isContactLens)) {
    result.tp = `Please Check the Total Power and grade of the item with ID: ${id}`;
  }
  console.log(result);

  return result;
}

export function generateGradeString(grade) {
  if (!grade) return '0|0|0|0|0|0';
  const { add, axis, cyl, sph, pd, qty } = grade;
  if (qty == '' || qty == '0' || isNaN(parseFloat(qty))) return '0|0|0|0|0|0';
  return `${sph || 0}|${cyl || 0}|${axis || 0}|${add || 0}|${pd || 0}|${
    qty || 0
  }`;
}

export function generateGradeObject(grade, id) {
  if (grade == '|||||' || grade == '0|0|0|0|0|0' || grade == '')
    return {
      id,
      sph: '',
      cyl: '',
      axis: '',
      add: '',
      pd: '',
      qty: '',
    };

  const gradeArray = grade.split('|');
  let gradeObject = {
    id,
    sph: gradeArray[0],
    cyl: gradeArray[1],
    axis: !gradeArray[2] ? gradeArray[2] : parseInt(gradeArray[2]),
    add: gradeArray[3],
    pd: gradeArray[4],
    qty: gradeArray[5],
  };

  return gradeObject;
}

export function validateSo(soDetails) {
  if (!soDetails) return { overall: 'Please fill up SO Details' };
  const horizontal = !soDetails.horizontal
    ? ''
    : parseFloat(soDetails.horizontal);
  const vertical = !soDetails.vertical ? '' : parseFloat(soDetails.vertical);
  const bridge = !soDetails.bridge ? '' : parseFloat(soDetails.bridge);
  const frameType = !soDetails.frameType ? 0 : parseFloat(soDetails.frameType);
  const frameShape = !soDetails.frameShape
    ? 0
    : parseFloat(soDetails.frameShape);
  let result = {};

  if (horizontal == '') result.horizontal = `Horizontal Should have a value`;
  if (vertical == '') result.vertical = `Vertical Should have a value`;
  if (bridge == '') result.bridge = `Bridge Should have a value`;
  if (frameType == '') result.frameType = `Please select Frame Type`;
  if (frameShape == '') result.frameShape = `Please select Frame Shape`;

  return result;
}

export function generateSoString(so) {
  if (!so) return '0|0|0|0|0';
  const { horizontal, vertical, bridge, frameType, frameShape } = so;
  if (
    isNaN(parseFloat(horizontal)) ||
    isNaN(parseFloat(vertical)) ||
    isNaN(parseFloat(bridge)) ||
    isNaN(parseFloat(frameType)) ||
    isNaN(parseFloat(frameShape))
  )
    return '0|0|0|0|0';
  return `${horizontal}|${vertical}|${bridge}|${frameType}|${frameShape}`;
}

export function generateSoObject(so) {
  if (so == '||||' || so == '0|0|0|0|0' || so == '' || !so)
    return {
      horizontal: '',
      vertical: '',
      bridge: '',
      frameType: '',
      frameShape: '',
    };

  const soArray = so.split('|');
  let soObject = {
    horizontal: soArray[0],
    vertical: soArray[1],
    bridge: soArray[2],
    frameType: parseInt(soArray[3]),
    frameShape: parseInt(soArray[4]),
  };

  return soObject;
}

export function validateTp(sph, cyl, add, tp, isContactLens = false) {
  const lAdd = isNaN(parseFloat(add)) ? 0 : add;
  const lCyl = isNaN(parseFloat(cyl)) ? 0 : cyl;
  const lSph = isNaN(parseFloat(sph)) ? 0 : sph;
  if (tp == 0) return true;
  if (isContactLens && tp) return Math.abs(lSph + lCyl) <= Math.abs(tp);
  if (tp) return Math.abs(lSph + lCyl + lAdd) <= Math.abs(tp);
}

export function getTotalQty(grades) {
  let qty = 0;
  for (let grade of grades) {
    qty += isNaN(parseFloat(grade.qty)) ? 0 : parseFloat(grade.qty);
    // qty += parseFloat(grade.qty);
  }
  return qty;
}

export function isGradeDuplicate(grade1, grade2) {
  const add1 = !grade1.add.value ? 0 : parseFloat(grade1.add.value);
  const axis1 = !grade1.axis.value ? '' : parseFloat(grade1.axis.value);
  const cyl1 = !grade1.cyl.value ? 0 : parseFloat(grade1.cyl.value);
  const sph1 = !grade1.sph.value ? 0 : parseFloat(grade1.sph.value);
  const add2 = !grade2.add.value ? 0 : parseFloat(grade2.add.value);
  const axis2 = !grade2.axis.value ? '' : parseFloat(grade2.axis.value);
  const cyl2 = !grade2.cyl.value ? 0 : parseFloat(grade2.cyl.value);
  const sph2 = !grade2.sph.value ? 0 : parseFloat(grade2.sph.value);

  if (add1 != add2) return false;
  if (axis1 != axis2) return false;
  if (cyl1 != cyl2) return false;
  if (sph1 != sph2) return false;

  return true;
}
