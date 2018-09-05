## 4_MongoDB — MongoDB - CRUD in Express routes

- git clone `https://github.com/STUDY-FULLSTACK/fullstack-with-react-tutorial.git`
- cd fullstack-with-react-tutorial
- git checkout 3_mongoDB (mongod 실행)
- yarn install
- yarn start (mongoDB 연결설명)
- mongoDB 3.1.4
- `assert.equal(null, err)`
- http://localhost:3000/public/login.html (DB에 데이터가 없기때문에 로그인 실패)
- db.users.insert({id:'test01,password:'1234',name:'bts'}) -> 로그인 성공
- 사용자인증 함수 + 라우터
- `callback(null, docs)` 실행 후 docs 전달 -> if(docs) 실행...
- http://localhost:3000/public/adduser.html
- 사용자추가 함수 + 라우터
- db.users.find().pretty()
- moongoose 설명
- git checkout 4_mongoDB_CRUD
- http://localhost:8080/
- server/router.js