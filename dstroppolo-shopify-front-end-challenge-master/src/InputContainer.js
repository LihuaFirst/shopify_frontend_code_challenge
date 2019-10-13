import React, { Component } from 'react';
import { Input, Dropdown, Button, Loader } from 'semantic-ui-react';


/*A container for the three inputs we will be adding. We're going to add
the logic and functions here and state-hoist the inputs so that the
inputs can be strictly presentational, or "dumb" components*/

export default class InputContainer extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            emailError: '',
            interestError: '',
            emailShake: false,
            interestShake: false,
            emailInput: '',
            interestInput: '',
            isLoading: false,
            isSubmitted: false

        }

    }

    //Handle the submit button being clicked. We dont want to use html default email validation
    //so we add our own. Controlled components so we look at the components state, not the DOM.
    handleSubmit = event => {
        event.preventDefault();
        let readyToSubmit = true;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

        if(!emailRegex.test(this.state.emailInput)){
            readyToSubmit = false;
            this.addShakeEffect('email');
            this.setState({emailError: 'Please enter a valid Email address.'})
        } else {
            this.setState({emailError: ''})
        }

        if(!this.state.interestInput){
            readyToSubmit = false;
            this.addShakeEffect('interest');
            this.setState({interestError: 'Please select an option.'})
        } else {
            this.setState({interestError: ''})
        }


        if(readyToSubmit){

            this.setState({isLoading: true})
            console.log(this.state.emailInput);
            console.log(this.state.interestInput);
            setTimeout(()=> {
                this.setState({isLoading: false, isSubmitted: true});
            }, 2000);
            

        }

    }

    //Set the state when new data is entered
    handleChange = (event, data) => {
        switch (data.type){

            case 'text':
                this.setState({emailInput: data.value});
                break;
            
            default:
                this.setState({interestInput: data.value});

        }

    }

    //add the shake effect when a mistake occurs
    addShakeEffect = type => {
    
        switch(type){
            case 'email':
                this.setState({emailShake: true})
                setTimeout(() => {
                    this.setState({emailShake: false}) 
                }, 550)
                break;
            
            case 'interest':
                this.setState({interestShake: true})
                setTimeout(() => {
                    this.setState({interestShake: false}) 
                }, 550)

        }

    }




    render(){

        //hard coded list of options
        let options = [
            {text: 'Ecommerce Marketing', value: 'ecom-marketing'},
            {text: 'Email Marketing', value:'email-marketing'},
            {text: 'Local SEO', value: 'local-seo'},
            {text: 'SERP Strategies', value: 'serp-strategies'}        
        ];

        //after submit. this would be when an API request is made
        if(this.state.isLoading){
            return <Loader size = 'huge' active inverted/>;
        }

        //if its submitted, show a confirmation
        if(this.state.isSubmitted){
            return (

                <div className = 'submitted'>

                <h1 >Thanks for signing up!</h1>

                <Button onClick = {() => {this.setState({emailInput: '', interestInput: '', isSubmitted: false})}}>Submit Another</Button>

                </div>
            )
        }

        return(
            
            <form className = 'input-form' onSubmit = {this.handleSubmit}>
               
                <p className = 'input-title'>Subscribe for free marketing tips</p>
                
                <div className = {this.state.emailShake ? 'shake input-email': 'input-email'}>
                    <Input 
                        fluid 
                        placeholder='Email Address' 
                        onChange = {this.handleChange} 
                        error = {this.state.emailError.length > 0}
                        />
                    <p className = 'input-error'>{this.state.emailError ? this.state.emailError : ''}</p>
                </div>

                <div className =  {this.state.interestShake ? 'shake input-interest': 'input-interest'}>
                    <Dropdown 
                        options = {options} 
                        fluid 
                        selection 
                        placeholder='Interested in...'
                        onChange = {this.handleChange}
                        error = {this.state.interestError.length > 0}
                        />
                    <p className = 'input-error'>{this.state.interestError ? this.state.interestError : ''}</p>

                </div>

                <div className = 'input-button'>
                    <Button fluid className = 'input-button-object'>Sign up now</ Button>
                </div>
               
            </form>

            
        )
    }

}
