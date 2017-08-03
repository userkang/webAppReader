var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view', {
	map: {html: 'ejs'}
});

var querystring = require('querystring');

var koa_static = require('koa-static-server');

var service = require('./service/webAppService.js')

app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));

// 路由实例
app.use(controller.get('/route_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = 'hello koa!';
}));

// 模版实例
app.use(controller.get('/ejs_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test', {title: 'title_test'});
}));

// 接口实例
app.use(controller.get('/api_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();
}));

// 模版首页
app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index', {title: '书城首页'});
}));

// 模版排行
app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank', {title: '排行'});
}));

// 模版分类
app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category', {title: '分类'});
}));

// 模版男频
app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male', {title: '男频'});
}));

// 模版女频
app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female', {title: '女频'});
}));

// 模版书籍详情页
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book', {title: '书籍详情页', bookId: bookId});
}));

app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));

// 接口
app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start, end, keyword);
}));

app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/bookbacket', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_bookbacket_data();
}));

app.use(controller.get('/ajax/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	id = !id ? '' : id;
	this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_reader_data();
}));

app.use(controller.get('/ajax/data', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	id = !id ? '' : id;
	this.body = service.get_reader_content_data(id);
}));


app.listen(3001);

console.log('Koa server is started!');