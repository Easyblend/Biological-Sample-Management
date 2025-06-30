from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List
from ..database import engine
from ..models import BioSample, BioSampleBase, BioSampleRead
from ..crud import sample as crud_sample

router = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session

@router.post("/", response_model=BioSample)
def create(sample: BioSampleBase, session: Session = Depends(get_session)):
    return crud_sample.create_sample(sample, session)

@router.get("/", response_model=List[BioSample])
def read_all(session: Session = Depends(get_session)):
    return crud_sample.get_samples(session)


@router.get("/{sample_id}", response_model=BioSampleRead)
def read_one(sample_id: int, session: Session = Depends(get_session)):
    sample = crud_sample.get_sample(sample_id, session)
    if not sample:
        raise HTTPException(status_code=404, detail="Sample not found")
    return sample

@router.put("/{sample_id}", response_model=BioSample)
def update(sample_id: int, new_data: BioSampleBase, session: Session = Depends(get_session)):
    return crud_sample.update_sample(sample_id, new_data, session)

@router.delete("/{sample_id}")
def delete(sample_id: int, session: Session = Depends(get_session)):
    return crud_sample.delete_sample(sample_id, session)
