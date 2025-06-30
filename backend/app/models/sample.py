# models/sample.py

from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import date
from .comment import Comment

class CommentRead(SQLModel):
    id: int
    comment_text: str
    sample_id: int


class BioSampleBase(SQLModel):
    sample_type: str
    location: str
    operator: str
    created_at: date
    


class BioSample(BioSampleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    comments: List[Comment] = Relationship(
        back_populates="sample",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )

class BioSampleRead(BioSampleBase):
    id: int
    comments: List[CommentRead] = []
