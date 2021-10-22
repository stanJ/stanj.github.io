function binarySearch(ary, target) {
  let start = 0
  let end = ary.length - 1
  while(start <= end) {
    let mid = Math.floor((start + end) / 2)
    let midNum = ary[mid]
    if (target > midNum) {
      start = mid + 1
    } else if (target < midNum) {
      end = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

const ary = [6, 8, 9]
let index = binarySearch(ary, 7)
// const ary = [2, 5, 7, 9, 12, 14, 20, 26, 30]
// let index = binarySearch(ary, 7)
console.log('searched index ', index)