## 프로젝트 소개

안녕하세요. 백엔드 테스트 관련 github repository입니다. 
nest로 간단한 프로젝트 인사 관리 시스템을 만들었습니다.

## 실행 방법
```
npm install
```
```
npm start:dev
```
로 실행해주시기 바랍니다.

## 개발 환경

- framework: nest.js
- db : mysql
- server: aws

## API 명세

api 명세는 다음과 같이 구성되어 있습니다.
(Api 명, Method, Api URL, 설명, 요청예시, 응답예시)

<table>
  <tr>
    <th>Api 명</th>
    <th>Method</th>
    <th>Api URL</th>
    <th>설명</th>
    <th>요청예시</th>
    <th>응답예시</th>  
  </tr>
  <tr>
    <td>Employee</td>
    <td>Get</td>
    <td>http://localhost:3000/employee/{employeeId}</td>
    <td>특정 사원의 현재 정보 조회 가능한 API 구현 </td>
    <td>http://localhost:3000/employee/101</td>
    <td>{
	"employeeId": 101,
	"firstName": "Neena",
	"lastName": "Kochhar",
	"email": "NKOCHHAR",
	"phoneNumber": "515.123.4568",
	"hireDate": "1989-09-21",
	"jobId": "AD_VP",
	"salary": "17000.00",
	"commissionPct": null,
	"managerId": 100,
	"departmentId": 90
}</td>
  </tr>
  <tr>
    <td>Employee</td>
    <td>Get</td>
    <td>http://localhost:3000/employee/jobHistory/{employeeId}</td>
    <td>특정 사원의 이력 정보 조회 가능한 API - typeorm을 사용하다보니 기존 방식의 데이터 스키마로는 진행이 어려웠다. 그래서 임의로 jobhistory_id 에 primary_key를 추가하였다.</td>
    <td>http://localhost:3000/employee/jobHistory/101</td>
    <td>{
	"employeeId": 101,
	"firstName": "Neena",
	"lastName": "Kochhar",
	"email": "NKOCHHAR",
	"phoneNumber": "515.123.4568",
	"hireDate": "1989-09-21",
	"jobId": "AD_VP",
	"salary": "17000.00",
	"commissionPct": null,
	"managerId": 100,
	"departmentId": 90,
	"jobHistories": [
		{
			"jobHistoryId": 2,
			"employeeId": 101,
			"startDate": "1989-09-21",
			"endDate": "1993-10-27",
			"jobId": "AC_ACCOUNT",
			"departmentId": 110
		},
		{
			"jobHistoryId": 3,
			"employeeId": 101,
			"startDate": "1993-10-28",
			"endDate": "1997-03-15",
			"jobId": "AC_MGR",
			"departmentId": 110
		}
	]
}</td>
  </tr>
  <tr>
    <td>Employee</td>
    <td>Post</td>
    <td>http://localhost:3000/employee/salaryUpdate</td>
    <td>특정 부서의 급여를 특정 비율로 인상 API - 해당 api를 department controller에 구현할지 employee에 구현할 것인지에 대한 고민이 많았다. 결론적으로 급여 정보가 employee에 위치해있어서 employee 하단부에 위치 시켰다. table column이 salary와 commission_pct로 컬럼이 분리되어 있으며, job 테이블에 직업에 관한 max, min salary가 설정되어 있어서 salary와 commission_pct의 적용한 값이 해당 직업의 max값을 넘을 경우 max값으로 적용되도록 하였다. </td>
    <td>
    {
      "departmentId":"110",
      "commissionPct":"0.25"
    }
    </td>
    <td>{
	"message": "success",
	"data": [
		{
			"employeeId": 205,
			"firstName": "Shelley",
			"lastName": "Higgins",
			"email": "SHIGGINS",
			"phoneNumber": "515.123.8080",
			"hireDate": "1994-06-07",
			"jobId": "AC_MGR",
			"salary": "15000",
			"commissionPct": "0.25",
			"managerId": 101,
			"departmentId": 110,
			"job": {
				"jobId": "AC_MGR",
				"jobTitle": "Accounting Manager",
				"minSalary": "8200",
				"maxSalary": "16000"
			}
		},
		{
			"employeeId": 206,
			"firstName": "William",
			"lastName": "Gietz",
			"email": "WGIETZ",
			"phoneNumber": "51hr5.123.8181",
			"hireDate": "1994-06-07",
			"jobId": "AC_ACCOUNT",
			"salary": "9000",
			"commissionPct": "0.25",
			"managerId": 205,
			"departmentId": 110,
			"job": {
				"jobId": "AC_ACCOUNT",
				"jobTitle": "Public Accountant",
				"minSalary": "4200",
				"maxSalary": "9000"
			}
		}
	]
}</td>

  </tr>
  <tr>
    <td>Employee</td>
    <td>Post</td>
    <td>http://localhost:3000/employee/{employeeId}</td>
    <td>특정사원의 정보를 update하는 api이다.</td>
    <td>
    url: http://localhost:3000/employee/101
    {
      "firstName":"wonho",
      "lastName":"Jeong",
      "email":"test@test.com"
    }
    </td>
    <td>
    employeeId-101로 테스트
    { "message": "success",
	"data": {
		"employeeId": 101,
		"firstName": "wonho",
		"lastName": "Jeong",
		"email": "test@test.com",
		"phoneNumber": "515.123.4568",
		"hireDate": "1989-09-21",
		"jobId": "AD_VP",
		"salary": "17000.00",
		"commissionPct": null,
		"managerId": 100,
		"departmentId": 90
	}
  }</td>
  </tr>
  <tr>
    <td>department</td>
    <td>Get</td>
    <td>http://localhost:3000/department/{locationId}</td>
    <td>특정 부서 및 위치 정보 조회 가능한 API 구현 </td>
    <td>
    http://localhost:3000/department/1700<
    </td>
    <td>
    {
	"departmentId": 10,
	"departmentName": "Administration",
	"managerId": 200,
	"locationId": 1700,
	"location": {
		"locationId": 1700,
		"streetAddress": "2004 Charade Rd",
		"postalCode": "98199",
		"city": "Seattle",
		"stateProvince": "Washington",
		"countryId": "US"
	}
}
    </td>
  </tr>
  <tr>
    <td>custom-api</td>
    <td>Get</td>
    <td>http://localhost:3000/custom-api?district={district}</td>
    <td> 미세먼지에 대한 오염도 확인 api 
        기본값은 강남구로 설정되어 있습니다. 다른구 검색시 아래와 같이 json파일로 요청하면 됩니다. 서버 요청시 시간이 오래거리는 문제가 있습니다. 다시 실행하시면 됩니다. district=서울의 구를 의미합니다. ex) 마포구
    </td>
    <td>
    http://localhost:3000/custom-api?district=마포구
    </td>
    <td>
    {
	"totalCount": 742,
	"items": [
		{
			"so2Grade": "1",
			"coFlag": null,
			"khaiValue": "92",
			"so2Value": "0.003",
			"coValue": "0.6",
			"pm10Flag": null,
			"pm10Value": "73",
			"o3Grade": "1",
			"khaiGrade": "2",
			"no2Flag": null,
			"no2Grade": "2",
			"o3Flag": null,
			"so2Flag": null,
			"dataTime": "2024-01-03 15:00",
			"coGrade": "1",
			"no2Value": "0.047",
			"pm10Grade": "2",
			"o3Value": "0.005"
		},...],
    "pageNo": 1,
	  "numOfRows": 100
}</td>
  </tr>
</table>
