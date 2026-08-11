from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.database import Base, engine
from app.routes import auth, users, health

# Create tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="PrepForge API",
    description="AI-Powered Interview Preparation Platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(health.router)


@app.get("/")
def root():
    """
    Root endpoint - API information.
    """
    return {
        "message": "Welcome to PrepForge API",
        "version": "0.1.0",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/api")
def api_info():
    """
    API information endpoint.
    """
    return {
        "name": "PrepForge API",
        "version": "0.1.0",
        "description": "AI-Powered Interview Preparation Platform",
        "endpoints": {
            "auth": "/api/auth",
            "users": "/api/users",
            "health": "/api/health",
        },
    }
