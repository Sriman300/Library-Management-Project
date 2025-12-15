// frontend/assets/js/state/store.js

// Global app state
let state = {
  editingId: null,  // which book is being edited
  books: []         // list of all books
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}
