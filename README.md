## 3_MongoDB — Basic, DB, Collection, Document

- RDBMS (Relational Database Management System)
- BSON-바이너리타입의 JSON으로 mongoDB에 성능향상에 도움을 주는 데이터 타입을 제공하며 인코딩, 디코딩이 빠르다 (http://bsonspec.org/faq.html)
- 인덱싱- 예를들어, 데이터를 담고 있는 여러 저장소가 있다고 가정하면. 검색 조건에 맞는 값을 찾기 위해 모든 저장소를 일일이 확인하면서 체크해야합니다. 저장소가 클수록 더 많은 시간이 걸립니다. 자주 조회되는 필드를 따로 저장해서 조회 밑 정렬 시 속도 향상 -> 빠른 쿼리 속도
- Grid File System- 데이터를 하나의 문서에 저장하는 것이 아니라, 여러개로 쪼개 여러 문서에 저장함. 용량이 많은 파일을 여러개로 쪼개놓았기 때문에 가볍고 로딩이 빠르다.

1. use mongodb_tutorial 데이터베이스 생성
2. db 현재 데이터베이스 확인
3. show dbs 전체데이터베이스 확인 -> mongodb_tutorial 은 미노출(콜렉션이 없기 때문)
4. db.createCollection(‘users’)
5. show dbs 전체데이터베이스 노출 확인
6. db.dropDatabase() 삭제 후 show dbs 삭제 확인
7. use local 이동
8. db.users.insert({name:’소녀시대’})
9. insert()와 save()의 차이점- save()는 기존 _id값이 있을경우 덮어씌우고, 없을경우 insert()를 이용해 새로 만듬 <-> insert()는 기존 _id값이 있으면 오류발생
10. show collections
11. db.users.find() 자료 확인 후 업데이트
12. db.users.update({name:’소녀시대’},{$set:{name:’bts’}})
13. db.users.remove({name:’bts’})
14. db.users.drop()

## 4_MongoDB — MongoDB - CRUD in Express routes

1. git clone `https://github.com/STUDY-FULLSTACK/fullstack-with-react-tutorial.git`
2. cd fullstack-with-react-tutorial
3. git checkout 3_mongoDB
4. npm install
5. npm run start
6. http://localhost:3000/public/login.html
7. db.users.insert({id:’test01’,password:’1234’,name:’bts’})
8. 사용자인증함수 -> 라우터
9. http://localhost:3000/public/adduser.html
10. 사용자추가함수 -> 라우터
11. db.users.find().pretty()
12. git checkout 4_mongoDB_CRUD
13. http://localhost:8080/

