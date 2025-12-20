window.ENV = {
  APP_NAME: "Library Management System",
  API_BASE_URL: "/api",
  BOOKS_API: "/api/books",
  LIBRARIANS_API: "/api/librarians", 
  BOOKSHELVES_API: "/api/bookshelves"
};// Global app state
export let state = {
  editingId: null, // which book is being edited
  books: [],
  bookshelf: [], // list of all bookshelves
  librarians: [] // list of all librarians
};

