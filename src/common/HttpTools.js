import {BaseUrl} from './GlobalConfig'
import React, {Component} from 'react'
import {NetInfo} from 'react-native'
const NetInfoDecorator = WrappedComponent => class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnected: true,
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this._handleNetworkConnectivityChange);
    }

    _handleNetworkConnectivityChange = isConnected => this.setState({isConnected})

    render() {
        return <WrappedComponent {...this.props} {...this.state}/>
    }
}
const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject({status:-1,statusText:'请求超时'}), timeout * 1000)
    })
}
const defaultErr = {status:0,statusText:'网络异常'}
const get = ({url, params = {}, timeout}) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${BaseUrl+url}?${paramArr.join('&')}`
    const fetchPromise = new Promise((resolve,reject)=>{
        fetch(urlStr).then((response)=>{
            if(response.ok){
                return response.json()
            }else {
                reject(response)
            }
        }).then((response)=>{
            resolve(response)
        }).catch(()=>{
            reject(defaultErr)
        })
    })
    if (timeout === undefined) {
        return fetchPromise
    } else {
        return Promise.race([fetchPromise, delay(timeout)])
    }
}
const post = ({url,data={},timeout}) => {
    const fetchPromise = new Promise((resolve,reject)=>{
        fetch(BaseUrl+url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
        }).then((response)=>{
            if(response.ok){
                return response.json()
            }else {
                reject(response)
            }
        }).then((response)=>{
            resolve(response)
        }).catch(()=>{
            reject(defaultErr)
        })
    })
    if(timeout===undefined){
        return fetchPromise
    }else {
        return Promise.race([fetchPromise,delay(timeout)])
    }
}
const upload = function({url,data={},timeout}){
    const {file,img} = data
    let uploadData = new FormData();
    uploadData.append('file', file.nativeFile)
    uploadData.append('type', img[0].type)
    const fetchPromise = new Promise((resolve,reject)=>{
        fetch(BaseUrl+url,{
            method: 'POST',
            body: uploadData
        }).then((response)=>{
            if(response.ok){
                return response.json()
            }else {
                reject(response)
            }
        }).then((response)=>{
            resolve(response)
        }).catch(()=>{
            reject(defaultErr)
        })
    })
    if(timeout===undefined){
        return fetchPromise
    }else {
        return Promise.race([fetchPromise,delay(timeout)])
    }
}
export { get,post,NetInfoDecorator,upload}