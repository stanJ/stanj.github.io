/**
 * 根据自己的公式推导
 * 建堆的时间公式为 T = n + log(n+1)
 * 目前看来似乎可以把log(n+1)省略掉
 * 结果是O(n)
 */
/**
 * 从小到大排序需要构建最大堆，然后删除堆顶元素(把堆顶元素和最后一个元素交换位置)，
 * 调整堆，小的元素下沉，产生新的最大堆堆顶
 * 持续进行，最后变为从小到大排序
 * 堆排序最坏时间复杂度稳定在O(nlogn)
 * 快速排序最坏时间复杂度为O(n^2)
 */

function heapSort(ary) {
  // 把无序数组构建成最大堆
  for (let i = Math.floor(ary.length - 2 / 2); i >= 0; i--) {
    downAdjust(ary, i, ary.length)
  }
  console.log('最大堆 ', ary)
  for (let i = ary.length - 1; i > 0; i--) {
    let temp = ary[i]
    ary[i] = ary[0]
    ary[0] = temp
    downAdjust(ary, 0, i)
  }
}

/**
 * 
 * @param {[]} ary 
 * @param {number} parent_index 
 * @param {number} length 数组有效长度
 */
function downAdjust(ary, parent_index, length) {
  // 保存父节点 用于最后的赋值
  let temp = ary[parent_index]
  let child_index = 2 * parent_index + 1
  while (child_index < length) {
    if (child_index + 1 < length && ary[child_index + 1] > ary[child_index]) {
      child_index++
    }
    if (temp >= ary[child_index]) {
      break
    }
    ary[parent_index] = ary[child_index]
    parent_index = child_index
    child_index = 2 * parent_index + 1
  }
  ary[parent_index] = temp
}

let ary = [1, 3, 2, 6, 5, 7, 8, 9, 10, 0]
heapSort(ary)
console.log('heap sort ', ary)