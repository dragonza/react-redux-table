import { createSelector } from 'reselect';

// export const laneListSelector = (state) => Object.values(state.laneList);
//
// export const noteListSelector = (state) => Object.values(state.noteList);
// export const noteIdListByLane = (state, props) => props.lane.notes;
// export const noteListByLane = createSelector(
//   noteListSelector,
//   noteIdListByLane,
//   (noteList, noteIdByLane) => {
//     return noteIdByLane
//       .map(noteId => noteList.find(note => note.id === noteId))
//       .filter(Boolean);
//   },
// );

export const studentsListSelector = (state) => Object.values(state.students);
export const orderKind = (state) => state.setSort.order;
export const orderCate = (state) => state.setSort.orderBy;
export const sortedStudentList = createSelector(
  [studentsListSelector, orderKind, orderCate],
  (list, order, orderBy) => {
    let orderByCate;
    if (orderBy === 'StudentId') {
      orderByCate = 'id';
    } else {
      orderByCate = orderBy;
    }
    return order === 'desc'
      ? list.sort((a, b) => (b[orderByCate] < a[orderByCate] ? -1 : 1))
      : list.sort((a, b) => (a[orderByCate] < b[orderByCate] ? -1 : 1));
  },
);
