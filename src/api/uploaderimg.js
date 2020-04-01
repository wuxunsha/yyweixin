//  引入axios
import axios from 'axios'
import { Toast } from 'vant'
//  file为 你读取成功的回调文件信息
function upLoaderImg (file) {
  //  new一个FormData格式的参数
  let params = new FormData()
  params.append('file', file)
  let config = {
    //  添加请求头
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    //  把uploadUrl 换成自己的 上传路径
    let uploadUrl = 'http://47.112.144.243:9092/fileuploaddown/fileuploadone/4'
    axios.post(uploadUrl, params, config).then(res => {
      //  如果为真 resolve出去
      if (res.data.code === 10000) {
        Toast.success('上传成功')
        resolve(res.data)
      }
    }).catch(err => {
      Toast.fail('系统异常')
      reject(err)
    })
  })
}
export default upLoaderImg
