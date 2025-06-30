from sqlalchemy import event
from sqlmodel import create_engine

engine = create_engine("sqlite:///database.db", echo=True)

@event.listens_for(engine, "connect")
def enable_foreign_keys(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
