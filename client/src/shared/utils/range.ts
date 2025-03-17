export function range (start: number, end: number, step: number = 1): number[] {
  if (end === undefined && start !== undefined) {
    end = start;
    start = 0;
  }

  // step should be negative if end is less than start
  if (end < start && step > 0) {
    step = step * -1
  }


  // if the step is 0 you will never allocate the correct array length
  const stepSize = (step == 0) ? 1 : step
  const size = Math.abs(Math.ceil((end - start) / stepSize))


  // need to exit if there is nothing to return
  if (size == Infinity) {
    return []
  }

  // step has some really odd behavior (from tests)
  //     specifically a step of 0, which seems to repeat the start?
  const incrementStep = (x: any, y: any) =>
    (step == 0) ? start : x + y * step

  return Array(size).
  fill(start).
  map(incrementStep)
}