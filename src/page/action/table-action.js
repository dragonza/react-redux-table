import { MERGE_DATA, REMOVE_DATA, SET_DATA } from '../../store/data-action';

const path = 'students';

export const updateInput = (id, value, field) => {
  return MERGE_DATA({
    _path: `${path}.${id}.updateData`,
    _value: {
      [field]: value,
    },
  });
};

export const removeRow = (ids) => {
  return REMOVE_DATA({
    _path: path,
    _value: ids,
  });
};

export const updateRow = (id, updateData) => {
  return MERGE_DATA({
    _path: `${path}.${id}`,
    _value: {
      ...updateData,
    },
  });
};

export const setSort = (order, orderBy) => {
  return SET_DATA({
    _path: 'setSort',
    _value: {
      order,
      orderBy,
    },
  });
};
