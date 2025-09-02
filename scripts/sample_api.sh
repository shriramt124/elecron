
#!/bin/bash
# sample_api.sh
# Sample API Mock Data Script for Linux/Bash
# This script returns mock JSON data for testing

cat << 'EOF'
{
  "status": "success",
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "active": true
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "active": true
    },
    {
      "id": 3,
      "name": "Peter Jones",
      "email": "peter.jones@example.com",
      "active": true
    }
  ],
  "server_info": {
    "timestamp": "$(date -Iseconds)",
    "hostname": "$(hostname)",
    "os": "Linux",
    "shell_version": "$BASH_VERSION"
  },
  "metadata": {
    "source": "Bash Mock API",
    "timestamp": "$(date -Iseconds)"
  }
}
EOF
