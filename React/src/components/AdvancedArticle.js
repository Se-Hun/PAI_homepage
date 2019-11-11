import React, {Component} from 'react';

class AdvancedArticle extends Component {
    constructor(props) {
        super(props)
        this.html = '<script src="https://distill.pub/template.v1.js"></script><dt-article><h1>Hello World</h1></dt-article>'
    }

    render() {
        // var __html = require('../distill/html/template.html')
        // var template = {__html : __html}

        return(
            <div dangerouslySetInnerHTML={{__html: this.html}}/>
        )
    }
}

export default AdvancedArticle