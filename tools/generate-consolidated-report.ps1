param(
    [string]$Name = "synthese-executive"
)

$date = Get-Date -Format "yyyyMMdd-HHmmss"
$templatePath = Join-Path $PSScriptRoot "..\\docs\\templates\\report-synthese-executive.md"
$outputDir = Join-Path $PSScriptRoot "..\\reports\\consolidated"
$outputPath = Join-Path $outputDir ("{0}-{1}.md" -f $date, $Name)

if (-not (Test-Path $templatePath)) {
    Write-Error "Template introuvable : $templatePath"
    exit 1
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
Copy-Item -Path $templatePath -Destination $outputPath -Force

Write-Host "Rapport consolide initialise : $outputPath"
