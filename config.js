//config settings

const hostname = '192.168.0.15';
const port = '8080';
const DOCROOT = './';

//database info
const db_info = {server: 'localhost',
				 port: 3306,
				 username: 'DirtyHarry',
				 password: 'qwerty10'};
				 

//export our config stuff.
module.exports = {
	hostname,
	port,
	DOCROOT,
	db_info
};