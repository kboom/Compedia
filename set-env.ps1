
# This script loads secrets into your environment when the application is started through launch config.
# It is based on your local .env file which is ignored in this repository to avoid storing secrets in public.

Get-Content .\.env | ForEach-Object {
    [System.Environment]::SetEnvironmentVariable('Compedia_','AZ_Resource_Group')
}
