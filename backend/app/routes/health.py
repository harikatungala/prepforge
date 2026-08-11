from fastapi import APIRouter

router = APIRouter(prefix="/api/health", tags=["health"])


@router.get("")
def health_check():
    """
    Health check endpoint to verify API is running.
    """
    return {
        "status": "healthy",
        "message": "PrepForge API is running",
    }


@router.get("/ready")
def readiness_check():
    """
    Readiness check endpoint to verify database connection.
    """
    # TODO: Add database connection check
    return {
        "status": "ready",
        "message": "PrepForge API is ready to accept requests",
    }
