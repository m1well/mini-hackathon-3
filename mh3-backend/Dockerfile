FROM eclipse-temurin:24-jre-alpine

ARG JAR_FILE=target/*.jar
ENV TZ=Europe/Berlin

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
