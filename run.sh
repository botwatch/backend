git pull
dotnet build -c Release
dotnet publish -c Release --output ./production
cp -a /botwat.ch/Web/build/. /production/Web/build/
dotnet ./production/botwat.ch.dll