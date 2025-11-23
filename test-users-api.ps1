# Test Users API
Write-Host "Testing Users API..." -ForegroundColor Cyan

# Login
$body = @{
    email = "admin@nardarena.ir"
    password = "admin123456"
} | ConvertTo-Json

try {
    $login = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Login successful!" -ForegroundColor Green
    
    $token = $login.data.tokens.accessToken
    
    # Get users
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $result = Invoke-RestMethod -Uri "http://localhost:3002/api/users?page=1&limit=20" -Method Get -Headers $headers
    
    Write-Host "`n✅ Users fetched successfully!" -ForegroundColor Green
    Write-Host "Total users in database: $($result.data.total)" -ForegroundColor Yellow
    Write-Host "Users on this page: $($result.data.users.Count)" -ForegroundColor Yellow
    Write-Host "Total pages: $($result.data.totalPages)" -ForegroundColor Yellow
    
    Write-Host "`nAll 12 users from database:" -ForegroundColor Cyan
    $result.data.users | Select-Object id, username, email, role, status | Format-Table -AutoSize
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
