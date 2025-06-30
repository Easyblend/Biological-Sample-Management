from fastapi import HTTPException
from sqlmodel import Session, select
from typing import List
from ..models import Comment, CommentBase, BioSample

def create_comment(comment: CommentBase, session: Session) -> Comment:
    sample = session.get(BioSample, comment.sample_id)
    if not sample:
        raise HTTPException(status_code=404, detail="BioSample not found")
    db_comment = Comment(**comment.dict())
    session.add(db_comment)
    session.commit()
    session.refresh(db_comment)
    return db_comment

def get_comments(session: Session) -> List[Comment]:
    return session.exec(select(Comment)).all()

def get_comment(comment_id: int, session: Session) -> Comment:
    comment = session.get(Comment, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

def update_comment(comment_id: int, new_data: CommentBase, session: Session) -> Comment:
    comment = get_comment(comment_id, session)
    for key, value in new_data.dict().items():
        setattr(comment, key, value)
    session.commit()
    session.refresh(comment)
    return comment

def delete_comment(comment_id: int, session: Session):
    comment = get_comment(comment_id, session)
    session.delete(comment)
    session.commit()
    return {"message": f"Comment {comment_id} deleted"}
