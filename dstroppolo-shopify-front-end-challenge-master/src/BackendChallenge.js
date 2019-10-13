import React, { Component } from 'react';
import Pages from './apiData';


export default class BackendChallenge extends Component {


    constructor(props){
        super(props);

        this.state = {
            apiData: [],
            topLevel: []
        }

    }

    componentWillMount = () => { 

        //first create a big old object with all the pages on it
        let pages = [];
        
        Pages.forEach(page => {
            pages.push(page.menus);
        })

        let p = [];
        pages.forEach(menu => {
            menu.forEach(m => {
                p.push(m);
            })
        })
        this.setState({apiData: p})
    }

    componentDidMount = () => {

        //console.log(this.state.apiData)

        let items = this.state.apiData;
        let topLevel = [];

        //find the parents
        items.forEach(item => {
            let parent = item.parent_id ? item.parent_id : null;
            if(!parent){

                let x = items.filter(e => {
                    if(!e.parent_id)
                        return e; 
                })                    
               topLevel= [...this.state.topLevel, ...x];
             
            }
        })

        //find the first gen
        

        topLevel.forEach(top => {


            let childId = 0;
            

            while(top.child_ids[childId]){

                let currentChild = top.child_ids[childId];
                console.log(`item ${top.id} has child ${top.child_ids[childId]}`)

                let nextChild = items.find(i => {
                    return i.id === currentChild;
                    
                })

                console.log(`child item ${currentChild} has children ${nextChild.child_ids}`);
                





                childId++;

            }

            console.log('----');

        })

    }




    render(){
        return (       
            <div style = {{color:'white'}} className = 'backend'>B            
            </div>
        )
    }
}