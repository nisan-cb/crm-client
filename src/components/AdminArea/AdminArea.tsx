import React, { ChangeEvent, useEffect, useState } from "react";

import './adminArea.scss'
const localhost = 'http://localhost:4000';

function AdminArea() {

    const [records, setRecords] = useState<any[]>([]);
    const [statusTypes, setStatusTypes] = useState<string[]>([]);

    useEffect(() => {
        fetch(`${localhost}/api/status-options`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(typeof data);
                setStatusTypes(data);
            })
            .catch(err => console.log(err));

        fetch(`${localhost}/api/records`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(typeof data);
                setRecords(data)
            })
            .catch(err => console.log(err));




    }, []);



    const changeStatus = (e: any, record: any) => {
        console.log('change')
        console.log(e.target.value)
        console.log(record)
        const newStatus = e.target.value;
        const recordNumber = record.number
        fetch(`${localhost}/api/update-record-status/${recordNumber}/${newStatus}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => console.log('res'))
    }

    return (
        <>
            admin area
            <table>

                <tbody>
                    <tr>
                        <th>No</th>
                        <th>City</th>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    {
                        records.map(record => {
                            return <tr key={record.number}>
                                <td>{record.number}</td>
                                <td>{record.city}</td>
                                <td>{record.name}</td>
                                <td>{record.phone_number}</td>
                                <td>{record.description}</td>
                                {/* <td>{record.status}</td> */}

                                <td>
                                    <select defaultValue={record.status} onChange={(e) => changeStatus(e, record)}>
                                        {
                                            statusTypes.map(s => {
                                                return <option key={s} value={s}>{s}</option>
                                            })
                                        }
                                    </select>
                                </td>
                                <td>delete edit</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdminArea;

