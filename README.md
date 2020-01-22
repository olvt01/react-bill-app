# react-bill-app
react bill app source code.

## Site
http://d2hm2mjdzk8360.cloudfront.net/

## Skills

- Javascript
- React
- Redux
- CSS

## Deployment note

### AWSCLI
```bash
$ pip install awscli
$ aws configure
AWS Access Key ID [None]: ########
AWS Secret Access Key [None]: ########
Default region name [None]: ap-northeast-2
Default output format [None]:
```

### Scripts
package.json:
```javascript
...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "aws s3 sync build/ s3://olvt01-react-bill-app",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

### Deploying with scripts
```
npm run build && npm run deploy
```
