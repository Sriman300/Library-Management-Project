// Global app state for Library Management System
let state = {
  // Books Management
  editingBookId: null,
  books: [],
  
  // Librarians Management  
  editingLibrarianId: null,
  librarians: [],
  
  // Bookshelves Management
  editingBookshelfId: null,
  bookshelves: [],
  
  // Shared UI state
  activeTab: 'books',      // 'books', 'librarians', 'bookshelves'
  searchQuery: '',
  filters: {
    bookCategory: '',
    librarianRole: '',
    shelfZone: ''
  }
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}

// Books-specific state helpers
export function setEditingBook(bookId) {
  setState({ editingBookId: bookId });
}

export function getEditingBook() {
  return state.editingBookId;
}

export function updateBooks(books) {
  setState({ books });
}

// Librarians-specific state helpers
export function setEditingLibrarian(librarianId) {
  setState({ editingLibrarianId: librarianId });
}

export function getEditingLibrarian() {
  return state.editingLibrarianId;
}

export function updateLibrarians(librarians) {
  setState({ librarians });
}

// Bookshelves-specific state helpers
export function setEditingBookshelf(bookshelfId) {
  setState({ editingBookshelfId: bookshelfId });
}

export function getEditingBookshelf() {
  return state.editingBookshelfId;
}

export function updateBookshelves(bookshelves) {
  setState({ bookshelves });
}

// Shared state helpers
export function setActiveTab(tab) {
  setState({ activeTab: tab });
}

export function setSearchQuery(query) {
  setState({ searchQuery: query });
}

export function setFilters(newFilters) {
  setState({ filters: { ...state.filters, ...newFilters } });
}

// Reset all editing states
export function clearEditingStates() {
  setState({
    editingBookId: null,
    editingLibrarianId: null,
    editingBookshelfId: null
  });
}
