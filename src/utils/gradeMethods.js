export function validateGrade(grade, stringTp, mode = 'normal') {
  const id = grade.id;
  const add = !grade.add ? 0 : parseFloat(grade.add);
  const axis = !grade.axis ? '' : parseFloat(grade.axis);
  const cyl = !grade.cyl ? 0 : parseFloat(grade.cyl);
  const sph = !grade.sph ? 0 : parseFloat(grade.sph);
  const pd = isNaN(parseFloat(grade.pd)) ? 0 : parseFloat(grade.pd);
  const qty = isNaN(parseFloat(grade.qty)) ? 0 : parseFloat(grade.qty);
  const tp = isNaN(parseFloat(stringTp)) ? 0 : parseFloat(stringTp);
  let result = { id };

  if (qty == 0 && mode == 'normal') return result;

  if (qty == 0 && mode == 'strict')
    result.qty = `Please check Qty of ID: ${id}`;

  if (sph != 0) {
    if (qty == 0)
      result.qty = `Quantity of ID: ${id} can't be empty while SPH has a value`;
  }
  if (cyl != 0) {
    if (axis == '')
      result.axis = `Axis of ID: ${id} can't be empty while CYL has a value`;
  }

  console.log(!validateTp(sph, cyl, add, tp));
  if (!validateTp(sph, cyl, add, tp)) {
    result.tp = `Please Check the Total Power and grade of the item with ID: ${id}`;
  }

  return result;
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

export function validateTp(sph, cyl, add, tp) {
  if (tp == 0) return true;
  if (tp) return Math.abs(sph + cyl + add) <= Math.abs(tp);
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
