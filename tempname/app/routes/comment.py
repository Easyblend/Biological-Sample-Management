from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List
from ..database import engine
from ..models import Comment, CommentBase
from ..crud import comment as crud_comment

router = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session

@router.post("/", response_model=Comment)
def create(comment: CommentBase, session: Session = Depends(get_session)):
    return crud_comment.create_comment(comment, session)

@router.get("/", response_model=List[Comment])
def read_all(session: Session = Depends(get_session)):
    return crud_comment.get_comments(session)

@router.get("/{comment_id}", response_model=Comment)
def read_one(comment_id: int, session: Session = Depends(get_session)):
    return crud_comment.get_comment(comment_id, session)

@router.put("/{comment_id}", response_model=Comment)
def update(comment_id: int, new_data: CommentBase, session: Session = Depends(get_session)):
    return crud_comment.update_comment(comment_id, new_data, session)

@router.delete("/{comment_id}")
def delete(comment_id: int, session: Session = Depends(get_session)):
    return crud_comment.delete_comment(comment_id, session)
