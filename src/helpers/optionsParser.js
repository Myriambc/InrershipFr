const escapeValue = (v) => {
  if (typeof v === 'boolean') {
    return Number(v);
  }
  if (typeof v === 'string') {
    return v.trim();
  }
  if(Array.isArray(v)){
    return v.map(arr => arr)
  }
  return v;
};

export const optionsParser = (search, filters, sort, fieldSearchable = null) => {
  const params = [];
  const parsedSearch=[];
  parsedSearch.push(`search=`);
  if (search && search.length) {
    if (fieldSearchable) {
      fieldSearchable.map((field, index)=>{
        return parsedSearch.push(`${field}:${search};`);
      });
      params.push(parsedSearch.join('').slice(0, -1));
    } else {
      params.push(`search=${search}`);
    }
  }
  if (filters && Object.keys(filters).length) {
    params.length = 0;
    const parsedFilters = [];
    Object.keys(filters).map((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        if (filters[key] instanceof Array) {
          if(filters[key][0] instanceof Object) {
            let arr = [];
            Object.keys(filters[key]).forEach(pop => {
              if(filters[key][pop]!== undefined && filters[key][pop] !== null){
                const value = escapeValue(filters[key][pop].id);
                arr.push(value);
              }
            });
            parsedFilters.push(`${key}:${arr};`);
          }
          else{
            const value = escapeValue(filters[key]);
            parsedFilters.push(`${key}:${value};`);

          }
        }
        else{
          const value = escapeValue(filters[key]);
          parsedFilters.push(`${key}:${value};`);
        }
        
      }
    });
      params.push(`search=${parsedFilters.join('').slice(0, -1)}`,);

  }
  if (sort && Object.keys(sort).length) {
    params.push(`orderBy=${sort.accessor}`);
    params.push(`sortedBy=${sort.order}`);
  }
  return params.length ? '&' + params.join('&') : '';
};
export default optionsParser;
