from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .db import Base, engine
from . import models
from .deps import get_db, get_current_user, create_access_token
from .schemas import UserCreate, UserOut, LoginRequest, Token


# Password hashing configuration
pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto",
)

# FastAPI app
app = FastAPI(title="Cityscape API")

# CORS so your frontend (e.g. localhost:3000) can talk to the backend during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Create tables in the database (runs once at startup)
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Cityscape backend is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/users", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Sign-up endpoint.
    - Takes email + password.
    - Hashes password.
    - Stores user in Postgres.
    """
    # Hash the raw password using pbkdf2_sha256
    hashed_pw = pwd_context.hash(user.password)

    db_user = models.User(
        email=user.email,
        password_hash=hashed_pw,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/auth/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """
    Login endpoint.
    - Looks up user by email.
    - Verifies password.
    - Returns JWT access token if valid.
    """
    user = db.query(models.User).filter(models.User.email == payload.email).first()

    if not user or not pwd_context.verify(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": user.id})
    return Token(access_token=access_token, token_type="bearer")


@app.get("/auth/me", response_model=UserOut)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    """
    Returns the current logged-in user (based on JWT in Authorization header).
    """
    return current_user