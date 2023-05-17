<#
.Synopsis
   Generate a new encrypted credentials file for authentication use
.DESCRIPTION
   Rather than storing authentication credentials as plain text in a script it is recommended that an encrypted credentials file is used.
   This Cmdlet can be used to generate an encryped credentials file fo ruse in another script.  The credentials fine can only be used from the host it is created on so cannot be shared, copied or moved
.EXAMPLE
   New-EncryptedCredentials c:\Folder\user.cred
.EXAMPLE
   New-EncryptedCredentials $CredFile
#>
Function New-EncryptedCredentials
{
    Param([Parameter(Mandatory=$true)][string]$CredentialsFile)
    $credentials=get-credential
    $credentials | export-clixml -path $CredentialsFile
}
New-EncryptedCredentials