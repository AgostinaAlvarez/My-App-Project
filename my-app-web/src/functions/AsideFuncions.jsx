import { aside_options } from "../utils/AsideOptions";

export const updateAsideOptions = (id) => {
  const updateAsideOptions = aside_options.map((item) => {
    if (item.id === id) {
      return { ...item, selected: true };
    }
    return item;
  });
  return updateAsideOptions;
};
