import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = props => {
	const { store, actions } = useContext(Context);

	const[fullName, setFullName] = useState()
	const[fullEmail, setFullEmail] = useState()
	const[fullPhone, setFullPhone] = useState()
	const[fullAddress, setFullAddress] = useState()

	const handleSubmit = () => {
		const contact = {
			"full_name": fullName,
			"email": fullEmail,
			"agenda_slug": "saloagenda",
			"address": fullAddress,
			"phone": fullPhone
		}
		
		fetch("https://playground.4geeks.com/apis/fake/contact/", {
				method: "POST",
				body: JSON.stringify(contact),
				headers: {
					"Content-Type": "application/json"
				}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					console.log(resp); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//here is where your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
					alert("Successfully added new contact!!")
					// setAddress('');
					// setEmail('');
					// setFullName('');
					// setPhone('');
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
	}

	

	const params = useParams();
	return (
<div className="container">
			<div className="row">
				<h1 className="d-flex justify-content-center">Add a New Contact</h1>
				<form id="frm1" action="/action_page.php" >
				<div className="mb-3">
  				<label htmlFor="basic-url" className="form-label">Full Name</label>
  				<div className="input-group">
				<input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Insert Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
				</div>
				</div>
				<div className="mb-3">
  				<label htmlFor="basic-url" className="form-label">Email</label>
  				<div className="input-group">
				  <input
                    type="text"
                    className="form-control"
                    id="fullEmail"
                    placeholder="Insert Email"
                    value={fullEmail}
                    onChange={(e) => setFullEmail(e.target.value)}
                />
				</div>
				</div>				
				<div className="mb-3">
  				<label htmlFor="basic-url" className="form-label">Phone</label>
  				<div className="input-group">
				  <input
                    type="text"
                    className="form-control"
                    id="fullPhone"
                    placeholder="Insert Phone Number"
                    value={fullPhone}
                    onChange={(e) => setFullPhone(e.target.value)}
                />				</div>
				</div>
				<div className="mb-3">
  				<label htmlFor="basic-url" className="form-label">Address</label>
  				<div className="input-group">
				  <input
                    type="text"
                    className="form-control"
                    id="fullAddress"
                    placeholder="Insert Address"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                />
				</div>
				</div>
				<div className="d-grid gap-2">
				<button className="btn btn-primary" type="button" onClick={handleSubmit} value="save"> submit </button>
				</div>
				</form>
				</div>
						<Link to="/">
							<a href="#" className="card-link">or get back to contacts</a>
						</Link>
				</div>
	);
};

Demo.propTypes = {
	match: PropTypes.object
};