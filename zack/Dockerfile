# Fase 1: Construção da aplicação
FROM maven:3.9.0-eclipse-temurin-17 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /app/src
RUN mkdir -p /app/wallet
COPY src/main/resources/wallet /app/wallet
COPY src/main/resources/arquivos /app/arquivos
RUN chmod -R 755 /app/wallet
RUN chmod -R 755 /app/arquivos
RUN mvn clean package

# Fase 2: Configuração do ambiente de runtime
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/zack-0.0.1-SNAPSHOT.jar .
COPY --from=build /app/wallet /app/wallet
COPY --from=build /app/arquivos /app/arquivos

EXPOSE 8080

CMD ["java", "-Doracle.net.tns_admin=/app/wallet", "-jar", "zack-0.0.1-SNAPSHOT.jar"]
