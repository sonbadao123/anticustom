param(
    [switch]$NoStartup,
    [switch]$KeepExistingConfig
)

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SourceDir = Join-Path $ScriptDir 'antigravity-custom-theme'
$TargetDir = Join-Path $env:USERPROFILE '.gemini\config\skills\antigravity-custom-theme'

Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  ANTIGRAVITY CUSTOM THEME PRO - CAI DAT 1-CLICK (WINDOWS)  ' -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host ''

if (-not (Test-Path $SourceDir)) {
    Write-Error "Khong tim thay thu muc nguon: $SourceDir"
}

# 1. Check Node.js >= 22
$NodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $NodeCmd) {
    Write-Host '[LOI] Chua cai dat Node.js!' -ForegroundColor Red
    Write-Host 'Hay tai va cai dat Node.js >= 22 LTS tai: https://nodejs.org/' -ForegroundColor Yellow
    Write-Host 'Sau khi cai xong, mo lai file CAI_DAT_WINDOWS.bat.' -ForegroundColor Yellow
    exit 1
}
$NodeExe = $NodeCmd.Source
$NodeVer = (& $NodeExe --version).Trim()
$NodeMajor = [int]((& $NodeExe -p "process.versions.node.split('.')[0]").Trim())
if ($NodeMajor -lt 22) {
    Write-Host "[LOI] Can Node.js >= 22 (hien tai: $NodeVer tai $NodeExe)." -ForegroundColor Red
    Write-Host 'Hay cap nhat Node.js >= 22 LTS tai: https://nodejs.org/' -ForegroundColor Yellow
    exit 1
}
Write-Host "[OK] Node.js $NodeVer ($NodeExe)" -ForegroundColor Green

# 2. Stop existing daemon at target location (avoid file locks)
$TargetPidFile = Join-Path $TargetDir 'daemon.pid'
if (Test-Path $TargetPidFile) {
    $OldPidText = (Get-Content $TargetPidFile -ErrorAction SilentlyContinue | Select-Object -First 1)
    $OldPid = 0
    if ([int]::TryParse(($OldPidText -as [string]), [ref]$OldPid) -and $OldPid -gt 0) {
        $ExistingProc = Get-Process -Id $OldPid -ErrorAction SilentlyContinue
        if ($ExistingProc -and $ExistingProc.ProcessName -eq 'node') {
            Write-Host "[INFO] Dung daemon cu dang chay (PID $OldPid)..." -ForegroundColor Yellow
            Stop-Process -Id $OldPid -Force -ErrorAction SilentlyContinue
            Start-Sleep -Milliseconds 400
        }
    }
    Remove-Item $TargetPidFile -Force -ErrorAction SilentlyContinue
}

# 3. Backup or preserve existing theme_config.json if present
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
$ExistingConfig = Join-Path $TargetDir 'theme_config.json'
$TempKeepConfig = $null
if (Test-Path $ExistingConfig) {
    if ($KeepExistingConfig) {
        $TempKeepConfig = Join-Path $env:TEMP ("agy_theme_config_keep_" + [Guid]::NewGuid().ToString('N') + '.json')
        Copy-Item -Path $ExistingConfig -Destination $TempKeepConfig -Force
        Write-Host '[INFO] Giu nguyen theme_config.json cu (--KeepExistingConfig).' -ForegroundColor Yellow
    } else {
        $Stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
        $BackupPath = Join-Path $TargetDir "theme_config.backup.$Stamp.json"
        Copy-Item -Path $ExistingConfig -Destination $BackupPath -Force
        Write-Host "[INFO] Da sao luu cau hinh cu tai: $BackupPath" -ForegroundColor Yellow
    }
}

# 4. Copy clean theme bundle to permanent Antigravity global skills directory
Write-Host "[INFO] Dang sao chep bo Custom Theme vao: $TargetDir" -ForegroundColor Cyan
$ExcludeNames = @('daemon.log', 'daemon.pid', 'silent-start.vbs')
Get-ChildItem -Force $SourceDir | Where-Object { $ExcludeNames -notcontains $_.Name } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $TargetDir -Recurse -Force
}

if ($TempKeepConfig -and (Test-Path $TempKeepConfig)) {
    Copy-Item -Path $TempKeepConfig -Destination $ExistingConfig -Force
    Remove-Item -Path $TempKeepConfig -Force -ErrorAction SilentlyContinue
}
Write-Host '[OK] Da cai dat bo skill & media vao thu muc co dinh.' -ForegroundColor Green

# 5. Run native Windows installer from permanent directory (sets Startup shortcut & starts daemon)
$WinInstaller = Join-Path $TargetDir 'scripts\install-win.ps1'
Write-Host '[INFO] Dang dang ky khoi dong cung Windows va bat daemon...' -ForegroundColor Cyan
if ($NoStartup) {
    & $WinInstaller -NoStartup
} else {
    & $WinInstaller
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "[LOI] Khong khoi dong duoc daemon (exit=$LASTEXITCODE). Kiem tra: $TargetDir\daemon.log" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 6. Verify live if Antigravity is currently open
Start-Sleep -Milliseconds 1500
Write-Host ''
Write-Host '[INFO] Kiem tra ket noi truc tiep voi Antigravity (CDP)...' -ForegroundColor Cyan
$VerifyJs = Join-Path $TargetDir 'scripts\verify_cdp.js'
$VerifyExit = 1
$PrevEap = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
try {
    & $NodeExe $VerifyJs
    $VerifyExit = $LASTEXITCODE
} catch {
    $VerifyExit = 1
} finally {
    $ErrorActionPreference = $PrevEap
}
if ($VerifyExit -eq 0) {
    Write-Host ''
    Write-Host '[OK] Giao dien Custom Theme da ap dung thanh cong tren Antigravity!' -ForegroundColor Green
} else {
    Write-Host ''
    Write-Host '[INFO] Daemon da chay nen thanh cong!' -ForegroundColor Yellow
    Write-Host '       Neu Antigravity chua mo, hay mo Antigravity len la giao dien tu dong doi ngay.' -ForegroundColor Yellow
    Write-Host '       Neu Antigravity dang mo ma chua doi, hay tat han va mo lai Antigravity.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  HOAN TAT! Ban co the xoa thu muc giai nen nay sau khi cai.' -ForegroundColor Green
Write-Host '  Mo tuy chinh trong Antigravity: nhan "Custom theme" o     ' -ForegroundColor Green
Write-Host '  thanh ben trai (ngay duoi muc Customizations).            ' -ForegroundColor Green
Write-Host '============================================================' -ForegroundColor Cyan
exit 0
