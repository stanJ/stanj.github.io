// 快速排序 采用分治法 单边循环
// 由于递归需要借助栈空间，所以空间复杂度为O(logn)
function quickSort(ary) {

  partition(ary, 0, ary.length - 1)

  function partition(ary, start_index, end_index) {
    if (start_index > end_index) {
      return
    }
    let random_index = Math.floor(Math.random() * (end_index - start_index)) + start_index
    let temp = ary[start_index]
    ary[start_index] = ary[random_index]
    ary[random_index] = temp
    let pivot = ary[start_index]
    let mark = start_index
    for (let i = start_index + 1; i <= end_index; i++) {
      if (ary[i] < pivot) {
        mark++
        let temp = ary[i]
        ary[i] = ary[mark]
        ary[mark] = temp
      }
    }
    ary[start_index] = ary[mark]
    ary[mark] = pivot
    partition(ary, start_index, mark - 1)
    partition(ary, mark + 1, end_index)
  }

}


let ary = [4, 7, 3, 5, 6, 2, 8, 1]
quickSort(ary)
console.log('ary ', ary)