npm -C .\src\PixelGift.Web\ run build
dotnet publish -c Release -o publish --self-contained false .\PixelGift.sln
scp -r .\publish\* root@-:/var/pixelgift 