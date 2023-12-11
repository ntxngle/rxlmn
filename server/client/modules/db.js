//initialize AceBase for server + offline caching
const localCache = AceBase.WithIndexedDB('offlinecache');
const db = new AceBaseClient({
    host: 'localhost',
    port: 3000,
    dbname: 'crm',
    https: false,
    cache: localCache
});
db.ready(() => {
    console.log('Connected successfully');
});
export default db;