import React from 'react';
const generalUrl ='https://api.github.com/users'
export default class Fetch extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            userList: []
        }
        this.handlerChange = this.handlerChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleKeyDown(e) {
        if(e.key==='Enter'){
            // this.setState({
            //     user: event.target.value
            // }, ()=> this.getDataFromGithub())

          this.getDataFromGithub()
        }
    }
    handlerChange(event) {
        // this.setState({
        //     user: event.target.value
        // })
        this.setState({
                user: event.target.value
            }, ()=> this.getDataFromGithub())
    }

    componentDidMount() {
        this.getUserListStorage()
    }

    async getUserListStorage() {
        let result=[]
        let userList = await JSON.parse(localStorage.getItem('userList'));    
        // console.log("getUserListStorage",userList)
        if(userList.message!=undefined){
            // console.log("ERR",userList.message)
            result=[]

        }
        if(!Array.isArray(userList)){            
            result.push(userList)
        }else{
            result=userList
        }

         if(userList==null)return
        this.setState({
            userList:result
        }, () => !userList.length ? this.getDataFromGithub() : null)
    }

    async  getDataFromGithub() {
        let url = `${generalUrl}${this.state.user ? '/' : ''}${this.state.user}`;
        try {
            
            let response = await fetch(url);
            if(response.status==403){
                alert("exediste las consultas")
                return;
            }
            
            let userList1=[]
            let result=[]
            userList1= await response.json();
           

            if(userList1.message!=undefined){
                // alert("[ERR] No se encontro Coincidencia")
                result=[]
            }else{
                if(!Array.isArray(userList1)){                
                    result.push(userList1)                
                }else{
                    result=userList1;
                }

                this.setState({
                    userList:result
                }, () => localStorage.setItem('userList', JSON.stringify(userList1)))
            }

            
           
        } catch(error) {
            console.log('error', error)
            // this.getUserListStorage()
            // alert('error', error);
        }

    }

    render() {
        const { userList, user } = this.state;
        // console.log('lll', userList)
        return (
            <>
                <input placeholder={"Usuario"} value={user} onChange={this.handlerChange} />                
                <ul>                   
                    {userList.map((list, l) => <li key={l}>
                    <img src={list.avatar_url} height="45"></img>
                    {list.login}
                    </li>)}
                </ul>
            </>
        )
    }
}