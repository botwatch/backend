git pull
dotnet publish -c Release --output ./production
cp -a /botwat.ch/Web/build/. /production/Web/build/
cd production
dotnet ./botwat.ch.dll