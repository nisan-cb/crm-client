import React, { useEffect, useState } from "react";
import './appointmentPage.scss'
const base_url = 'http://ncb-crm.herokuapp.com';
const local_host = 'http://localhost:4000'

function AppiontmentPage() {
    const [servicesList, setServicesList] = useState<any[]>([]);
    const [branchesList, setBranchesList] = useState<any[]>([]);
    const [msg, setMsg] = useState<string>('msg');

    useEffect(() => {
        // get all services type from server
        fetch(`${base_url}/api/services`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setServicesList(data)
            })
            .catch(err => console.log(err));

        // get all branches from server
        fetch(`${local_host}/api/branches`)
            .then(response => response.json())
            .then(data => setBranchesList(data))
            .catch(err => console.log(err));
    }, []);

    // run when cklick on submit
    const submitHandler = (e: any) => {
        e.preventDefault();
        const appiontmentData = {
            service: e.target.elements.service.value,
            branch: e.target.elements.branch.value,
            client_id: e.target.elements.id.value,
            client_name: e.target.elements.name.value,
            phone_number: e.target.elements.phoneNumber.value,
        }
        // sent POST request to server
        fetch(`${base_url}/api/insertNewRecord`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appiontmentData)
        })
            .then(response => response.json())
            .then(data => setMsg(data.msg))
            .catch(err => console.log(err));
    }


    const displayMsg = (msg: string) => {
        if (msg !== '') {
            setTimeout(() => {
                setMsg('');
            }, 4000);
            return <div id='msg'> {msg}</div>
        }

    }


    return (
        <section>
            appiontment page!!
            <div>
                <form onSubmit={submitHandler}>
                    <select name='service'>
                        {
                            servicesList.map(item => {
                                return <option value={item.code} key={item.code}>{item.description}</option>
                            })
                        }
                    </select>

                    <select name='branch'>
                        {
                            branchesList.map(item => {
                                return <option value={item.code} key={item.code}>{item.city}</option>
                            })
                        }
                    </select>

                    privet details
                    <input type="text" placeholder="id" name="id" />
                    <input type="text" placeholder="name" name="name" />
                    <input type="text" placeholder="phone number" name="phoneNumber" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {displayMsg(msg)}

        </section >
    )
}

export default AppiontmentPage;