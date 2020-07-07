var  mysql = require('mysql');
var os = require('os');  //호스트 이름을 가져오기 위한 모듈

var dbconnInfo = {
	dev:{
		host: '',
		port: '3306',
		user: '',
		password: '',
		database: 'board', 
		multipleStatements : true
	},
	real:{
		host     : '1.1.1.1',
		port: '111111111111111',
		user     : 'cafe24',
		password : 'cafe24',
		database : 'cafe24DB',
		multipleStatements : true
	}	
};

var dbconnection = {
	init : function(){
		var hostname = os.hostname();
		if(hostname === 'DESKTOP-KFJNRPO'){//내컴퓨터 호스트명 
			return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
		}else{
			return mysql.createConnection(dbconnInfo.real);	//cafe24 서버환경
		}
	},
	
	dbopen : function(con){
		con.connect(function(err){
			if(err){
				console.error("mysql connection error : " + err);
			}else{
				console.info("mysql connection successfully.");
			}
		});
	}
};


module.exports = dbconnection;//dbconnection()을 보냄