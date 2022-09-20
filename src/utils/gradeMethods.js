export function validateGrade(grade, stringTp) {
  const id = grade.id;
  const add = !grade.add ? 0 : parseFloat(grade.add.value);
  const axis = !grade.axis ? '' : parseFloat(grade.axis.value);
  const cyl = !grade.cyl ? 0 : parseFloat(grade.cyl.value);
  const sph = !grade.sph ? 0 : parseFloat(grade.sph.value);
  const pd = isNaN(parseFloat(grade.pd)) ? 0 : parseFloat(grade.pd);
  const qty = isNaN(parseFloat(grade.qty)) ? 0 : parseFloat(grade.qty);
  const tp = isNaN(parseFloat(stringTp)) ? 0 : parseFloat(stringTp);
  let result = { id };

  if (qty == 0) return result;

  if (sph != 0) {
    if (qty == 0)
      result.qty = `Quantity of id: ${id} can't be empty while SPH has a value`;
  }
  if (cyl != 0) {
    if (axis == '')
      result.axis = `Axis of id: ${id} can't be empty while CYL has a value`;
  }

  if (validateTp(sph, cyl, add, tp)) {
    result.tp = `Please Check the Total Power and grade of the item with id: ${id}`;
  }

  return result;
}

export function validateTp(sph, cyl, add, tp) {
  if (tp == 0) return false;
  if (tp) return Math.abs(sph + cyl + add) <= tp;
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
