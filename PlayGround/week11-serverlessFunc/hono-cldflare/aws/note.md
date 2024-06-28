*aws netwrok*

- http default port: 80
- https default port: 443



*Install SSH using powershell*

- Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
- # Install the OpenSSH Client
 - Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

- # Install the OpenSSH Server
  - Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
  - start service and and other stuff using below cmd

- Ref link: https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=powershell#install-openssh-for-windows

*What is icacls?*

# icacls stands for Integrity Control Access Control Lists. It's a command-line utility in Windows used to view and modify access control lists (ACLs) for files and directories. ACLs are used to define the permissions that users and groups have for accessing objects like files and directories.

- whoami -> to check the username of the system
- icacls "D:\vaibhav-password.pem" /inheritance:r
- icacls "D:\vaibhav-password.pem" /grant VAIBHAV\vaibh:F
- icacls "D:\vaibhav-password.pem" /remove "BUILTIN\Administrators"
- icacls "D:\vaibhav-password.pem" /remove "NT AUTHORITY\SYSTEM"
- icacls "D:\vaibhav-password.pem" /remove "BUILTIN\Users"
- icacls "D:\vaibhav-password.pem"   ===>o/p: VAIBHAV\vaibh:(F)
- ssh -i "D:\vaibhav-password.pem" ubuntu@54.66.237.169
  - check if internet is present or not

  - example for icacls: icacls "C:\path\to\file" /grant UserOrGroup:(Permissions)

- install nvm on your aws machine
  - https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
  - step 3: follow
- nvm install 20
- cd/to/backend/code
- node index.js

*Reverse Proxy using nginx*
- connect to aws instance
- sudo apt update
- sudo apt install nginx
- npm install -g pm2 //if you want to start server process in the background
- pm2 start index.js
- you need to update IP of aws machine in to the *DNS* of the all the domain
  - sudo rm sudo vi /etc/nginx/nginx.conf //remove the default file and update the code for reverse proxy
  - sudo vi /etc/nginx/nginx.conf // http { server { listen 80; server_name domain_name;} location {proxy_pass http://localhost:8080; etc...} } *repet server & location for other service*
  - update the .conf file of the nginx and restart the nginx

# after running last cmd only the user 'Vaibhav/vaibh' should be having access


*certificate management to run application on https*

- https://certbot.eff.org/
- goto the website and follow along and just by firing few commands we will be able to achieve a certifcate which will enable to run the website securely on port 443 aka https

- aws: *route 53*, for DNS update if you are using GOdaddy
- elastic ip, if we want to create a static ip and allocate it to any istance as, whenever we stop the instance and start it again, the IP changes