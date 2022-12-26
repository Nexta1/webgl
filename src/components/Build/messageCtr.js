
function UnitySendMessageToWebGL(str) {
  var jsonObj = JSON.parse(str);

  console.log(jsonObj);
}

function WebGLSendMessageToUnity(str) {
  var jsonStr = JSON.stringify(request.result);

  WebGLToUnity("JSHandler","OnWebGLMessageReturn",jsonStr);
}

function WebGLSendTestLogin()
{
  WebGLToUnity("JSHandler","OnStartTestLogin","");
}