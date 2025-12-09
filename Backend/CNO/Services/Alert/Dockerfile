# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Backend/Alerting/Alerting.csproj", "Alerting/"]
RUN dotnet restore "Alerting/Alerting.csproj"

# Copy the rest of the source code
COPY Backend/Alerting/. ./Alerting
WORKDIR /src/Alerting

# Build the project
RUN dotnet publish "Alerting.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose port (adjust if different)
EXPOSE 5000

# Environment variables (optional)
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
ENV DOTNET_LOGGING__CONSOLE__DISABLECOLORS=false

# Entry point
ENTRYPOINT ["dotnet", "Alerting.dll"]
