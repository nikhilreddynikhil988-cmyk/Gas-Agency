# ============================================
# Gas Agency - Pre-Deployment Setup Script
# ============================================

Write-Host "🚀 Preparing Gas Agency for Deployment..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is initialized
Write-Host "📋 Step 1: Checking Git status..." -ForegroundColor Yellow
if (Test-Path .git) {
    Write-Host "✅ Git repository found" -ForegroundColor Green
} else {
    Write-Host "❌ Git not initialized. Run: git init" -ForegroundColor Red
    exit 1
}

# Step 2: Check for sensitive files
Write-Host ""
Write-Host "📋 Step 2: Checking for sensitive files..." -ForegroundColor Yellow
if (Test-Path "config/config.env") {
    Write-Host "⚠️  config.env exists - ensure it's in .gitignore" -ForegroundColor Yellow
    $gitignoreContent = Get-Content .gitignore -Raw
    if ($gitignoreContent -match "config/config.env") {
        Write-Host "✅ config.env is in .gitignore" -ForegroundColor Green
    } else {
        Write-Host "❌ config.env NOT in .gitignore! Add it now!" -ForegroundColor Red
    }
}

# Step 3: Check for client .env
Write-Host ""
Write-Host "📋 Step 3: Checking client environment..." -ForegroundColor Yellow
if (Test-Path "client/.env") {
    Write-Host "✅ client/.env exists" -ForegroundColor Green
    Write-Host "⚠️  Remember: Don't commit client/.env to git" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  client/.env not found - create it if needed" -ForegroundColor Yellow
}

# Step 4: Test build
Write-Host ""
Write-Host "📋 Step 4: Testing production build..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

Set-Location client
Write-Host "Building React app..." -ForegroundColor Gray
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Client build failed!" -ForegroundColor Red
    Write-Host $buildResult
    Set-Location ..
    exit 1
}
Set-Location ..

# Step 5: Check package.json scripts
Write-Host ""
Write-Host "📋 Step 5: Verifying deployment scripts..." -ForegroundColor Yellow
$packageJson = Get-Content package.json | ConvertFrom-Json
if ($packageJson.scripts."heroku-postbuild") {
    Write-Host "✅ heroku-postbuild script found" -ForegroundColor Green
} else {
    Write-Host "❌ heroku-postbuild script missing!" -ForegroundColor Red
}

# Step 6: Show git status
Write-Host ""
Write-Host "📋 Step 6: Current Git status..." -ForegroundColor Yellow
git status --short

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Pre-Deployment Check Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Review changes: git status" -ForegroundColor White
Write-Host "2. Add files: git add ." -ForegroundColor White
Write-Host "3. Commit: git commit -m 'Ready for deployment'" -ForegroundColor White
Write-Host "4. Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "5. Deploy to Render (see deployment_guide.md)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Important Reminders:" -ForegroundColor Yellow
Write-Host "- Set environment variables on Render" -ForegroundColor White
Write-Host "- Update MongoDB Atlas to allow Render IPs (0.0.0.0/0)" -ForegroundColor White
Write-Host "- Create an admin user after deployment" -ForegroundColor White
Write-Host ""
