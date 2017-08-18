/**
 * Created by icepoint1999 on 10/02/2017.
 */
import React from 'react'


React.Component.prototype.getInputValue = (e) => {
    return e.refs.input.value
}

React.Component.prototype.MenuNavigate = function(e){
    let url = e.item.props["data-url"]
        this.props.history.push(url)
}

React.Component.prototype.current_user =function (e) {
     return JSON.parse( window.sessionStorage.getItem("current_user"))
}

React.Component.prototype.ElementValue =function (e,name) {
    return e.target.attributes.getNamedItem(name).value
}

