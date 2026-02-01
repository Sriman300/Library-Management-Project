// Global app state
let state = {
  editingId: null,   // which student is being edited
  books: [],      // list of all books
  bookshelves: [], // list of all bookshelves
  librarians:[], // list of all librarians
  students: []       // list of all students
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}