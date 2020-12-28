import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = ('0' + a.getHours()).slice(-2);
    var min = ('0' + a.getMinutes()).slice(-2);
    var sec = ('0' + a.getSeconds()).slice(-2);
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;

}






export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }





    async componentDidMount() {
        this.setState({ readError: null });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });

            });

        } catch (error) {
            this.setState({ readError: error.message });
        }

    }



    handleChange(event) {
        this.setState({
            content: event.target.value,

        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                email: this.state.user.email
            });
            this.setState({ content: '' });

        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }









    render() {




        return (


            <div className="container">

                <div className="chats" onScroll={this.onScroll}>
                    <div>

                        {this.state.chats.map(chat => {
                            return <div key={chat.timestamp} className="message">
                                <p><strong>{chat.email}</strong> <em>{timeConverter(chat.timestamp)}</em></p>
                                <p>{chat.content}</p>
                            </div>

                        })}


                    </div>
                </div>


                <div className="sendform">
                    <form onSubmit={this.handleSubmit}>
                        <input autoFocus required onChange={this.handleChange} value={this.state.content}></input>
                        {this.state.error ? <p>{this.state.writeError}</p> : null}
                        <button type="submit">Send</button>
                    </form>

                    <div>
                        Login in as: <strong>{this.state.user.email}</strong>
                    </div>
                </div>






            </div >

        );




    }

}



