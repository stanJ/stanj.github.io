let times = 0
function bubbleSort(ary) {
  // 记录最后一次交换位置
  let last_exchange_index = 0
  // 无序数组边界， 每次比较只需比到边界为止
  let sort_boder = ary.length - 1
  for (let i = 0; i < ary.length - 1; i++) {
    console.log('times ', ++times)
    let is_sorted = true
    for (let j = 0; j < sort_boder; j++) {
      // 利用有序标记来提前结束大循环
      if (ary[j] > ary[j+1]) {
        let temp = ary[j]
        ary[j] = ary[j+1]
        ary[j+1] = temp
        is_sorted = false
        last_exchange_index = j
      }
    }
    sort_boder = last_exchange_index
    if (is_sorted) {
      break
    }
  }
}

let ary = [3, 4, 2, 1, 5, 6, 7, 8]
bubbleSort(ary)
// let ary = [5, 8, 6, 3, 9, 2, 1, 7]
// bubbleSort(ary)
console.log('bubble sort ', ary)