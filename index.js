import express from 'express'
import http from 'http'
import mongodb from 'mongodb'
import assert from 'assert'
import bodyParser from 'body-parser'

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/public', express.static(__dirname + '/public'))

//===== 데이터베이스 연결 =====//

// 몽고디비 모듈 사용
const MongoClient = mongodb.MongoClient

// 데이터베이스 객체를 위한 변수 선언
let database;

//데이터베이스에 연결
const connectDB = () => {
	// 데이터베이스 연결 정보
	const databaseUrl = 'mongodb://localhost:27017/local'
	const dbName = 'local'
	
	// 데이터베이스 연결
	MongoClient.connect(databaseUrl, { useNewUrlParser: true }, (err, client) => {
		assert.equal(null, err)
		
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)
		
		// database 변수에 할당
		database = client.db(dbName)
	})
}

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
const router = express.Router()

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post((req, res) => {

    // 요청 파라미터 확인
    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, (err, docs) => {
			if (err) { throw err }
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {

                // 조회 결과에서 사용자 이름 확인
				const username = docs[0].name
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
				res.write('<h1>로그인 성공</h1>')
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>')
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>')
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>")
				res.end()

			// 조회된 레코드가 없는 경우 실패 응답 전송
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
				res.write('<h1>로그인  실패</h1>')
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>')
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>")
				res.end()
			}
		})
	// 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
		res.write('<h2>데이터베이스 연결 실패</h2>')
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>')
		res.end()
	}
})

// 사용자 추가 라우팅 함수 - 클라이언트에서 보내오는 데이터를 이용해 데이터베이스에 추가
router.route('/process/adduser').post((req, res) => {

    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const paramName = req.body.name || req.query.name;
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database) {
		addUser(database, paramId, paramPassword, paramName, (err, result) => {
			if (err) {throw err;}
			
            // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
			if (result && result.insertedCount > 0) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
				res.write('<h2>사용자 추가 성공</h2>')
				res.end()
			// 결과 객체가 없으면 실패 응답 전송
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
				res.write('<h2>사용자 추가  실패</h2>')
				res.end()
			}
		})
	// 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
		res.write('<h2>데이터베이스 연결 실패</h2>')
		res.end()
	}
})

// 라우터 객체 등록
app.use('/', router)

// 사용자를 인증하는 함수
const authUser = (database, id, password, callback) => {
	
    // users 컬렉션 참조
	const users = database.collection('users')

    // 아이디와 비밀번호를 이용해 검색
	users.find({"id":id, "password":password}).toArray((err, docs) => {
		// 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
		if (err) {
			callback(err, null)
			return;
		}
		
		// 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
	    if (docs.length > 0) {
	    	callback(null, docs)

    	// 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달	
	    } else {
	    	callback(null, null)
	    }
	})
}

//사용자를 추가하는 함수
const addUser = (database, id, password, name, callback) => {
	// users 컬렉션 참조
	const users = database.collection('users')

	// id, password, username을 이용해 사용자 추가
	users.insertMany([{"id":id, "password":password, "name":name}], (err, result) => {
		// 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
		if (err) {
			callback(err, null)
			return;
		}
        
	    callback(null, result)
	     
	})
}

// Express 서버 시작
http.createServer(app).listen(app.get('port'), () => {
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'))

  // 데이터베이스 연결을 위한 함수 호출
  connectDB()
})
