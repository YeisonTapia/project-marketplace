/* This function sorts the data by the key parameter */
export const orderArray = (data, key) => {
  return data.sort((a,b) => {
    if(b[key] == null){
      return -1
    }
    let response = 0;
    let aValue = parseInt(a[key])
    let bValue = parseInt(b[key])
    if (aValue > bValue) {
      response = 1;
    } else if (aValue < bValue) {
      response = -1;
    }
    return response * -1
  })
}
