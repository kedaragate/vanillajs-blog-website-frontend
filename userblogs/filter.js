export default function filter(data, filterParam1, filterParam2) {
  data.filter((ele) => {
    return ele[filterParam1] == filterParam2;
  });
}
