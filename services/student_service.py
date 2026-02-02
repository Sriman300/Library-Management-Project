from database.student_queries import (
    db_get_all_students,
    db_get_one_student,
    db_create_student,
    db_update_student,
    db_delete_student
)

# ------------------- Services -------------------

def service_get_all_students():
    return db_get_all_students()


def service_get_one_student(student_id):
    return db_get_one_student(student_id)


def service_create_student(data):
    required_fields = ["name", "email", "phone"]

    for field in required_fields:
        if not data.get(field):
            raise ValueError(f"{field} is required")

    return db_create_student(data)


def service_update_student(student_id, data):
    if not service_get_one_student(student_id):
        return None

    return db_update_student(student_id, data)


def service_delete_student(student_id):
    return db_delete_student(student_id)
