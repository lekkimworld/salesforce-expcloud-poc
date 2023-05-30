# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.




```
sfdx org create scratch --set-default -f config/project-scratch-def.json

ORG_ID=`sfdx force:org:display --json | jq ".result.id" -r`
SUFFIX=`echo $ORG_ID`
rm -rf force-app/main/default/connectedApps
mkdir -p force-app/main/default/connectedApps

sfdx force source deploy

ROLE_ID=`sfdx force:data:soql:query -q "select Id from UserRole where Name='Dummy'" --json | jq ".result.records[0].Id" -r`
sfdx force data record update -s User -w "Name='User User'" -v "LanguageLocaleKey=en_US TimeZoneSidKey=Europe/Paris LocaleSidKey=da UserPermissionsInteractionUser=true UserPermissionsKnowledgeUser=true UserRoleId=$ROLE_ID"
 
sfdx apex run -f apex/create_api_only_user.apex

CLIENTCREDS_CLIENT_ID=hackathon_clientcreds_id_$SUFFIX
CLIENTCREDS_CLIENT_SECRET=hackathon_clientcreds_secret_$SUFFIX
CLIENTCREDS_API_USER=`echo $ORG_ID.api.user@example.com | tr '[:upper:]' '[:lower:]'`

cat ./metadataTemplates/connectedApps/Hackathon_ClientCredentials.connectedApp-meta.xml \
    | sed "s|REPLACE_CLIENT_ID|$CLIENTCREDS_CLIENT_ID|" \
    | sed "s|REPLACE_CLIENT_SECRET|$CLIENTCREDS_CLIENT_SECRET|" \
    | sed "s|REPLACE_API_USER|$CLIENTCREDS_API_USER|" \
    > force-app/main/default/connectedApps/Hackathon_ClientCredentials.connectedApp-meta.xml
echo $CLIENTCREDS_CLIENT_ID
echo $CLIENTCREDS_CLIENT_SECRET

openssl genpkey -des3 -algorithm RSA -pass pass:Passw0rd -out server.pass.key -pkeyopt rsa_keygen_bits:2048
openssl rsa -passin pass:Passw0rd -in server.pass.key -out server.key
openssl req -new -key server.key -out server.csr -subj "/C=DK/O=Acme/CN=www.example.com"
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
rm server.pass.key
rm server.csr

JWT_CERTIFICATE=`cat server.crt | tr '\n' ' ' | sed 's/ //g' | cut -c27- | rev | cut -c25- | rev`
JWT_CLIENT_ID=hackathon_jwt_id_$SUFFIX
JWT_CLIENT_SECRET=hackathon_jwt_secret_$SUFFIX

cat ./metadataTemplates/connectedApps/Hackathon_JWT.connectedApp-meta.xml \
    | sed "s|REPLACE_CLIENT_ID|$JWT_CLIENT_ID|" \
    | sed "s|REPLACE_CLIENT_SECRET|$JWT_CLIENT_SECRET|" \
    | sed "s|REPLACE_CERTIFICATE|$JWT_CERTIFICATE|" \
    > force-app/main/default/connectedApps/Hackathon_JWT.connectedApp-meta.xml
echo $JWT_CLIENT_ID
echo $JWT_CLIENT_SECRET

sfdx force source deploy -m ConnectedApp
```