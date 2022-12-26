var db = null;
function OpenIndexedDb(name,version){
  const request = window?.indexedDB?.open(name, version);
  // 数据库创建或升级时触发
  request.onupgradeneeded = (event) => {
    // 通过事件对象的target.result属性，拿到数据库实例。
    db = event.target.result;
    console.log('onupgradeneeded');
    var objectStore_LocalFile;
    var objectStore_RemoteScene;
    var objectStore_LocalAvatar;
    if (!db.objectStoreNames.contains('LocalFile')) {
      // 创建对象仓库，简单说就是建立一张表
      objectStore_LocalFile = db.createObjectStore('LocalFile', { keyPath: 'Sign' });
    }
    if (!db.objectStoreNames.contains('WsRemoteScene')) {
      // 创建对象仓库，简单说就是建立一张表
      objectStore_RemoteScene = db.createObjectStore('WsRemoteScene', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('LocalAvatar')) {
      // 创建对象仓库，简单说就是建立一张表
      objectStore_LocalAvatar = db.createObjectStore('LocalAvatar', { keyPath: 'id' });
    }
  };
  // 数据打开时触发；第一次打开数据库时，会先触发upgradeneeded事件，然后触发success事件。
  request.onsuccess = (event) => {
    // 通过request对象的result属性拿到数据库对象。
    db = request.result;
    console.log('success');
  };
  // 失败时触发
  request.onerror = (event) => {
    console.log('onerror Error');
  };
  request.onblocked = (event) => {
    console.log('onblocked Error');
  };
}

function AddIndexedDb(objectStoreName,data) {
  var jsonObj = JSON.parse(data);
  var request = db.transaction([objectStoreName], 'readwrite')
  .objectStore(objectStoreName)
  .add(jsonObj);
  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };
  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

function GetIndexedDb(objectStoreName,keyPath,callback){
  var transaction = db.transaction([objectStoreName]);
  var objectStore = transaction.objectStore(objectStoreName);
  var request = objectStore.get(keyPath); // 1 -> keyPath
  request.onerror = function(event) {
    console.log('事务失败');
  };
  request.onsuccess = function( event) {
      if (request.result) {
        // to do
        var jsonStr = JSON.stringify(request.result);
        console.log(request.result);
        //console.log(jsonStr);
        //var jsonObj = JSON.parse(jsonStr);
        var info = keyPath.concat('|' ,jsonStr);
        WebGLToUnity("JSHandler","OnIndexedDbGetReturn",info);
      } else {
        console.log('数据为空');
        var info = keyPath.concat('|' ,"");
        WebGLToUnity("JSHandler","OnIndexedDbGetReturn",info);
      }
  };
}

function GetAllIndexedDb(objectStoreName){
  var objectStore = db.transaction(objectStoreName).objectStore(objectStoreName);
  var request = objectStore.openCursor();
  request.onerror = function(event) {
    console.log('事务失败');
  };
  request.onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      // to do
      console.log(cursor.key + ':');
      // for (var field in cursor.value) {
      //   console.log(cursor.value[field]);
      //   var jsonStr = JSON.stringify(cursor.value[field]);
      //   WebGLToUnity("JSHandler","OnIndexedDbGetAllReturn",jsonStr);
      // }
      var jsonStr = JSON.stringify(cursor.value);
      WebGLToUnity("JSHandler","OnIndexedDbGetAllReturn",jsonStr);
      cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

function UpdateIndexedDb(objectStoreName,data){
  var jsonObj = JSON.parse(data);
  var request = db.transaction([objectStoreName], 'readwrite')
  .objectStore(objectStoreName)
  .put(jsonObj);
  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };
  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

function DeleteIndexedDbData(objectStoreName,keyPath){
  var request = db.transaction([objectStoreName], 'readwrite')
  .objectStore(objectStoreName)
  .delete(keyPath);
  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
  request.onerror = function (event) {
    console.log('数据删除失败');
  }
}

function fun(){
  var oB = document.getElementById("pid");
  oB.innerHTML="这是新文本"
}
function OpenDb(){
  OpenIndexedDb("LocalCache",1);
}
function AddDbData(){
  AddIndexedDb("test",1);
}
function GetDbData(){
  GetIndexedDb("test",1);
}
function UpdateDbData(){
  UpdateIndexedDb("test",1);
}
function DeleteDbData(){
  DeleteIndexedDbData();
}