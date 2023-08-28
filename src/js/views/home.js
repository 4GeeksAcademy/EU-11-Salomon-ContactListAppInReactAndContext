import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [contacts, setContacts] = useState([])
	const [selectedContact, setSelectedContact] = useState(null);
	const handleEditClick = (contact) => {
		setSelectedContact(contact);
	  };


	  useEffect (() => {
			fetch("https://playground.4geeks.com/apis/fake/contact/agenda/saloagenda", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
				})	
				.then(resp => resp.json())
				.then(data => {
					const dataArray = Array.isArray(data) ? data : [data];
					setContacts(dataArray);
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
		console.log(contacts);
	  }, []);

	  const handleUpdateContact = () => {
		if (selectedContact) {
		  const updatedContact = {
			full_name: selectedContact.full_name,
			email: selectedContact.email,
			agenda_slug: selectedContact.agenda_slug,
			address: selectedContact.address,
			phone: selectedContact.phone,
		  };
	  
		  fetch(`https://playground.4geeks.com/apis/fake/contact/${selectedContact.id}`, {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(updatedContact),
		  })
			.then((resp) => resp.json())
			.then((updatedData) => {
			  const updatedContacts = contacts.map((contact) =>
				contact.id === updatedData.id ? updatedData : contact
			  );
			  setContacts(updatedContacts);
			  setSelectedContact(null); // Clear the selected contact after updating
			})
			.catch((error) => {
			  console.log(error);
			});
		}
	  };

	  const handleDeleteContact = (contactId) => {
		// Make the DELETE request to the API endpoint to delete the contact
		fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
		  method: "DELETE",
		})
		  .then((resp) => resp.json())
		  .then(() => {
			// Remove the deleted contact from the state
			const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
			setContacts(updatedContacts);
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  };
	
  	return(
	<div className="container d-flex justify-content-start left-container">
	<div className="row">
		{contacts.map(contact => (
		<div className="card" style={{maxWidth:"1400px"}} key={contact.id}>
			<div className="row">
			<div className="col-md-4">
			<img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" className="img-fluid" alt={"${contact.id}"} /> 
			</div>
			<div className="col-md-4 justify-content-center">
				<div className="card-body">
				<h5 className="card-title"> {contact.full_name}</h5>
				<p className="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
				<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
				<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
				</svg> {contact.address} </p>
				<p className="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
				<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
				</svg> {contact.phone} </p>
				<p className="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
				<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
				</svg> {contact.email}</p>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end right-container p-4">
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleEditClick(contact)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                    ></path>
                  </svg>
                </button>
				<button
					type="button"
					className="btn"
					onClick={() => handleDeleteContact(contact.id)}
				>
					<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-trash"
					viewBox="0 0 16 16"
					>
					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
					<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
					</svg>
				</button>
              </div>
            </div>
            {selectedContact && (
              <div className="edit-form">
                <input
                  type="text"
                  value={selectedContact.full_name}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      full_name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={selectedContact.email}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={selectedContact.address}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      address: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={selectedContact.phone}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      phone: e.target.value,
                    })
                  }
                />
                <button onClick={handleUpdateContact}>Save Changes</button>
                <button onClick={() => setSelectedContact(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};