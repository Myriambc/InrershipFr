
const cartesian = (first, ...rest) =>
    rest.length ? first.flatMap(v => cartesian(...rest).map(c => [v].concat(c)))
        : first;
export default cartesian;
