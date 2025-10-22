# ============================
# 1️⃣ Build stage (Maven)
# ============================
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app

# Copier les fichiers Maven
COPY pom.xml .
COPY src ./src

# Compiler et packager l'application
RUN mvn clean package -DskipTests

# ============================
# 2️⃣ Runtime stage (JRE only)
# ============================
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Copier le JAR depuis l’étape précédente
COPY --from=build /app/target/*.jar app.jar

# Exposer le port
EXPOSE 8080

# Variable d’environnement (modifiable au run)
ENV SPRING_PROFILES_ACTIVE=prod

# Lancer l’application
ENTRYPOINT ["java", "-jar", "app.jar"]
