const getMapByValue = (map: Map<any, any>, searchValue: string) => {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
  return undefined;
};

export default getMapByValue;
