# Contains business logic (validation, processing, rules)
# Does NOT know about HTTP — only works with Python data

from database.borrow_queries import (
    db_get_all_borrows
    , db_get_one_borrow
    , db_create_borrow
    , db_delete_borrow
)

def service_get_all_borrows():
    return db_get_all_borrows()

def service_get_one_borrow(borrow_id):
    return db_get_one_borrow(borrow_id)

def service_create_borrow(data):
    return db_create_borrow(data)

def service_delete_borrow(borrow_id):
    return db_delete_borrow(borrow_id)