#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Search/Search.csproj", "Search/"]
RUN dotnet restore "Search/Search.csproj"
COPY . .
WORKDIR "/src/Search"
RUN dotnet build "Search.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Search.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
RUN mkdir /docker-entrypoint.d
COPY "docker.entrypoint.sh" .
COPY --from=publish /app/publish .
ENTRYPOINT ["./docker.entrypoint.sh", "dotnet", "Compedia.Search.dll"]