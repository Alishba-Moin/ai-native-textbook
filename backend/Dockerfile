# Use slim Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy poetry files
COPY backend/pyproject.toml backend/poetry.lock ./

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

# Copy app code
COPY backend/app ./app

# Expose port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
