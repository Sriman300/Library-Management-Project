# Library-Management-Project

A comprehensive library management system built with Python backend and JavaScript frontend for efficient book, student, librarian, and borrowing management.

## Features
- Book Management
- Student Management
- Librarian Management
- Book Shelves Organization
- Borrowing System
- Profile Management

---

## Diagrams

### Use Case Diagram
```mermaid
graph LR
    Student["Student"]
    Librarian["Librarian"]
    Admin["Admin"]
    System["Library System"]
    
    Student -->|Browse Books| System
    Student -->|Request Borrow| System
    Student -->|View Profile| System
    Librarian -->|Manage Books| System
    Librarian -->|Manage Students| System
    Librarian -->|Process Borrowing| System
    Librarian -->|Manage Bookshelves| System
    Admin -->|System Admin| System
    Admin -->|Manage Librarians| System
```

### Dataflow 0 (Context Diagram)
```mermaid
graph LR
    User["Users<br/>Students/Librarians/Admin"]
    UI["Frontend<br/>UI Components"]
    API["Backend API<br/>Router & Controllers"]
    DB["Database<br/>MySQL"]
    
    User -->|Browser Requests| UI
    UI -->|HTTP API Calls| API
    API -->|Query/Update| DB
    DB -->|Data Response| API
    API -->|JSON Response| UI
    UI -->|Display| User
```

### Dataflow 1 (Detailed System Flow)
```mermaid
graph LR
    Client["Client Application"]
    Router["Router Module"]
    Controller["Controllers<br/>Library Controller"]
    Service["Services<br/>Book/Student/Borrow Service"]
    Query["Database Queries<br/>Query Handlers"]
    Database["Database<br/>Tables"]
    
    Client -->|HTTP Request| Router
    Router -->|Route to Handler| Controller
    Controller -->|Business Logic| Service
    Service -->|Execute Query| Query
    Query -->|SQL Query| Database
    Database -->|Result Set| Query
    Query -->|Data Object| Service
    Service -->|Processed Data| Controller
    Controller -->|Response Object| Router
    Router -->|JSON Response| Client
```

### Dataflow 2 (Borrowing Process Flow)
```mermaid
graph LR
    Student["Student<br/>Request"]
    BorrowUI["Borrow UI<br/>Components"]
    BorrowCtrl["Borrow Controller"]
    BorrowService["Borrow Service<br/>Validation Logic"]
    BookQuery["Book Queries<br/>Check Availability"]
    StudentQuery["Student Queries<br/>Verify Status"]
    BorrowQuery["Borrow Queries<br/>Record Transaction"]
    DB["Database<br/>Update Status"]
    
    Student -->|Submit Borrow Request| BorrowUI
    BorrowUI -->|Form Data| BorrowCtrl
    BorrowCtrl -->|Validate Request| BorrowService
    BorrowService -->|Check Book| BookQuery
    BorrowService -->|Verify Student| StudentQuery
    BookQuery -->|Availability| DB
    StudentQuery -->|Status| DB
    BorrowService -->|Record Borrow| BorrowQuery
    BorrowQuery -->|Insert Record| DB
    DB -->|Confirmation| BorrowCtrl
    BorrowCtrl -->|Success Response| BorrowUI
    BorrowUI -->|Update Display| Student
```

### Entity Relationship Diagram
```mermaid
graph LR
    Student["Student<br/>id, name, email, phone<br/>enrollment_number"]
    Book["Book<br/>id, title, author<br/>isbn, created_by"]
    Bookshelf["Bookshelf<br/>id, name, location<br/>capacity"]
    Librarian["Librarian<br/>id, name, email<br/>phone, department"]
    Borrow["Borrow<br/>id, student_id, book_id<br/>borrow_date, return_date"]
    Profile["Profile<br/>id, user_id<br/>bio, phone"]
    
    Student -->|has many| Borrow
    Book -->|has many| Borrow
    Borrow -->|belongs to| librarian["Librarian<br/>manages"]
    Student -->|has one| Profile
    Book -->|stored in| Bookshelf
    Librarian -->|manages| Book
    Librarian -->|manages| Student
```