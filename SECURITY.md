# Security Policy

CryptaVault implements classical ciphers for **educational purposes only**.

## Classical Ciphers Are Not Secure

The ciphers in this tool (Caesar, Vigenère, Atbash, Rail Fence) are historical and
easily broken with modern cryptanalysis. Do not use them to protect real data.

## For Real Encryption

Use modern standards:
- **Symmetric**: AES-256-GCM
- **Asymmetric**: RSA-4096 or Ed25519
- **Hashing**: SHA-256 or bcrypt (for passwords)

## Reporting Issues

Open a GitHub issue for bugs or UI problems.
