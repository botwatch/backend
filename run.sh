git pull
dotnet publish -c Release --output production
dotnet run --project ./production --configuration Release