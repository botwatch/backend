FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY botwat.ch/*.csproj ./botwat.ch/
RUN dotnet restore

# copy everything else and build app
COPY botwat.ch/. ./botwat.ch/
WORKDIR /app/botwat.ch
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/botwat.ch/out ./
ENTRYPOINT ["dotnet", "botwat.ch.dll"]