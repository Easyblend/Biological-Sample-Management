from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from sqlalchemy import ForeignKey


class CommentBase(SQLModel):
    comment_text: str
    sample_id: int = Field(foreign_key="biosample.id") 

class Comment(CommentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sample: Optional["BioSample"] = Relationship(back_populates="comments")

    class Config:
        orm_mode = True
