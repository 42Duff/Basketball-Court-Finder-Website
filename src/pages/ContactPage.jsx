import React, { useState } from "react";
import './ContactPage.css';

function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            name,
            email,
            subject,
            message
        };

        console.log("Form submitted:", payload);

        // later do:
        // await fetch('/api/contact', {
        //   method: 'POST', body: JSON.stringify(payload) }),
        //   headers: {

        // Reset after submitting
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    return (
        <>

            <div className="contact-container">
                <h1>Contact Us</h1>

                <form className="contact-form" onSubmit={handleSubmit}>

                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </label>

                    <label>
                        Subject:
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        > 
                            <option value="" disabled>Select a subject</option>
                            <option value="bug">Report a Bug</option>
                            <option value="court-issue">Incorrect Court Info</option>
                            <option value="feature-request">Feature Request</option>
                            <option value="other">Other</option>    
                        </select>
                    </label>

                    <label>
                        Describe the issue:
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Submit</button>

                </form>

            </div>
        </>
    );
}

export default ContactPage;