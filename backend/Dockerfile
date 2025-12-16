FROM python:3.11-slim-buster

WORKDIR /app

COPY ./backend/pyproject.toml ./backend/poetry.lock /app/

RUN pip install poetry
RUN poetry install --no-root

COPY ./backend/app /app/app
COPY ./scripts /app/scripts

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
