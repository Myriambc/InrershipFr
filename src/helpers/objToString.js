function objToString(obj) {
  let str = "?";
  for (const [p, val] of Object.entries(obj)) {
    if (Array.isArray(val)) {
      str += `${p}[gte]=${val[0]}&${p}[lte]=${val[1]}&`;
    } else {
      str += `${p}=${val}&`;
    }
  }
  return str.slice(0, -1);
}

export default objToString;
