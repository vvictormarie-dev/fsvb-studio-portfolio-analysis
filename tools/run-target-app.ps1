param(
    [switch]$Help,
    [switch]$Start
)

if ($Help) {
    Write-Host "Consultez docs/how-to/run-target-app.md pour la commande adaptee au stack detecte."
    exit 0
}

$workspacePath = Join-Path $PSScriptRoot "..\\fsvb-studio-portfolio"
$resolvedWorkspacePath = Resolve-Path -Path $workspacePath -ErrorAction SilentlyContinue
$appPath = Join-Path $workspacePath "portfolio-app"
$resolvedAppPath = Resolve-Path -Path $appPath -ErrorAction SilentlyContinue

if (-not $resolvedWorkspacePath) {
    Write-Error "Application cible introuvable. Verifiez que le subtree a bien ete importe dans fsvb-studio-portfolio/."
    exit 1
}

Write-Host "Depot cible detecte dans $resolvedWorkspacePath"

if (-not $resolvedAppPath) {
    Write-Host "Le sous-dossier portfolio-app/ n'a pas ete trouve."
    Write-Host "Lisez docs/how-to/run-target-app.md pour verifier le point d'entree actuel."
    exit 0
}

Write-Host "Application web principale detectee dans $resolvedAppPath"

if (-not $Start) {
    Write-Host "Commande recommandee :"
    Write-Host "  cd fsvb-studio-portfolio"
    Write-Host "  npm run dev"
    Write-Host ""
    Write-Host "Pour lancer directement dans ce terminal sans nouvelle fenetre :"
    Write-Host "  powershell -ExecutionPolicy Bypass -File tools/run-target-app.ps1 -Start"
    exit 0
}

Push-Location $resolvedWorkspacePath
try {
    & npm.cmd run dev
}
finally {
    Pop-Location
}
