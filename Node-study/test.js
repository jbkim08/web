let express = require("express")
let ourApp = express()

ourApp.use(express.urlencoded({extended: false}))

ourApp.get('/', function(req, res){
    res.send(`
    <form action="/answer" method="POST">
        <p>맑은 하늘의 색깔은?<p>
        <input name="skyColor">
        <button>제출</button>
    </from>
    `)
})
ourApp.post('/answer', function(req, res){
    if(req.body.skyColor == "파란색"){
        res.send(`
            <p>맞췄습니다.</p>
            <a href="/">되돌아 가기</a>
        `)
    } else {
        res.send(`
            <p>틀렸습니다.</p>
            <a href="/">되돌아 가기</a>
        `)
    }
})
ourApp.get('/answer', function(req, res){
    res.send("잘못된 주소입니다.")
})
ourApp.listen(3000)
