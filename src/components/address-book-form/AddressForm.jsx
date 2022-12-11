import React from 'react';
import './AddressForm.css';
import AddressBookService from '../../service/AddressBookService';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

class AddressForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            email: "",
            city: "",
            state: "",
            zip: "",
            isUpdate: false,
        }
    }

    fetchData = (personId) => {
        AddressBookService.getAddressBookById(personId).then(response => {
            this.setState({
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                address: response.data.data.address,
                contact: response.data.data.contact,
                email: response.data.data.email,
                city: response.data.data.city,
                state: response.data.data.state,
                zip: response.data.data.zip,

            })
        })
    }

    componentDidMount() {

        if (this.props.location.state) {
            this.fetchData(this.props.location.state.personId);
            this.setState({
                isUpdate: true,
            })
        }

    }

    onValueChange = (event) => {
        const nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if (event.target.name === 'firstName') {
            if (nameRegex.test(event.target.value)) {
                this.setState({
                    firstNameError: ""
                })
            }
            else {
                this.setState({
                    firstNameError: "Name start with capital letter & should have atleast 3 characters"
                })
            }

        }

        if (event.target.name === 'lastName') {
            if (nameRegex.test(event.target.value)) {
                this.setState({
                    lastNameError: ""
                })
            }
            else {
                this.setState({
                    lastNameError: "Name start with capital letter & should have atleast 3 characters"
                })
            }
        }
        
        const  mailRegex = RegExp("^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$")
        if (event.target.name === 'email') {
            if (mailRegex.test(event.target.value)) {
                this.setState({
                    mailError: ""
                })
            }
            else {
                this.setState({
                    mailError: "Invalid mail"
                })
            }
        }
       
        const  mobileRegex = RegExp("[0-9]{2}[\\s][0-9]{10}$")
        if (event.target.name === 'contact') {
            if (mobileRegex.test(event.target.value)) {
                this.setState({
                    contactError: ""
                })
            }
            else {
                this.setState({
                    contactError: "Invalid contact "
                })
            }
        }
        
        const  pinRegex = RegExp("^[0-9]{6}$")
        if (event.target.name === 'zip') {
            if (pinRegex.test(event.target.value)) {
                this.setState({
                    zipError: ""
                })
            }
            else {
                this.setState({
                    zipError: "zip must be 6 digit"
                })
            }
        }
        
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit = (event) => {

        event.preventDefault();

        let person = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        }

        if (this.state.isUpdate) {
            AddressBookService.updateAddressBook(this.props.location.state.personId, person).then((response) => {
                console.log("Record updated Successfully!");
                alert('Updated successfully!!')
            }).catch(() => {
                console.log("Something went wrong! Record not updated");
                alert("Something went wrong! Record not updated")
            })
        } else {
            AddressBookService.addAddressBook(person).then((response) => {
                console.log("Record added Successfully!");
                alert("Record added Successfully!");
            }).catch(() => {
                console.log(" Record not added");
                alert("Record not added , Enter Valid Data");
            })
        }

    }

    onReset = () => {
        this.setState({
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            email: "",
            city: "",
            state: "",
            zip: ""
        })
    }

    render() {
        return (
            <div>
                <div className="form-content">
                    <form action="#" className="form" onSubmit={this.onSubmit} onReset={this.onReset}>
                        <div className="form-head">
                            <h3 className="head-text">PERSON ADDRESS FORM</h3>
                            <div className="cancel-button" >
                                <a href="/home"><ClearOutlinedIcon color='error' /></a>
                            </div>
                        </div>

                        <div className="form-body">
                            <div className="row-content">
                                <label htmlFor='address' className="label text" ></label>
                                <TextField label="First Name" value={this.state.firstName} onChange={this.onValueChange} type="text" className="input" id="firstName" name="firstName" required />
                                <output className="error-output">{this.state.firstNameError}</output>
                                <label htmlFor='address' className="label text" ></label>
                                <TextField label='Last Name' onChange={this.onValueChange} value={this.state.lastName} type="text" className="input" id="lastName" name="lastName" required />
                                <output className="error-output">{this.state.lastNameError}</output>
                            </div>
                            <div className='row-content'>
                                <label htmlFor='address' className="label text" ></label>
                                <TextField label='Address' onChange={this.onValueChange} value={this.state.address} type="address" className='input' id='address' name='address' required />
                            </div>
                            <div className='row-content'>
                                <label htmlFor="phone-number" className="label text"></label>
                                <TextField label='Phone Number' onChange={this.onValueChange} value={this.state.contact} type="tel" className="input" id="contact" name="contact" required />
                                <output className="error-output">{this.state.contactError}</output>
                            </div>
                            <div className="row-content">
                                <label htmlFor="email" className="text"></label>
                                <TextField label='Email' onChange={this.onValueChange} value={this.state.email} type="email" className="input" id="email" name="email" required />
                                 <output className='error-output'>{this.state.mailError}</output>
                            </div>
                            <div className="row-content inner-rows">
                                <div className="columns-content">
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel htmlFor="city" className="label text">CITY</InputLabel>
                                        <Select label='City' name="city" id="city" className="input" onChange={this.onValueChange} value={this.state.city}>
                                            <MenuItem value="0">Select City</MenuItem>
                                            <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                                            <MenuItem value="Bangalore">Bangalore</MenuItem>
                                            <MenuItem value="Chennai">Chennai</MenuItem>
                                            <MenuItem value="Delhi">Delhi</MenuItem>
                                            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                            <MenuItem value="Jaipur">Jaipur</MenuItem>
                                            <MenuItem value="Kolkata">Kolkata</MenuItem>
                                            <MenuItem value="Lucknow">Lucknow</MenuItem>
                                            <MenuItem value="Mumbai">Mumbai</MenuItem>
                                            <MenuItem value="Pune">Pune</MenuItem>
                                            <MenuItem value="Surat">Surat</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="columns-content" >
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel htmlFor="state" className="text label">STATE</InputLabel>
                                        <Select label='STATE' name="state" id="state" className="input" onChange={this.onValueChange} value={this.state.state}>
                                            <MenuItem value="0">Select State</MenuItem>
                                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                            <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar</MenuItem>
                                            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                            <MenuItem value="Assam">Assam</MenuItem>
                                            <MenuItem value="Bihar">Bihar</MenuItem>
                                            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                                            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                                            <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                                            <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                                            <MenuItem value="Delhi">Delhi</MenuItem>
                                            <MenuItem value="Goa">Goa</MenuItem>
                                            <MenuItem value="Gujarat">Gujarat</MenuItem>
                                            <MenuItem value="Haryana">Haryana</MenuItem>
                                            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                                            <MenuItem value="Kerala">Kerala</MenuItem>
                                            <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                                            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                            <MenuItem value="Manipur">Manipur</MenuItem>
                                            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                            <MenuItem value="Mizoram">Mizoram</MenuItem>
                                            <MenuItem value="Nagaland">Nagaland</MenuItem>
                                            <MenuItem value="Odisha">Odisha</MenuItem>
                                            <MenuItem value="Punjab">Punjab</MenuItem>
                                            <MenuItem value="Puducherry">Puducherry</MenuItem>
                                            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                            <MenuItem value="Sikkim">Sikkim</MenuItem>
                                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                            <MenuItem value="Telangana">Telangana</MenuItem>
                                            <MenuItem value="Tripura">Tripura</MenuItem>
                                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                            <MenuItem value="West Bengal">West Bengal</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="columns-content zip">
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <TextField label='zip code' onChange={this.onValueChange} value={this.state.zip} type="Number" className="input" id="zip" name="zip" required />
                                        
                                    </FormControl>
                                    <output className='error-output'>{this.state.zipError}</output>
                                </div>
                            </div>
                            <div className="buttonParent">
                                <div className="submit-reset">
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" className="button" size="medium" color="success" onClick={this.onSubmit}>{this.state.isUpdate ? 'Update' : 'Submit'}</Button>

                                        <Button variant='contained' className="button" color="error" onClick={this.onReset}>Reset</Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddressForm;
