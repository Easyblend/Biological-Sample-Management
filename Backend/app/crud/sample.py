from fastapi import HTTPException
from sqlmodel import Session, select
from typing import List
from sqlalchemy.orm import selectinload
from ..models import BioSample, BioSampleBase

def create_sample(sample: BioSampleBase, session: Session) -> BioSample:
    db_sample = BioSample(**sample.dict())
    session.add(db_sample)
    session.commit()
    session.refresh(db_sample)
    return db_sample

def get_samples(session: Session) -> List[BioSample]:
    return session.exec(select(BioSample)).all()

def get_sample(sample_id: int, session: Session):
    statement = select(BioSample).where(BioSample.id == sample_id).options(
        selectinload(BioSample.comments)
    )
    result = session.exec(statement).one_or_none()
    return result

def update_sample(sample_id: int, new_data: BioSampleBase, session: Session) -> BioSample:
    sample = get_sample(sample_id, session)
    for key, value in new_data.dict().items():
        setattr(sample, key, value)
    session.commit()
    session.refresh(sample)
    return sample

def delete_sample(sample_id: int, session: Session):
    sample = get_sample(sample_id, session)
    session.delete(sample)
    session.commit()
    return {"message": f"Sample {sample_id} deleted"}
