# circles-server-node

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"/> <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/aws-232F3E?style=flat-square&logo=Amazonaws&logoColor=white"/>

| <a id="a1"></a>목차          |
| --------------------------- |
| [1. 프로젝트 개요](#1)<br/>    |
| [2. Development setting ](#2)<br/>       |
| [3.  주의사항 ](#3)<br/>       |


<br/>

# <a id="1"></a>[1](#a1). 프로젝트 개요

# <a id="2"></a>[2](#a1). Development setting
## 필요사항
- yarn
- docker
- node
- vscode
  - eslint 확장
  - prettier 확장

## 세팅 방법
- Mac/linux

  👉 아래 순서로 명령어를 입력합니다.
  1. `./init-dev.sh `
     - docker를 통하여 dev db를 생성해줍니다.
  2. `yarn install`
     - node dependency를 설치합니다.
  3. `yarn test`
     - 제대로 세팅이 되었는지 확인하기 위해 jest 기반 test를 진행합니다.
  4. `yarn dev`
     - dev 세팅으로 node를 구동합니다.
     - 이 때 os에 따라 node_env가 자동으로 주입됩니다.
- Windows

  👉 프로젝트 폴더에서 powershell 또는 cmd를 열고 (VScode terminal도 됩니다) 아래 순서로 명령어를 입력합니다.
  
  1. .env 파일을 만든 후 .env.local의 내용을 복사하여 붙여넣습니다.
  2. `docker-compose -f 'docker-compose.yml' up -d --build dev_db redis logger-db`
     - docker를 통하여 dev db를 생성해줍니다.
  3. `yarn install`
     - node dependency를 설치합니다.
  4. `yarn test`
     - 제대로 세팅이 되었는지 확인하기 위해 jest 기반 test를 진행합니다.
  5. `yarn dev`
     - dev 세팅으로 node를 구동합니다.
     - 이 때 os에 따라 node_env가 자동으로 주입됩니다.
 
# <a id="3"></a>[3](#a1). 주의사항


