docker-compose down

docker build -t zack-back:latest ./zack

docker build -t zack-front:latest ./zack-front

docker-compose up --build --force-recreate --remove-orphans