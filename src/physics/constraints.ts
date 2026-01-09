// Constraint 1
const restLength = 100;

function constraintOne(x1: number, x2: number) {
  const delta = x2 - x1;
  const deltaLength = Math.sqrt(delta * delta);
  const diff = deltaLength - restLength / deltaLength;
  x1 -= delta * 0.5 * diff;
  x2 += delta * 0.5 * diff;
}
