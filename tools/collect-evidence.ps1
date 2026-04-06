param(
    [string]$Name = "evidence"
)

$date = Get-Date -Format "yyyyMMdd-HHmmss"
$baseDir = Join-Path $PSScriptRoot "..\\reports\\evidence"
$outputDir = Resolve-Path -Path $baseDir -ErrorAction SilentlyContinue

if (-not $outputDir) {
    New-Item -ItemType Directory -Force -Path $baseDir | Out-Null
    $outputDir = Resolve-Path -Path $baseDir
}

$filePath = Join-Path $outputDir ("{0}-{1}.md" -f $date, $Name)

@"
# Preuve $Name

- Date : $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
- Source :
- Contexte :
- Observation :
- Lien avec le constat :
"@ | Set-Content -Path $filePath -Encoding UTF8

Write-Host "Preuve initialisee : $filePath"
