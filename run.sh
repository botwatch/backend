git pull
dotnet publish -c Release --output ./production
cd production
kill $(ps aux | grep 'botwat.ch.dll' | awk '{print $2}')
dotnet ./botwat.ch.dll &