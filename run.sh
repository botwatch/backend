git pull
dotnet build -c Release
dotnet publish -c Release --output ./production
dotnet ./production/botwat.ch.dll 