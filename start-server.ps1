Set-Location -LiteralPath $PSScriptRoot
& .\.venv\Scripts\python.exe -m http.server 8000 --bind 127.0.0.1
